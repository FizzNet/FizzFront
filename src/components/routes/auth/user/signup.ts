import {customElement, state} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import "@comps/template/form.ts";
import "@comps/template/form_stage.ts";
import "@comps/util/background.ts";
import "@comps/elements/button";
import "@comps/elements/text_field.ts";
import {Router} from "@lit-labs/router";

@customElement("fr-route-auth-user-signup")
export class FrontRouteAuthSignUpView extends LitElement {
  @state()
  private _stage = 0;

  protected render(): unknown {
    return html`
      <div class="root">
        <fr-form class="form" stage=${this._stage}>
          <span slot="title">Sign up</span>
          <span slot="description">In a minute</span>
          
          <div slot="stages">
            <fr-form-stage stage=${0}>
              <fr-text-field
                  primary="var(--e-text-field-primary2)"
                  secondary="var(--e-text-field-secondary2)"

                  label="Email"
              ></fr-text-field>
            </fr-form-stage>
            <fr-form-stage stage=${1}>
              <fr-text-field
                  primary="var(--e-text-field-primary2)"
                  secondary="var(--e-text-field-secondary2)"

                  label="EmaAil"
              ></fr-text-field>
            </fr-form-stage>
          </div>
          
          <div class="actions" slot="action">
            <fr-button
                class="action-signin"
                primary="var(--e-button-primary3)"
                secondary="var(--e-button-secondary3)"
                
                @click=${() => Router.root().navigate("/auth/user/signin")}
            >
              Sign In
            </fr-button>
            <fr-button
                class="action-next"
                primary="var(--e-button-primary2)" 
                secondary="var(--e-button-secondary2)"
                
                @click=${() => {
                  this._stage = 1;
                }}
            >
              Next
            </fr-button>
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
    
    .background {
      position: absolute;
      top: 0;
      left: 0;
      
      filter: blur(10px);
      
      z-index: -1000;
    }
    
    .actions {
      display: flex;
      
      width: 100%;
      gap: 20px;
    }
    
    .action-signin {
      flex: 1;
    }
    
    .action-next {
      flex: 1;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-route-auth-user-signup": FrontRouteAuthSignUpView
  }
}