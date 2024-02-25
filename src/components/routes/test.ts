import {html, LitElement} from "lit";
import { customElement } from "lit/decorators.js";

import "@comps/util/draw/draw_wave.ts";

@customElement("fr-route-test")
export class FrontRouteTestView extends LitElement {
  protected render() {
    return html`
      <div>
        <draw-wave width=${window.innerWidth - 100} height=${window.innerHeight - 100}></draw-wave>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-test": FrontRouteTestView
  }
}