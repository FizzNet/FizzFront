import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

/**
 * Common background for any pages
 */
@customElement("text-bubble")
export class TextBubbleElement extends LitElement {
  @property({ type: String })
  public tail: "none" | "left" | "right" = "left";

  @property({ type: String })
  public color = "white";

  @property({ type: String })
  public textColor = "black";

  @property({ type: Boolean })
  public blurContent: boolean = false;

  protected render(): unknown {
    return html`
      <style>
        :host {
          --color: ${this.color};
          --tcolor: ${this.textColor};
        }
      </style>
      <div class="message_box tail_${this.tail} ${this.blurContent ? "blur_content" : ""}">
        <slot></slot>
      </div>
    `
  }

  static styles = css`
    :host {
      all: inherit;
      width: auto;
      height: auto;
    }
    
    :root {
      all: inherit;
    }
    
    .message_box {
      user-select: none;
      
      position: relative;

      background-color: var(--color);
      
      width: fit-content;
      max-width: 300px;
      
      padding: 10px 15px 10px 15px;
      
      border-radius: 10px;
      
      color: var(--tcolor);
    }
    
    .message_box.blur_content {
      text-shadow: 0 0 10px var(--tcolor);
      color: transparent;
    }
    
    .message_box.tail_right {
      border-bottom-right-radius: 0;
    }
    
    .message_box.tail_left {
      border-bottom-left-radius: 0;
    }

    .message_box::after {
      content: '';
      position: absolute;

      width: 20px;
      height: 10px;
      
      background-color: transparent;
      
      display: none;
    }
    
    .message_box.tail_right::after {
      right: -20px;

      border-bottom-left-radius: 10px;

      box-shadow: -10px 0 0 0 var(--color);
      
      display: block;
    }
    
    .message_box.tail_left::after {
      left: -20px;

      border-bottom-right-radius: 10px;
      
      box-shadow: 10px 0 0 0 var(--color);
      
      display: block;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "text-bubble": TextBubbleElement
  }
}