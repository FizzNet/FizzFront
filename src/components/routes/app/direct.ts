import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("fr-route-app-direct")
export class FrontRouteAppDirectElement extends LitElement {

  private createActionTemplate() {
    return html`
      <div class="prompt_action">
      </div>
    `
  }

  protected render(): unknown {
    return html`
      <div class="root">
        <div class="main_area">
          
        </div>
        <div class="prompt_area">
          <div class="prompt_box">
            <div class="prompt_container">
              <input type="text" class="prompt">
              ${this.createActionTemplate()}
            </div>
          </div>
        </div>
      </div>
    `
  }

  // noinspection CssUnresolvedCustomProperty
  static styles = css`
    :host {
      --container-height: calc(var(--prompt-height) - var(--prompt-area-padding) * 2);
    }

    .root {
      width: 100%;
      height: 100%;
    }

    .main_area {
      width: 100%;
      height: calc(100% - var(--prompt-height));
    }

    .prompt_area {
      height: var(--container-height);

      padding: var(--prompt-area-padding);
    }

    .prompt_box {
      height: 100%;

      color: black;
      background-color: var(--c-theme-primary);

      border-radius: var(--prompt-container-border-radius);
    }

    .prompt_container {
      width: calc(100% - var(--prompt-container-border-radius) * 2);
      height: 100%;

      margin: 0 calc(var(--prompt-container-border-radius));

      background-color: transparent;
      //background-color: blue;

      display: flex;
    }

    .prompt {
      border: 0;

      font-size: 1.5em;

      color: var(--prompt-input-color);

      flex: auto;

      //background-color: red;
      background-color: transparent;
    }

    .prompt_action {
      width: calc(var(--prompt-height) - var(--prompt-area-padding) * 2);
    }

    .prompt:focus {
      outline: none !important;
    }
  `
}