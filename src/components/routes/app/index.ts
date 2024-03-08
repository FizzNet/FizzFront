import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";

@customElement("fr-route-app")
export class FrontRouteAppView extends LitElement {
  protected render(): unknown {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-app": FrontRouteAppView
  }
}