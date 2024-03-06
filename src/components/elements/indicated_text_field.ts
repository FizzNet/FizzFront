import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";

import "@comps/elements/text_field.ts";
import {styleMap} from "lit/directives/style-map.js";
import { join } from "lit/directives/join.js";
import { map } from "lit/directives/map.js";
import {createRef, ref} from "lit/directives/ref.js";

@customElement("fr-indicated-text-field")
export class FrontIndicatedTextField extends LitElement {
  @property() public primary = "var(--e-text-field-primary1)"
  @property() public secondary = "var(--e-text-field-secondary1)"
  @property() public placeholder = "";

  @property() public labels = "";
  @property() public separator = "/";
  @property() public indicated?: string;

  private inputRef = createRef<HTMLInputElement>();

  public get value() {
    return this.inputRef.value?.value;
  }

  protected splitLabels() {
    return this.labels.split(",");
  }

  protected render() {
    return html`
      <div
          id="root"
          style=${styleMap({
            "--primary": this.primary,
            "--secondary": this.secondary
          })}
      >
        <div
          id="indicator"
        >
          ${join(map(this.splitLabels(), (it) => html`
            <span class="label ${this.indicated == it ? "active" : ""}">
              ${it}
            </span>
          `), html`
            <span class="separator">
              ${this.separator}
            </span>
          `)}
        </div>
        <input
            id="input"
            type="text"
            placeholder=${this.placeholder}
            
            ${ref(this.inputRef)}
        >
      </div>
    `
  }

  static styles = css`
    #root {
      width: fit-content;
      height: fit-content;
    }
    
    #indicator {
      padding: 5px 25px;
      
      display: flex;
      align-items: center;
      justify-content: center;
      
      background: var(--primary);
      
      border-radius: 20px 20px 0 0;
      
      user-select: none;
    }
    
    .label {
      padding: 0 20px;
      
      opacity: 0.5;
      
      transition: all 250ms;
    }
    
    .label.active {
      opacity: 1;
      
      scale: 1.2;
      
      padding: 0 40px;
    }
    
    #indicator :first-child {
      transform-origin: 80% center;
    }
    
    #indicator :last-child {
      transform-origin: 20% center;
    }
    
    .separator {
      font-size: 1.5em;
    }
    
    #input {
      display: inline-block;
      
      border: none;
      appearance: none;
      outline: none;
      
      width: calc(100% - 40px);
      
      font-size: 1.2em;
      
      padding: 15px 20px;
      
      border-radius: 0 0 25px 25px;
      
      background: radial-gradient(circle at 0 center, var(--primary), var(--secondary));
      
      transition: all 0.25s;
    }

    #input:hover {
      box-shadow: 0 0 10px 5px var(--secondary);
    }

    #input:focus {
      box-shadow: 0 0 10px 5px var(--primary);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-indicated-text-field": FrontIndicatedTextField
  }
}