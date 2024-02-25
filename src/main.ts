import {LitElement, html, PropertyValues, css} from 'lit'
import { customElement } from 'lit/decorators.js'
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import {initializeRouter} from "./core/router/routes.ts";

import "@routes/auth/user/signup.ts";

@customElement("fr-main")
export class FrontMainElement extends LitElement {
  renderRef: Ref<HTMLInputElement> = createRef();
  
  protected render() {
    return html`
<!--      <fr-route-auth-user-signup></fr-route-auth-user-signup>-->
      <div class="rendered" ${ref(this.renderRef)}></div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    const renderElement = this.renderRef.value;
    if(renderElement) {
      initializeRouter(renderElement);
    }
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