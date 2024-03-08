import {FrontMainElement} from "@src/main.ts";
import {Router} from "@lit-labs/router";

declare module "@lit-labs/router" {
  interface Router {
    navigate(url: string): Promise<void>;
  }

  class Router {
    static root(): Router;
  }
}

Router.prototype.navigate = function (url: string) {
  history.pushState({}, "", url);
  return this.goto(url);
}

Router.root = function () {
  return FrontMainElement.instance.router;
}