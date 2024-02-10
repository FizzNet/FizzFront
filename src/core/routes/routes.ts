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
    }
  ];
}

export async function initializeRouter(element: HTMLElement): Promise<void> {
  if(isRouterInitialized) return;

  console.log("[Routing] Initializing router for first time");
  console.log(`[Routing] Using element: ${element}`);

  _router = new Router(element);
  await _router.setRoutes(createRoutes());

  console.log(`[Routing] Routes: ${_router.getRoutes().length}`);

  console.log("[Routing] Initialized!");
  isRouterInitialized = true;
}

export function router() {
  return _router;
}