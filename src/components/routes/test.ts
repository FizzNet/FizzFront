import {html, LitElement} from "lit";
import { customElement } from "lit/decorators.js";

import "@comps/util/draw/draw_wave.ts";
import "@comps/elements/text_field.ts";
import "@comps/elements/user_identifier_field.ts";

@customElement("fr-route-test")
export class FrontRouteTestView extends LitElement {
  protected render() {
    return html`
      <div>
        <fr-user-identifier-field></fr-user-identifier-field>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-test": FrontRouteTestView
  }
}