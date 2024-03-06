import {LitElement, html, css, PropertyValues} from "lit";
import {customElement, property, query, state} from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {Number2} from "@src/util/math/type.ts";
import {Draw} from "@src/util/draw/rect_cursor_provider.ts";
import InterpolatedRectCursorProvider = Draw.InterpolatedRectCursorProvider;
import {FrontFormStageElement} from "@comps/template/form_stage.ts";
import {classMap} from "lit/directives/class-map.js";
import {AnimationFrame} from "@src/util/animation_frame.ts";

declare global {
  interface HTMLElementEventMap {
    "stage": CustomEvent<FrontFormStageEvent>
  }
}

export type FrontFormStageEvent = {
  from: number,
  to: number
  direction: "left" | "right"
};

@customElement("fr-form")
export class FrontFormElement extends LitElement {
  private _rectCursorProvider = new InterpolatedRectCursorProvider(
    (position) => {
      this._gradientOffset = position;
    },
    (element) => {
      return {
        x: element.clientWidth / 2,
        y: 40
      }
    },
    0.1
  );

  private _stagesContainerSizeAnimator = new AnimationFrame(this.updateStagesContainerSize.bind(this));

  public stageMap: Record<number, FrontFormStageElement> = {};

  @state()
  private _gradientOffset: Number2 = { x: 0, y: 0 };

  @state()
  private _stageSize?: Number2 = undefined;

  @state()
  private _loading = false;

  @property()
  public loading = false;

  @property({ type: Number })
  public stage = 0;

  @property({ type: Number })
  public transitionDuration = 500;

  // Queries
  @query(".box")
  private queryBox!: HTMLDivElement;

  @query(".stages > slot")
  private queryStagesSlot!: HTMLSlotElement;

  protected render(): unknown {
    return html`
      <div class="root" style=${styleMap({
        "--transition-duration": `${this.transitionDuration}ms`
      })}>
        <div
            class="box"
            style=${styleMap({
              "--gradient-offset": `${this._gradientOffset.x}px ${this._gradientOffset.y}px`
            })}
        >
          <div class="title">
            <slot name="title">Untitled form</slot>
          </div>
          
          <div class="description">
            <slot name="description"></slot>
          </div>
          
          <div class="divider"></div>
          
          <div class="main">
            <slot name="main"></slot>
          </div>
          
          <div class="stages ${classMap({
            "loading": this.loading || this._loading
          })}" style=${styleMap({
            "height": `${this._stageSize ? `${this._stageSize.y}px` : `auto`}`,
            "width": `${this._stageSize ? `${this._stageSize.x}px` : `auto`}`,
          })}>
            <slot name="stages" @slotchange=${this.handleStagesSlotChange.bind(this)}></slot>
          </div>
        </div>
      </div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._rectCursorProvider.create(this.queryBox);
    this._stagesContainerSizeAnimator.request();

    this.updateStagesMap();
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    if(_changedProperties.has("stage")) {
      const from = _changedProperties.get("stage");
      if(from == undefined) {
        // Initial emission, cancel it
        return;
      }
      const to = this.stage;

      this.updateStage(from, to);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._rectCursorProvider.destroy();
    this._stagesContainerSizeAnimator.cancel();
  }

  private updateStage(from: number, to: number) {
    this.dispatchEvent(new CustomEvent<FrontFormStageEvent>("stage", {
      detail: {
        from: from,
        to: to,
        direction: from < to ? "right" : "left"
      }
    }));

    this._loading = true;
    setTimeout(() => {
      this._loading = false;
    }, this.transitionDuration);
  }

  private updateStagesContainerSize() {
    const element = this.stageMap[this.stage];
    this._stageSize = {
      x: element.offsetWidth,
      y: element.offsetHeight
    };

    this._stagesContainerSizeAnimator.request();
  }

  private handleStagesSlotChange() {
    this.updateStagesMap()
  }

  private updateStagesMap() {
    const map: Record<number, FrontFormStageElement> = {};
    for (const element of this.queryStagesSlot.assignedElements()[0].children) {
      if(element instanceof FrontFormStageElement) {
        map[element.stage] = element;
      }
    }

    this.stageMap = map;
  }

  static styles = css`
    .box {
      --box-padding: 50px;
      
      padding: var(--box-padding);

      border-radius: 20px;

      background: radial-gradient(circle at var(--gradient-offset), var(--c-theme-tertiary), white 150%);
      box-shadow: 0 0 25px 5px var(--c-theme-tertiary);

      color: black;

      animation: box-enter 500ms;

      transition: background 1s;
    }

    @keyframes box-enter {
      0% {
        scale: 0.9;
        opacity: 0;
        filter: blur(10px);
      }

      100% {
        scale: 1;
        filter: blur(0);
      }
    }

    .title {
      font-size: 2em;
      font-weight: normal;

      user-select: none;

      text-align: center;

      animation: title-enter 1s;
    }

    @keyframes title-enter {
      0% {
        rotate: 90deg 1 0 0;
        scale: 0.5;
      }
      100% {
        rotate: 0deg 0 0 0;
        scale: 1;
      }
    }

    .description {
      font-size: 1.2em;

      text-align: center;
      
      min-width: 250px;

      overflow: hidden;
      
      background-image: linear-gradient(90deg, black 20%, var(--c-theme-quaternary) 50%, black 80%);
      background-size: 200%;
      background-clip: text;
      color: transparent;

      animation: description-enter 1s,  background-position-ltr linear 5s infinite;

      white-space: nowrap;

      user-select: none;
    }

    @keyframes description-enter {
      0% {
        rotate: 90deg 1 0 0;
        scale: 1.2;
      }

      100% {
        rotate: 0deg 0 0 0;
        scale: 1;
      }
    }
    
    .stages {
      transition: all 500ms, filter 200ms;
      
      position: relative;
      
      animation: stages-enter 500ms;
    }
    
    .stages.loading {
      filter: blur(5px);
      
      overflow: clip;
    }
    
    .divider {
      width: 100%;
      height: 1px;

      margin: 20px 0;

      background-color: dimgray;

      //animation: divider-enter 1s;
    }

    @keyframes divider-enter {
      0% {
        scale: 0;
      }
      100% {
        scale: 1;
      }
    }

    @keyframes background-position-ltr {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-form": FrontFormElement
  }
}