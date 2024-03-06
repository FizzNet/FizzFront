import {customElement, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import "@comps/template/form.ts";
import "@comps/template/form_stage.ts";
import "@comps/util/background.ts";
import "@comps/elements/button";
import "@comps/elements/text_field.ts";
import "@comps/elements/user_identifier_field.ts";
import {Router} from "@lit-labs/router";
import {createRef, ref} from "lit/directives/ref.js";
import {FrontUserIdentifierField} from "@comps/elements/user_identifier_field.ts";

@customElement("fr-route-auth-user-signup")
export class FrontRouteAuthSignUpView extends LitElement {
  @state()
  private _stage = 0;

  private refIdentifierField = createRef<FrontUserIdentifierField>();

  protected renderStage1() {
    const actionNext = () => {
      const field = this.refIdentifierField.value!!;

      this._stage = 1;
    }

    return html`
      <fr-form-stage stage=${0}>
        <fr-user-identifier-field
            primary="var(--e-text-field-primary2)"
            secondary="var(--e-text-field-secondary2)"
            
            ${ref(this.refIdentifierField)}
        ></fr-user-identifier-field>

        <div class="actions">
          <fr-button
              class="action signin"
              primary="var(--e-button-primary3)"
              secondary="var(--e-button-secondary3)"

              @click=${() => Router.root().navigate("/auth/user/signin")}
          >
            Sign In
          </fr-button>
          <fr-button
              class="action next"
              primary="var(--e-button-primary2)"
              secondary="var(--e-button-secondary2)"
              
              @click=${actionNext}
          >
            Next
          </fr-button>
        </div>
      </fr-form-stage>
    `
  }

  protected renderStage2() {
    return html`
      <fr-form-stage stage=${1}>
        asdf
      </fr-form-stage>
    `
  }

  private handleStage() {
    window.location.hash = `${this._stage}`;
  }

  protected render(): unknown {
    return html`
      <div class="root">
        <fr-form class="form" stage=${this._stage} @stage=${this.handleStage}>
          <span slot="title">Sign up</span>
          <span slot="description">In a minute</span>
          
          <div slot="stages">
            ${this.renderStage1()}
            ${this.renderStage2()}
          </div>
        </fr-form>
      </div>
    `
  }

  static styles = css`
    .root {
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      
      overflow: hidden;
      
      display: flex;

      justify-content: center;
      align-items: center;
    }
    
    .actions {
      display: flex;
      gap: 5%;
      
      margin-top: 20px;
    }
    
    .action {
      flex: 1;
    }
    
    .background {
      position: absolute;
      top: 0;
      left: 0;
      
      filter: blur(10px);
      
      z-index: -1000;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-auth-user-signup": FrontRouteAuthSignUpView
  }
}