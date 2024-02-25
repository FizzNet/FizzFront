import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";

@customElement("fr-route-auth-user-signin")
export class FrontRouteAuthSignInView extends LitElement {
  protected render(): unknown {
    return html`
      <slot>
        
      </slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-auth-user-signin": FrontRouteAuthSignInView
  }
}