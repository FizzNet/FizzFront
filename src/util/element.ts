export {}

declare global {
  interface Element {
    requireParent<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K];
    requireParent<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K];
    requireParent<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K];
    requireParent<K extends Element = Element>(selectors: string): K;
  }
}

Element.prototype.requireParent = function (selector: string) {
  const element = this.closest(selector);
  if(!element)
    throw Error(`<${this.tagName}> requires ${selector} as parent`);

  return element;
}