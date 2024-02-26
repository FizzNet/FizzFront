import {css, html, LitElement, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";
import {styleMap} from "lit/directives/style-map.js";

@customElement("fr-text-field")
export class FrontTextField extends LitElement {
  @property()
  public primary = "var(--e-text-field-primary1)"

  @property()
  public secondary = "var(--e-text-field-secondary1)"

  @property()
  public label?: string = undefined;

  @property()
  public placeholder = "";

  protected renderLabel() {
    if(!this.label) return nothing;
    return html`
      <label for="#input" class="label">
        ${this.label}
        <span class="label-content">
          ${this.label}
        </span>
      </label>
    `
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
        ${this.renderLabel()}
        <input
            id="input"
            type="text"
            placeholder=${this.placeholder}
        >
      </div>
    `
  }

  static styles = css`
    #root {
      display: flex;
    }
    
    #input {
      display: inline-block;
      
      border: none;
      appearance: none;
      outline: none;
      
      font-size: 1.2em;
      
      padding: 15px 20px;
      
      border-radius: 100px;
      
      background: radial-gradient(circle at 0 center, var(--primary), var(--secondary));
      
      transition: all 0.25s;
    }

    #input:hover {
      box-shadow: 0 0 10px 5px var(--secondary);
    }

    #input:focus {
      box-shadow: 0 0 10px 5px var(--primary);
    }
    
    #root:has(.label) #input {
      border-radius: 0 15px 15px 0;
    }
    
    .label {
      background: var(--primary);
      
      padding: 0 20px;
      
      display: flex;
      align-items: center;
      
      border-radius: 15px 0 0 15px;
      
      color: transparent;
    }
    
    .label-content {
      position: absolute;
      
      color: black;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-text-field": FrontTextField
  }
}