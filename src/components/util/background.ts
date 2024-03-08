import {customElement, state} from "lit/decorators.js";
import {css, html, LitElement, PropertyValues} from "lit";
import {createRef, ref} from "lit/directives/ref.js";
import "@comps/util/text_bubble.ts";

import sentenceDataset from "@assets/dataset/sentences.json";
import { repeat } from "lit/directives/repeat.js";
import {delay} from "@src/util/delay.ts";
import "@src/util/math/decls.ts";
import {AnimationFrame} from "@src/util/animation_frame.ts";

type MessageType = {
  offset: [number, number],
  id: number,
  tail: "left" | "right",
  dataset: number,
  slide: number,
  enabling: boolean,
  flagDestroy: boolean,
};

/**
 * Common background for any pages
 */
@customElement("fr-background")
export class FrontBackgroundElement extends LitElement {
  private _rootRef = createRef<HTMLDivElement>();

  private _messages: MessageType[] = [];
  private _datasetCursor = 0;
  private _messageCreated = 0;
  private _messageLatestCreate = 0;

  private _animationFrame = new AnimationFrame(this.fixedAnimate.bind(this));
  private _active = true;

  private static _maxMessageCount = 10;
  private static _messageLifetime = 3500;
  private static _messageInterval = 500;
  private static _messageBatchInterval = 1000;
  private static _messageEnterTime = 500;
  private static _messageExitTime = 500;
  private static _messageSlideRandomRange = [-200, -150];
  private static _messageUserInterval = 500;
  private static _messageUserRandomness = [-50, 50];

  private static _indicatorRadius = 20;
  private static _indicatorWidth = 5;
  private static _indicatorCenter = 50;
  // private static _indicatorEasing = 0.05;
  private static _indicatorCircumference = 2 * Math.PI * FrontBackgroundElement._indicatorRadius;

  private _indicatorCurrent = 0.1;

  @state()
  private _indicatorOffset: [number, number] = [0, 0];

