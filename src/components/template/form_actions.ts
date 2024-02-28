import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";

@customElement("fr-form-actions")
export class FrontFormActions extends LitElement {
  protected render() {
    return html`
      <div slot="actions">
        <slot></slot>
      </div>
    `
  }
}