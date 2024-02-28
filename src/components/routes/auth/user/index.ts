import {customElement} from "lit/decorators.js";
import {html, LitElement} from "lit";
import "@comps/util/background.ts";
import {Routes} from "@lit-labs/router";
import {createAuthUserRoutes} from "@src/core/router/routes.ts";

@customElement("fr-route-auth-user")
export class FrontRouteAuthUserView extends LitElement {
  public routes = new Routes(this, createAuthUserRoutes());

  protected render(): unknown {
    return html`
      ${this.routes.outlet()}
<!--      <fr-background class="background"></fr-background>-->
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-auth-user": FrontRouteAuthUserView
  }
}