import {html, LitElement} from "lit";
import { customElement } from "lit/decorators.js";

import "@comps/util/draw/draw_wave.ts";
import "@comps/elements/text_field.ts";
import "@comps/elements/user_identifier_field.ts";
import "@comps/elements/spinner.ts";

@customElement("fr-route-test")
export class FrontRouteTestView extends LitElement {
  protected render() {
    return html`
      <div>
        <fr-spinner></fr-spinner>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-test": FrontRouteTestView
  }
}