import {html, LitElement} from "lit";
import { customElement } from "lit/decorators.js";

import "@comps/util/draw/draw_wave.ts";
import "@comps/elements/text_field.ts";

@customElement("fr-route-test")
export class FrontRouteTestView extends LitElement {
  protected render() {
    return html`
      <div>
        <fr-text-field label="Test1"></fr-text-field>
        <fr-text-field label="Test2"></fr-text-field>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-test": FrontRouteTestView
  }
}