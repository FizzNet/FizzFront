import {css, html, LitElement, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";
import {styleMap} from "lit/directives/style-map.js";
import {createRef, ref} from "lit/directives/ref.js";

@customElement("fr-text-field")
export class FrontTextField extends LitElement {
  @property() public primary = "var(--e-text-field-primary1)"
  @property() public secondary = "var(--e-text-field-secondary1)"
  @property() public label?: string = undefined;
  @property() public placeholder = "";

  private inputRef = createRef<HTMLInputElement>();

  public get value() {
    return this.inputRef.value?.value;
  }

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
            
            ${ref(this.inputRef)}
        >
      </div>
    `
  }

  static styles = css`
    #root {
      display: flex;
      
      width: fit-content;
      height: fit-content;
    }
    
    #input {
      display: inline-block;
      
      border: none;
      appearance: none;
      outline: none;
      
      width: 250px;
      
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
      border-radius: 0 100px 100px 0;
    }
    
    .label {
      background: var(--primary);
      
      padding: 0 20px;
      
      display: flex;
      justify-content: center;
      align-items: center;
      
      border-radius: 100px 0 0 100px;
      border-collapse: collapse;
      
      min-width: 60px;
      
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