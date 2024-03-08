import "./impls.ts";
export {};

declare global {
  interface Math {
    randomRange(min: number, max: number): number;
    lerp(a: number, b: number, t: number): number;
  }
}
