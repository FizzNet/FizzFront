import {LitElement, html, PropertyValues} from 'lit'
import { customElement } from 'lit/decorators.js'
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import {initializeRouter} from "./core/routes/routes.ts";

@customElement("fr-main")
export class FrontMainElement extends LitElement {
  renderRef: Ref<HTMLInputElement> = createRef();
  
  protected render() {
    return html`
      <div ${ref(this.renderRef)}></div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    const renderElement = this.renderRef.value;
    if(renderElement) {
      initializeRouter(renderElement);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-main": FrontMainElement;
  }
}