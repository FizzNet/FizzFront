import {Number3, Number4} from "@src/util/math/type.ts";

export class Color {
  static readonly WHITE = Color.rgb(1, 1, 1);
  static readonly BLACK = Color.rgb(0, 0, 0);
  static readonly TRANSPARENT = Color.rgba(0, 0, 0, 0);

  public value: Number4;

  public constructor(value: Number4 | Number3, alpha: number | undefined = undefined) {
    if("w" in value) {
      this.value = value;
    } else {
      this.value = {
        x: value.x,
        y: value.y,
        z: value.z,
        w: alpha ?? 1
      }
    }
  }

  public static is(value: any): value is Color {
    return value instanceof Color;
  }

  public static rgba(r: number, g: number, b: number, alpha: number = 1) {
    return new Color({
      x: r,
      y: g,
      z: b,
      w: alpha
    })
  }

  public static rgb(r: number, g: number, b: number) {
    return this.rgba(r, g, b, 1)
  }

  public get x() { return this.value.x };
  public get y() { return this.value.y };
  public get z() { return this.value.z };
  public get w() { return this.value.w };
  public set x(value: number) { this.value.x = value };
  public set y(value: number) { this.value.y = value };
  public set z(value: number) { this.value.z = value };
  public set w(value: number) { this.value.w = value };

  public get r() { return this.value.x };
  public get g() { return this.value.y };
  public get b() { return this.value.z };
  public get a() { return this.value.w };
  public set r(value: number) { this.value.x = value };
  public set g(value: number) { this.value.y = value };
  public set b(value: number) { this.value.z = value };
  public set a(value: number) { this.value.w = value };
}