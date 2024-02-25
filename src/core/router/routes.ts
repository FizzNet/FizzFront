import {Route, Router} from "@vaadin/router";

let isRouterInitialized = false;
let _router: Router;

export function createRoutes(): Route[] {
  return [
    {
      path: "/",
      component: "fr-route-index",
      action: async () => {
        await import("@src/components/routes/index");
      }
    },
    {
      path: "/app",
      component: "fr-route-app",
      action: async () => {
        await import("@src/components/routes/app/index")
      },
      children: [{
        path: "/",
        redirect: "/app/direct"
      },{
        path: "/direct",
        component: "fr-route-app-direct",
        action: async () => {
          await import("@src/components/routes/app/direct")
        }
      }]
    },
    {
      path: "/auth",
      children: [{
        path: "/user",
        component: "fr-route-auth-user",
        action: async () => {
          await import("@src/components/routes/auth/user/index")
        },
        children: [{
          path: "signin",
          component: "fr-route-auth-user-signin",
          action: async () => {
            await import("@src/components/routes/auth/user/signin")
          }
        }, {
          path: "signup",
          component: "fr-route-auth-user-signup",
          action: async () => {
            await import("@src/components/routes/auth/user/signup")
          }
        }],
      }]
    },
    {
      path: "/test",
      component: "fr-route-test",
      action: async () => {
        await import("@src/components/routes/test")
      }
    },
    {
      path: "(.*)",
      component: "fr-route-common-not-found",
      action: async () => {
        await import("@routes/error/not_found")
      }
    }
  ];
}

export async function initializeRouter(element: HTMLElement): Promise<void> {
  if(isRouterInitialized) return;

  console.log("[Routing] Initializing router for first time");
  console.log(`[Routing] Using element: ${element}`);

  _router = new Router(element);
  await _router.setRoutes(createRoutes());

  // This does not work:
  //
  // _router.getRoutes().forEach((value) => {
  //   value.action = (context, commands) => {
  //     console.log(`[Routing] Entering: ${context.pathname}`)
  //
  //     if(value.action) {
  //       value.action(context, commands);
  //     }
  //   }
  // })

  console.log(`[Routing] Routes: ${_router.getRoutes().length}`);

  console.log("[Routing] Initialized!");
  isRouterInitialized = true;
}

export function router() {
  return _router;
}