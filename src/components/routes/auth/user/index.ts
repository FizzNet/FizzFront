import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";
import "@comps/util/background.ts";

@customElement("fr-route-auth-user")
export class FrontRouteAuthUserView extends LitElement {
  protected render(): unknown {
    return html`
      <slot></slot>
      <fr-background class="background"></fr-background>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-auth-user": FrontRouteAuthUserView
  }
}