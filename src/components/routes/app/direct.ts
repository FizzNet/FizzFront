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
          <input type="text" class="prompt">
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
      width: 100%;
      height: var(--prompt-height);
    }
    
    .prompt {
      
    }
  `
}