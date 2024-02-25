import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("fr-route-app-direct")
export class FrontRouteAppDirectView extends LitElement {

  private createActionTemplate() {
    return html`
      <div class="prompt_action">
        <div class="prompt_action_display">
          <span class="material-symbols-outlined">search</span>
        </div>
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
              <div class="prompt_divider"></div>
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
      
      margin-right: calc(var(--prompt-area-padding) * -1);
      
      border-radius: var(--prompt-container-border-radius) 0 0 var(--prompt-container-border-radius);
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
    
    .prompt_divider {
      width: 2px;
      height: 100%;
      background-color: lightgray;
    }

    .prompt_action {
      width: calc(var(--prompt-height) - var(--prompt-area-padding) * 2);
    }
    
    .prompt_action:hover .prompt_action_display {
      background-color: rgba(128, 128, 128, 30%);
    }
    
    .prompt_action_display {
      border-radius: 50%;
      
      width: 80%;
      height: 80%;
      margin: 10%;
      
      transition: background-color 0.1s;
    }

    .prompt:focus {
      outline: none !important;
    }
  `
}