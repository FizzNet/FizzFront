import {customElement, property} from "lit/decorators.js";
import {html, LitElement, PropertyValues} from "lit";
import {createRef, ref} from "lit/directives/ref.js";
import {Draw} from "@src/util/draw/wave.ts";


@customElement("draw-wave")
export class DrawWaveElement extends LitElement {
  @property()
  public width: number = 100;
  @property()
  public height: number = 100;

  private canvasRef = createRef<HTMLCanvasElement>();

  private draw!: Draw.Wave;

  protected render(): unknown {
    return html`
      <canvas width=${this.width} height=${this.height} style="width: ${this.width}px; height: ${this.height}px" ${ref(this.canvasRef)}></canvas>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    const canvasElement = this.canvasRef.value;
    if(canvasElement) {
      this.draw = new Draw.Wave(canvasElement);
      this.draw.start();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "draw-wave": DrawWaveElement
  }
}