import {customElement, property, state} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {FrontFormElement, FrontFormStageEvent} from "@comps/template/form.ts";

@customElement("fr-form-stage")
export class FrontFormStageElement extends LitElement {
  private _formElement!: FrontFormElement;

  @property()
  public stage: number = 0;

  protected render() {
    return html`
      <slot></slot>
    `
  }

  connectedCallback() {
    super.connectedCallback();

    const formElement = this.closest("fr-form");
    if(!formElement)
      throw Error("`fr-form-stage` must be inside `fr-form` element")

    this._formElement = formElement;
    this._formElement.addEventListener("stage", this.handleStage);
  }

  private handleStage(event: FrontFormStageEvent) {

  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-form-stage": FrontFormStageElement
  }
}