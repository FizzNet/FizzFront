import {css, html, LitElement, PropertyValues} from "lit";
import {customElement, property, query, state} from "lit/decorators.js";
import {Draw} from "@src/util/draw/rect_cursor_provider.ts";
import {Number2} from "@src/util/math/type.ts";
import {styleMap} from "lit/directives/style-map.js";
import {Interpolation} from "@src/util/math/interpolation.ts";

@customElement("fr-button")
export class FrontButtonElement extends LitElement {
  @property()
  public primary = "var(--e-button-primary1)";

  @property()
  public secondary = "var(--e-button-quaternary1)";

  @property({ type: Number })
  public expandStop = 500;

  @query("#root")
  private _queryElement!: HTMLButtonElement;

  @state()
  private _gradientOffset: Number2 = { x: 0, y: 0 };

  @state()
  private _gradientOuterPosition = 100;

  private _rectCursorProvider = new Draw.InterpolatedRectCursorProvider(
    (position) => {
      this._gradientOffset = position;
    },
    (element) => {
      return {
        x: element.clientWidth / 2,
        y: element.clientHeight * -2
      }
    },
    0.1
  );


  private _gradientSecondPositionInterpolator = Interpolation.animatedLinearNumber(
    this._gradientOuterPosition,
    this._gradientOuterPosition,
    0.1
  ).subscribe((v) => this._gradientOuterPosition = v);

  protected render(): unknown {
    return html`
      <button
          id="root"
          style=${styleMap({
            "--gradient-offset": `${this._gradientOffset.x}px ${this._gradientOffset.y}px`,
            "--gradient-primary": `${this.primary}`,
            "--gradient-secondary": `${this.secondary}`,
            "--gradient-secondary-stop": `${this._gradientOuterPosition}%`
          })}
          @mousedown=${this.expandGradient.bind(this)}
          @mouseenter=${this.expandGradient.bind(this)}
          @mouseup=${this.shrunkGradient.bind(this)}
          @mouseleave=${this.shrunkGradient.bind(this)}
      >
        <slot></slot>
      </button>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._rectCursorProvider.create(this._queryElement);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._rectCursorProvider.destroy();
    this._gradientSecondPositionInterpolator.remove();
  }

  private expandGradient(e: MouseEvent) {
    // [1] Primary button
    if(e.buttons & 1) {
      this._gradientSecondPositionInterpolator.target = this.expandStop;
    }
  }

  private shrunkGradient() {
    this._gradientSecondPositionInterpolator.target = 100;
  }

  static styles = css`
    #root {
      all: inherit;
      
      width: 100%;
      height: 100%;
      
      box-sizing: border-box;
      
      border: 2px solid var(--gradient-primary);

      padding: 15px 20px;
      border-radius: 50px;

      box-shadow: 0 0 0 0 var(--gradient-secondary);

      background: radial-gradient(circle at var(--gradient-offset), var(--gradient-primary), var(--gradient-secondary) var(--gradient-secondary-stop));

      transition: all 0.25s;

      user-select: none;
      
      text-align: center;
    }
    
    #root:hover {
      box-shadow: 0 0 10px 1px var(--gradient-secondary);
    }
    
    #root:active {
      box-shadow: 0 0 10px 1px var(--gradient-primary);
    }
  `


}

declare global {
  interface HTMLElementTagNameMap {
    "fr-button": FrontButtonElement
  }
}