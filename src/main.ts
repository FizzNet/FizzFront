import {LitElement, html, PropertyValues, css} from 'lit'
import { customElement } from 'lit/decorators.js'
import { Router } from '@lit-labs/router';
import {createMainRoutes} from "@src/core/router/routes.ts";

@customElement("fr-main")
export class FrontMainElement extends LitElement {
  public static instance: FrontMainElement;

  public router = new Router(this, createMainRoutes());

  constructor() {
    super();

    FrontMainElement.instance = this;
  }

  protected render() {
    return html`
      <div class="rendered">${this.router.outlet()}</div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
  }

  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      
      overflow: hidden;
    }
    
    .rendered {
      width: 100%;
      height: 100%;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-main": FrontMainElement;
  }
}