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
          await import("@src/components/routes/app/direct.ts")
        }
      }]
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