import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";

@customElement("fr-route-auth-sign-up")
export class FrontRouteAuthSignUpElement extends LitElement {
  protected render(): unknown {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-auth-signup": FrontRouteAuthSignUpElement
  }
}