import "./decls.ts";

Math.randomRange = function (min: number, max: number): number {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

Math.lerp = function (a: number, b: number, t: number): number {
  return a + (b - a) * t;
}