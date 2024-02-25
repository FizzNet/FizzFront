import {Color} from "@src/util/style/color.ts";
import {AnimationFrame} from "@src/util/animation/animation_frame.ts";

export class Interpolation {
  private static globalAnimationFrame = new AnimationFrame(this.animate.bind(this));
  private static interpolatorRegistry: LinearInterpolator<any>[] = [];

  static {
    this.globalAnimationFrame.request();
  }

  public static animatedLinearNumber(value: number = 0, target: number = value, interpolation = 1): LinearInterpolator<number> {
    return new LinearNumberInterpolator(value, target, interpolation).attach();
  }

  public static animatedLinearColor(value: Color = Color.TRANSPARENT, target: Color = value, interpolation = 1) {
    return new LinearColorInterpolator(value, target, interpolation).attach();
  }

  public static attachInterpolator(interpolator: LinearInterpolator<any>) {
    this.interpolatorRegistry.push(interpolator);
  }

  public static removeInterpolator(interpolator: LinearInterpolator<any>) {
    this.interpolatorRegistry.slice(this.interpolatorRegistry.indexOf(interpolator), 1);
  }

  private static animate(_: number, delta: number) {
    for (const interpolator of this.interpolatorRegistry) {
      interpolator.update(delta);
    }

    this.globalAnimationFrame.request();
  }
}

export abstract class LinearInterpolator<T> {
  public subscriber: (value: T) => void = () => {};

  abstract set target(target: T);
  abstract get target(): T;

  abstract set value(value: T);
  abstract get value(): T;

  abstract update(delta: number): T;

  subscribe(subscriber: (value: T) => void): LinearInterpolator<T> {
    this.subscriber = subscriber;

    return this;
  }

  attach(): LinearInterpolator<T> {
    Interpolation.attachInterpolator(this);
    return this;
  }

  remove(): LinearInterpolator<T> {
    Interpolation.removeInterpolator(this);
    return this;
  }
}

export abstract class LinearInterpolatorTemplate<T> extends LinearInterpolator<T> {
  public target: T;
  private _value: T;
  public interpolation: number;
  public constructor(value: T, target: T, interpolation: number) {
    super();

    this._value = value;
    this.target = target;
    this.interpolation = interpolation;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
    this.subscriber(value);
  }
}

export class LinearNumberInterpolator extends LinearInterpolatorTemplate<number> {
  update(): number {
    return this.value = Math.lerp(this.value, this.target, this.interpolation);
  }
}

export class LinearColorInterpolator extends LinearInterpolatorTemplate<Color> {
  update(): Color {
    return this.value = new Color({
      x: Math.lerp(this.value.x, this.target.x, this.interpolation),
      y: Math.lerp(this.value.y, this.target.y, this.interpolation),
      z: Math.lerp(this.value.z, this.target.z, this.interpolation),
      w: Math.lerp(this.value.w, this.target.w, this.interpolation),
    })
  }
}