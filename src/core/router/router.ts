interface Route {
  match: string,
  children: Route[]
  parent?: Route
}

export class Router {
  public routes: Route[] = [];

  public routeTo(url: string, data: any = {}) {
    const match = this.matchRoute(url);
    if(!match)
      throw new Error(`Failed to match route for url string ${url}`);

    history.pushState(data, "", match.match);
  }

  public makeList(route: Route, reverse: boolean = false) {
    const list: Route[] = [route];

    let current = route;
    while (current.parent) {
      list.push(current.parent);
    }

    if(reverse) return list;
    else return list.reverse();
  }

  /**
   * Find matching route by url in given routes
   * If there's more than one route, most embodied route is chosen
   *
   * This is called recursively by itself and returns when finish the url
   *
   * @param url split array of url or raw string to match in routes
   * @param routes routes to match, defaults to this.routes
   */
  public matchRoute(url: string[] | string, routes: Route[] = this.routes): Route | null {
    // Convert string to array
    if(typeof url == "string")
      url = url.split("/")

    url = url
      .filter(String.prototype.isNotEmpty);

    let [maxMatch, matchRoute]: [number, Route | null] = [0, null];
    for (const route of routes) {
      const matchSplit = route.match
        .split("/")
        .filter(String.prototype.isNotEmpty);

      let i = 0;
      for (i = 0; i < url.length && i < matchSplit.length; i++) {
        if(url[i] != matchSplit[i])
          break;
      }

      // This route does not match to url
      if (i == 0)
        continue;

      if(i > maxMatch)
        [maxMatch, matchRoute] = [i, route];
    }

    if(maxMatch == 0)
      return null;

    if(maxMatch != url.length) {
      // Didn't matched all of url, recurse
      const remainingUrl = url.slice(0, maxMatch);

      return this.matchRoute(remainingUrl, matchRoute!!.children);
    }

    return matchRoute;
  }


}