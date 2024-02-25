import {LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("draggable")
export class DraggableElement extends LitElement {

}

declare global {
  interface HTMLElementTagNameMap {
    "draggable": DraggableElement
  }
}