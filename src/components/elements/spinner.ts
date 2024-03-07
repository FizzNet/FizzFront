import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {styleMap} from "lit/directives/style-map.js";

@customElement("fr-spinner")
export class FrontSpinnerElement extends LitElement {
  @property() public size = 100;

  @property() public primary = "var(--e-spinner-primary1)";
  @property() public secondary = "var(--e-spinner-secondary1)";

  protected render(): unknown {
    return html`
      <div
          id="container"
          
          style=${styleMap({
            "--size": `${this.size}px`,
            "--primary": this.primary,
            "--secondary": this.secondary,
          })}
      ></div>
    `
  }

  static styles = css`
    :host {
      width: min-content;
      height: min-content;
      
      display: block;
    }

    #container {
      width: var(--size);
      height: var(--size);

      border-radius: 50%;
      position: relative;

      background: linear-gradient(
          165deg,
          var(--primary) 0%,
          color-mix(in srgb, var(--primary) 80%, white) 40%,
          color-mix(in srgb, var(--primary) 60%, white) 98%,
          rgb(10, 10, 10) 100%
      );
    }

    #container:before {
      --color: var(--secondary);
      
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 100%;
      //border-bottom: 0 solid #ffffff05;
      border-bottom: 0 solid color-mix(in srgb, var(--color) 2%, transparent);
      box-shadow: 0 -10px 20px 20px color-mix(in srgb, var(--color) 25%, transparent) inset,
      0 -5px 15px 10px color-mix(in srgb, var(--color) 31%, transparent) inset, 0 -2px 5px color-mix(in srgb, var(--color) 50%, transparent) inset,
      0 -3px 2px color-mix(in srgb, var(--color) 73%, transparent) inset, 0 2px 0 var(--color), 0 2px 3px var(--color),
      0 5px 5px color-mix(in srgb, var(--color) 56%, transparent), 0 10px 15px color-mix(in srgb, var(--color) 36%, transparent), 0 10px 20px 20px color-mix(in srgb, var(--color) 28%, transparent);
      filter: blur(3px);
      animation: 2s rotate linear infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  `
}