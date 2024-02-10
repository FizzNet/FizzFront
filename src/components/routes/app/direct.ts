import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement("fr-route-app-direct")
export class FrontRouteAppDirectElement extends LitElement {
  protected render(): unknown {
    return html`
      <div class="root">
        <div class="main_area">
          
        </div>
        <div class="prompt_area">
          <div class="prompt_container">
            <input type="text" class="prompt">
          </div>
        </div>
      </div>
    `
  }

  static styles = css`
    .root {
      width: 100%;
      height: 100%;
    }
    
    .main_area {
      width: 100%;
      height: calc(100% - var(--prompt-height));
    }
    
    .prompt_area {
      height: calc(var(--prompt-height) - 2 * var(--prompt-area-padding));
      
      padding: var(--prompt-area-padding);
    }
    
    .prompt_container {
      height: 100%;
      
      background-color: cyan;
      
      border-radius: var(--prompt-container-border-radius);
    }
    
    .prompt {
      border: 0;
      
      width: calc(100% - 50px);
      height: 30px;
      margin: 1px 1px 1px 1px;
      background-color: blue;
    }
    
    .prompt:focus {
      outline: none!important;
    }
  `
}