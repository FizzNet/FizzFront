import {LitElement, html, css, PropertyValues} from "lit";
import {customElement, property, query, state} from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {Number2} from "@src/util/math/type.ts";
import {Draw} from "@src/util/draw/rect_cursor_provider.ts";
import InterpolatedRectCursorProvider = Draw.InterpolatedRectCursorProvider;

declare global {
  interface HTMLElementEventMap {
    "stage": FrontFormStageEvent
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

  @state()
  private _gradientOffset: Number2 = { x: 0, y: 0 };

  @query(".box")
  private queryBox!: HTMLDivElement;

  @property({ type: Number })
  public stage = 0;

  @property({ type: Number })
  public transitionDuration = 1000;

  protected render(): unknown {
    return html`
      <div class="root">
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
          
          <div class="stages">
            <slot name="stages"></slot>
          </div>
          
          <div class="divider"></div>
          
          <div class="action">
            <slot name="action"></slot>
          </div>
        </div>
      </div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._rectCursorProvider.create(this.queryBox);
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
      this.dispatchEvent(new CustomEvent<FrontFormStageEvent>("stage", {
        detail: {
          from: from,
          to: to,
          direction: from < to ? "right" : "left"
        }
      }));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._rectCursorProvider.destroy();
  }

  static styles = css`
    .box {
      padding: 50px;

      border-radius: 20px;

      background: radial-gradient(circle at var(--gradient-offset), var(--c-theme-tertiary), white 150%);
      box-shadow: 0 0 25px 5px var(--c-theme-tertiary);

      color: black;

      animation: box-enter 500ms;

      perspective: 500px;

      transition: background 1s;
    }

    @keyframes box-enter {
      0% {
        scale: 1.5;
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