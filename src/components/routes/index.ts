import {html, LitElement} from "lit";
import { customElement } from "lit/decorators.js";

@customElement("fr-route-index")
export class FrontRouteIndexElement extends LitElement {
  protected render() {
    return html`
      <div>
        SDF
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-index": FrontRouteIndexElement
  }
}