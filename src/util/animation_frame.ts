type Callback = (time: number, delta: number) => void;

export class AnimationFrame {
  public func: Callback;
  public frameId: number = 0;

  private lastAnimate?: number = undefined;

  constructor(func: Callback) {
    this.func = func;
  }

  public request() {
    this.frameId = requestAnimationFrame((time: number) => {
      const lastAnimate = this.lastAnimate ?? time;
      this.lastAnimate = time;
      this.func(time, time - lastAnimate);
    });
  }

  public cancel() {
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  public active(): boolean {
    return this.frameId != 0;
  }
}