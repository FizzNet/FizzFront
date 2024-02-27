import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {FrontFormElement, FrontFormStageEvent} from "@comps/template/form.ts";
import { classMap } from "lit/directives/class-map.js";
import {styleMap} from "lit/directives/style-map.js";

@customElement("fr-form-stage")
export class FrontFormStageElement extends LitElement {
  private _formElement!: FrontFormElement;

  private _classMap: Record<string, string | boolean | number> = {};

  @property()
  public stage: number = 0;

  protected render() {
    return html`
      <div class="container ${classMap(this._classMap)}" style=${styleMap({
        "--transition-duration": this._formElement.transitionDuration
      })}>
        <slot></slot>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    const formElement = this.closest("fr-form");
    if(!formElement)
      throw Error("`fr-form-stage` must be inside `fr-form` element")

    this._formElement = formElement;
    this._formElement.addEventListener("stage", this.handleStage);

    if(this._formElement.stage == this.stage) {
      this._classMap["current"] = true;
    }
  }

  private handleStage(event: FrontFormStageEvent) {
    if(event.from == this.stage) {
      // This stage is exiting

      this._classMap["slide-out"] = true;
      this._classMap[event.direction] = true;

      setTimeout(() => {
        delete this._classMap["slide-out"];
        delete this._classMap[event.direction];
      }, this._formElement.transitionDuration);
    } else if(event.to == this.stage) {
      // This stage is entering

      this._classMap["slide-in"] = true;
      this._classMap[event.direction] = true;

      setTimeout(() => {
        delete this._classMap["slide-in"];
        delete this._classMap[event.direction];
        this._classMap["current"] = true;
      }, this._formElement.transitionDuration);
    }
  }

  static styles = css`
    .container {
      display: none;
    }
    
    .current {
      display: block;
    }
    
    .slide-out {
      pointer-events: none;
      
      position: absolute;
      opacity: 0;
    }
    
    .slide-out .left {
      transform: translateX(-150%);
    }
    
    .slide-out .right {
      transform: translateX(150%);
    }
    
    .slide-in {
      pointer-events: none;
      
      display: block;
    }
    
    .slide-in .left {
      animation: slide-in-left var(--transition-duration)ms;
    }
    
    .slide-in .right {
      animation: slide-in-right var(--transition-duration)ms;
    }
    
    @keyframes slide-in-left {
      from {
        opacity: 0;
        transform: translateX(150%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slide-in-right {
      from {
        opacity: 0;
        transform: translateX(-150%);
      }
      to {
        opacity: 1;
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