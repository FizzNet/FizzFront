import {RouteConfig} from "@lit-labs/router";
import {html} from "lit";

export function createMainRoutes(): RouteConfig[] {
  return [{
    path: "/auth/user/*",
    render: () => html`<fr-route-auth-user></fr-route-auth-user>`,
    enter: async () => {
      await import("@routes/auth/user");
      return true;
    }
  }, {
    path: "/app/direct",
    render: () => html`<fr-route-app-direct></fr-route-app-direct>`,
    enter: async () => {
      await import("@routes/app/direct");
      return true;
    }
  }, {
    path: "/*",
    render: () => html`<fr-route-error-not-found></fr-route-error-not-found>`,
    enter: async () => {
      await import("@routes/error/not_found");
      return true;
    }
  }];
}

export function createAuthUserRoutes(): RouteConfig[] {
  return [{
    path: "signin",
    render: () => html`<fr-route-auth-user-signin></fr-route-auth-user-signin>`,
    enter: async () => {
      await import("@routes/auth/user/signin");
      return true;
    }
  }, {
    path: "signup",
    render: () => html`<fr-route-auth-user-signup></fr-route-auth-user-signup>`,
    enter: async () => {
      await import("@routes/auth/user/signup");
      return true;
    }
  }];
}