  protected render(): unknown {
    return html`
      <div class="root" ${ref(this._rootRef)}>
        <div class="indicator" style="translate: ${this._indicatorOffset[0]}px ${this._indicatorOffset[1]}px;">
          <svg class="progress">
            <circle class="display" 
                    cx=${FrontBackgroundElement._indicatorCenter}
                    cy=${FrontBackgroundElement._indicatorCenter}
                    r=${FrontBackgroundElement._indicatorRadius}
                    stroke-width=${FrontBackgroundElement._indicatorWidth}
                    stroke-dashoffset="${FrontBackgroundElement._indicatorCircumference * (1 - this._indicatorCurrent)}"
                    stroke-dasharray=${FrontBackgroundElement._indicatorCircumference}
            />
          </svg>
        </div>
        <div class="messages">
          ${repeat(this._messages, (it) => it.id, this.buildMessageTemplate.bind(this))}
        </div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("click", this.handleClick.bind(this));
    window.addEventListener("mousemove", this.handleMove.bind(this));
    window.addEventListener("blur", this.handleBlur.bind(this));
    window.addEventListener("focus", this.handleFocus.bind(this));
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._animationFrame.request();

    this.createMessageBatch();
  }

  private fixedAnimate() {
    this.updateIndicatorCurrent();

    this._animationFrame.request();
  }

  private updateIndicatorCurrent() {
    const elapsed = Date.now() - this._messageLatestCreate;

    const previousIndicatorCurrent = this._indicatorCurrent;

    if(elapsed > FrontBackgroundElement._messageUserInterval) {
      this._indicatorCurrent = 1;
    } else {
      this._indicatorCurrent = elapsed / FrontBackgroundElement._messageUserInterval;
    }

    if(previousIndicatorCurrent != this._indicatorCurrent) this.requestUpdate();
  }

  private activeMessages(): MessageType[] {
    return this._messages.filter((it) => !it.flagDestroy && !it.enabling);
  }

  private buildMessageTemplate(data: MessageType) {
    return html`
      <text-bubble
          blurContent
          tail=${data.tail}
          class="${data.flagDestroy ? "animate-destroy" : ""}"
          color="${data.tail == "left" ? "dodgerblue" : "lightgreen"}"
          textColor="white" 
          style="left: ${data.offset[0]}px; top: ${data.offset[1]}px; --slide: ${data.slide}%"
      >
        ${sentenceDataset[data.dataset]}
      </text-bubble>
<!--      <div style="user-select: none; position: absolute; left: ${data.offset[0]}px; top: ${data.offset[1]}px; background-color: rosybrown; font-size: 2rem">${data.id}</div>-->
    `;
  }

  private destroyMessage(message: MessageType, noUpdate: boolean = true) {
    if(message.flagDestroy) return;
    message.flagDestroy = true;
    this.requestUpdate();
    setTimeout(() => {
      // Remove from array
      this._messages.splice(this._messages.findIndex((it) => it.id == message.id), 1);
      if(!noUpdate)
        this.requestUpdate();
    }, FrontBackgroundElement._messageExitTime);
  }

  private destroyOldestMessage() {
    const active = this.activeMessages();

    let minimum: MessageType = active[0];

    for (let i = 0; i < active.length; i++) {
      const message = active[i];
      if(message.id < minimum.id) {
        minimum = message;
      }
    }

    if(minimum)
      this.destroyMessage(minimum);
  }

  private createMessage(offset: [number, number], noUpdate: boolean = false, tail: "left" | "right" | "random" = "random") {
    const data: MessageType = {
      offset: offset,
      id: this._messageCreated++,
      dataset: this._datasetCursor++,
      slide: FrontBackgroundElement._messageSlideRandomRange[0] + Math.random() * FrontBackgroundElement._messageSlideRandomRange[1],
      tail: tail == "random" ? (Math.random() > 0.5 ? "left" : "right") : tail,
      enabling: true,
      flagDestroy: false
    };

    this._datasetCursor = this._datasetCursor % sentenceDataset.length;

    if(this.activeMessages().length == FrontBackgroundElement._maxMessageCount)
      this.destroyOldestMessage();

    setTimeout(() => {
      this.destroyMessage(data);
    }, FrontBackgroundElement._messageLifetime);

    setTimeout(() => {
      data.enabling = false;
    }, FrontBackgroundElement._messageEnterTime);

    this._messages.push(data);

    if(!noUpdate)
      this.requestUpdate();

    return data;
  }

  private createMessageAtRandom(noUpdate: boolean = false) {
    const rootEl = this._rootRef.value;
    if(!rootEl) return;

    const x = 200 + Math.random() * (rootEl.clientWidth - 200);
    const y = 50 + Math.random() * (rootEl.clientHeight - 50);
    return this.createMessage([x, y], noUpdate);
  }

  private async createMessageBatch() {
    if(!this._active)
      return;

    while (this.activeMessages().length < FrontBackgroundElement._maxMessageCount) {
      this.createMessageAtRandom(true);

      await delay(FrontBackgroundElement._messageInterval);

      this.requestUpdate();
    }

    setTimeout(this.createMessageBatch.bind(this), FrontBackgroundElement._messageBatchInterval);
  }

  private handleClick(e: MouseEvent) {
    if(Date.now() - this._messageLatestCreate < FrontBackgroundElement._messageUserInterval) return;

    const [rangeMin, rangeMax] = FrontBackgroundElement._messageUserRandomness;

    const randomX = Math.randomRange(rangeMin, rangeMax);
    const randomY = Math.randomRange(rangeMin, rangeMax);

    const offsetX = e.x + randomX;
    const offsetY = e.y + randomY;

    this._messageLatestCreate = Date.now();
    this.createMessage([offsetX, offsetY]);
  }

  private handleMove(e: MouseEvent) {
    this._indicatorOffset = [e.x, e.y];
  }

  private handleBlur() {
    this._animationFrame.cancel();

    this._active = false;
  }

  private handleFocus() {
    this._animationFrame.request();

    this._active = true;
  }

  static styles = css`
    .root {
      all: inherit;

      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      
      overflow: hidden;

      filter: blur(2px);
      
      z-index: -1000;
    }

    text-bubble {
      animation: 
          ${FrontBackgroundElement._messageEnterTime}ms scale-in, 
          ease-out ${FrontBackgroundElement._messageLifetime}ms slide-up ${FrontBackgroundElement._messageEnterTime / 2}ms;

      position: absolute;
      
      z-index: -1000;
    }
    
    text-bubble[tail="left"] {
      transform-origin: top left;
      transform: translate(0, -100%);
    }
    
    text-bubble[tail="right"] {
      transform-origin: top right;
      transform: translate(-100%, -100%);
    }

    .animate-destroy {
      animation: destroy-bubble ${FrontBackgroundElement._messageExitTime}ms;
      scale: 1.5;
      opacity: 0;
    }

    .indicator {
      position: fixed;

      width: 100px;
      height: 100px;
      border-radius: 50%;
      
      transform: translate(-50%, -50%) rotate(-90deg);
      
      z-index: -999;
    }

    .indicator > .progress > .display {
      fill: none;
      stroke: var(--c);
      stroke-linecap: round;
      
      transform-origin: ${FrontBackgroundElement._indicatorCenter}px ${FrontBackgroundElement._indicatorCenter}px;
      transition: opacity 250ms, scale 250ms;
    }

    .indicator > .progress > .display[stroke-dashoffset="0"] {
      opacity: 0;
      scale: 0.8;
    }

    @keyframes slide-up {
      from {
        translate: 0 0;
      }

      to {
        translate: 0 var(--slide);
      }
    }

    @keyframes destroy-bubble {
      from {
        scale: 1;
        opacity: 1;
        translate: 0 var(--slide);
      }
      to {
        scale: 1.5;
        opacity: 0;
        translate: 0 var(--slide);
      }
    }

    @keyframes scale-in {
      from {
        scale: 0;

        transform: translate(-50%, -50%);
      }

      to {
        scale: 1;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-background": FrontBackgroundElement
  }
}