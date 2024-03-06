import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {FrontFormElement, FrontFormStageEvent} from "@comps/template/form.ts";
import { classMap } from "lit/directives/class-map.js";
import {styleMap} from "lit/directives/style-map.js";
import "@src/util/element.ts";

@customElement("fr-form-stage")
export class FrontFormStageElement extends LitElement {
  private _formElement!: FrontFormElement;

  private _classMap: any = {};

  @property()
  public stage: number = 0;

  protected render() {
    return html`
      <div class="container ${classMap(this._classMap)}" style=${styleMap({
        "--transition-duration": `${this._formElement.transitionDuration}ms`
      })}>
        <slot></slot>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    this._formElement = this.requireParent("fr-form");
    this._formElement.addEventListener("stage", this.handleStage.bind(this));

    if(this._formElement.stage == this.stage) {
      this._classMap["current"] = true;
    }
  }

  private handleStage(event: CustomEvent<FrontFormStageEvent>) {
    const detail = event.detail;
    console.log(`${detail.from} -> ${detail.to}, ${this.stage}`);

    if(detail.from == this.stage) {
      // This stage is exiting
      console.log(`[Stage ${this.stage}] Exiting`);

      this._classMap["slide-out"] = true;
      this._classMap[detail.direction] = true;
      this.requestUpdate();

      setTimeout(() => {
        delete this._classMap["current"];
        delete this._classMap["slide-out"];
        delete this._classMap[detail.direction];
        this.requestUpdate();
      }, this._formElement.transitionDuration);
    } else if(detail.to == this.stage) {
      // This stage is entering
      console.log(`[Stage ${this.stage}] Entering`);

      this._classMap["slide-in"] = true;
      this._classMap[detail.direction] = true;
      this.requestUpdate();

      setTimeout(() => {
        delete this._classMap["slide-in"];
        delete this._classMap[detail.direction];
        this._classMap["current"] = true;

        this.requestUpdate();
      }, this._formElement.transitionDuration);
    }
  }

  static styles = css`
    :host {
      //--timing-function: ease;
      //--timing-function: cubic-bezier(0, 0, 0, 0.);
      --timing-function: cubic-bezier(0.39,0.57,0.56,1);;
      //--timing-function: cubic-bezier(0.68, -0.55, 0.27, 1);
      
      width: min-content;
      height: min-content;
      
      display: block;
    }
    
    .container {
      display: none;
    }
    
    .current {
      display: block;
      
      width: min-content;
      height: min-content;
      
      transform: none;
    }
    
    .slide-out {
      pointer-events: none;
      
      position: absolute;
      
      transition: all var(--transition-duration) var(--timing-function);
      
      opacity: 0;
    }
    
    .slide-out.left {
      transform: translateX(150%);
      filter: blur(10px);
    }
    
    .slide-out.right {
      transform: translateX(-150%);
      filter: blur(10px);
    }
    
    .slide-in {
      pointer-events: none;
      
      display: block;
    }
    
    .slide-in.left {
      animation: slide-in-left var(--transition-duration) var(--timing-function);
    }
    
    .slide-in.right {
      animation: slide-in-right var(--transition-duration) var(--timing-function);
    }
    
    @keyframes slide-in-left {
      from {
        transform: translateX(-150%);
        filter: blur(10px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
      }
    }
    
    @keyframes slide-in-right {
      from {
        transform: translateX(150%);
        filter: blur(10px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-form-stage": FrontFormStageElement
  }
}