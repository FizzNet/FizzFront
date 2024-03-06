import "@src/util/string.ts";

export module Validate {
  export const expUsername = /^[a-zA-Z0-9_.]+$/g;
  export const expDigits = /[^0-9]/;
  export const expTell = /^\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g;

  export function inferTell(data: string): "valid" | "obvious" | "invalid" {
    data = data.replace("-", "");

    if(data.count("+") > 1) return "invalid";
    if(data.indexOf("+") !=0) return "invalid";

    if(expTell.test(data)) return "valid";
    else return "obvious";
  }

  export function validateUsername(data: string) {
    const test = expUsername.test(data);
    return test;
  }
}