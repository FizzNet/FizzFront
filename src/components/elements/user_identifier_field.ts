import {html, LitElement} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import "@comps/elements/indicated_text_field.ts";
import { guard } from "lit/directives/guard.js";
import {FrontTextField} from "@comps/elements/text_field.ts";
import {createRef, ref} from "lit/directives/ref.js";
import { Validate } from "../util/validate/validate.ts";

type DataType = "email" | "username" | "phone_number"

@customElement("fr-user-identifier-field")
export class FrontUserIdentifierField extends LitElement {
  @property() public primary = "var(--e-text-field-primary1)"
  @property() public secondary = "var(--e-text-field-secondary1)"
  @property() public placeholder = "";

  @state()
  protected _dataType: DataType = "username";

  protected get labelEmail() {
    return "Email"
  }

  protected get labelUsername() {
    return "Username"
  }

  protected get labelPhoneNumber() {
    return "Tell"
  }

  protected updateDataType(data: string) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const inferTell = Validate.inferTell(data);
    if (inferTell == "valid" || inferTell == "obvious") {
      this._dataType = "phone_number";
    } else if(regexEmail.test(data)) {
      this._dataType = "email";
    } else {
      this._dataType = "username";
    }
  }

  protected labelNameByDataType() {
    switch (this._dataType) {
      case "email":
        return this.labelEmail;
      case "phone_number":
        return this.labelPhoneNumber;
      case "username":
        return this.labelUsername;
    }
  }

  public isValidate() {
    if (this._dataType == "username") { // Username type isn't validated by type updater
      return Validate.validateUsername(this.value);
    } else //  Other types are already validated
      return true;
  }

  private inputRef = createRef<HTMLInputElement>();

  public get value() {
    return this.inputRef.value?.value ?? "";
  }

  protected render() {
    return html`
      <fr-indicated-text-field
          primary=${this.primary}
          secondary=${this.secondary}
          placeholder=${this.placeholder}
          
          labels="${this.labelEmail},${this.labelUsername},${this.labelPhoneNumber}"
          indicated=${guard([this._dataType], () => this.labelNameByDataType())}
          
          @input=${(e: InputEvent) => this.updateDataType((e.target as FrontTextField).value ?? "")}
          
          ${ref(this.inputRef)}
      >
        
      </fr-indicated-text-field>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fr-user-identifier-field": FrontUserIdentifierField
  }
}