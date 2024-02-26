import {customElement} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import "@comps/util/background.ts";


@customElement("fr-route-error-not-found")
export class FrontRouteErrorNotFoundView extends LitElement {
  protected render(): unknown {
    return html`
      <div class="root">
        <fr-background></fr-background>
        <div class="dialog">
          <div class="title">
            <div class="error_code">404</div>
            <div class="error_description">
              Not found <span style="color: orangered">):</span>
            </div>
          </div>
          <div class="">
            
          </div>
          <div class="detail">
            
          </div>
        </div>
      </div>
    `
  }

  // noinspection CssUnusedSymbol
  static styles = css`
    .root {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;

      overflow: hidden;
    }
    
    .dialog {
      position: fixed;
      
      top: 50%;
      left: 50%;

      translate: -50% -50%;
      
      border-radius: 10px;
      
      background-color: white;
      color: black;
      
      box-shadow: lightgray 0 0 50px 2px;
      
      border: 5px solid lightgray;
      
      padding: 100px;
      
      width: 500px;
      
      transform-origin: 50% 50%;
      animation: enter 500ms;
      
      perspective: 500px;
    }
    
    .error_code {
      color: orangered;
      font-size: 7em;
      font-weight: 700;

      animation: 750ms error_code_enter;
      
      width: 300px;
      height: min-content;

      user-select: none;

      overflow: hidden;
      
      padding: 10px 20px 10px 0;

      border-radius: 0 50px 50px 0;
    }
    
    .error_code::after {
      content: '/';
      background: linear-gradient(110deg, orangered, black);
      background-clip: text;
      color: transparent;
      
      margin-left: 20px;
    }
    
    .error_description {
      font-size: 4em;
      font-weight: bold;
      
      width: 400px;
      
      user-select: none;
      
      white-space: nowrap;

      animation: 1250ms error_description_enter;
      
      overflow: hidden;
      
      border-radius: 0 50px 50px 0;
      
      padding: 20px 10px;
    }
    
    @keyframes error_code_enter {
      from {
        width: 0;
        background-color: orangered;

        opacity: 0.5;

        filter: blur(5px);
      }
      50% {
        width: 225px;
        background-color: orangered;
      }
      90% {
        width: 300px;
      }
      100% {
        background-color: transparent;

        filter: blur(0);
      }
    }
    
    @keyframes error_description_enter {
      from {
        width: 0;
        background-color: black;
        
        opacity: 0.5;

        filter: blur(5px);
      }
      50% {
        width: 400px;
        background-color: black;
      }
      100% {
        background-color: transparent;
        
        filter: blur(0);
      }
    }
    
    @keyframes enter {
      from {
        scale: 1.25;
        opacity: 0;
        filter: blur(2px);
      }
      
      to {
        scale: 1;
        opacity: 1;
        filter: blur(0);
      }
    }
    
    @keyframes exit {
      
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-error-not-found": FrontRouteErrorNotFoundView
  }
}