export namespace Draw {
  export class Wave {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D | null = null;

    private _renderWidth: number = 0;
    private _renderHeight: number = 0;
    private _halfWidth: number = 0;
    private _halfHeight: number = 0;

    private _points: WavePoint[] = [];

    private _time = 0;

    private _numberOfPoints = 0;
    private _currentPointInterval = 0;

    private animationRequestId = 0;

    public speed = 0.1;
    public multiplier = 100;
    public targetPointInterval = 100;

    public constructor(canvas: HTMLCanvasElement) {
      this._canvas = canvas; // Keep this to internal field, not public setter

      this.initialize();
      this.elementUpdated();
    }

    private initialize() {

    }

    public start() {
      this.animationRequestId = requestAnimationFrame(this.draw.bind(this));
    }

    public stop() {
      cancelAnimationFrame(this.animationRequestId);
    }

    private elementUpdated() {
      this._context = this._canvas.getContext("2d")!!;

      this.viewResized();
    }

    private viewResized() {
      this._renderWidth = this._canvas.width;
      this._renderHeight = this._canvas.height;
      this._halfWidth = this._renderWidth / 2;
      this._halfHeight = this._renderHeight / 2;

      this._numberOfPoints = Math.floor(this._renderWidth / this.targetPointInterval) + 1;
      this._currentPointInterval = this._renderWidth / (this._numberOfPoints - 2);
    }

    private tick() {
      this._time += this.speed;

      for (const point of this._points) {
        point.update(this._time);
      }
    }

    private draw() {
      const context = this._context;
      if(!context) return;

      this.tick();

      // Clear canvas before drawing the wave
      context.clearRect(0, 0, this._renderWidth, this._renderHeight);

      context.strokeStyle = "cyan"
      context.strokeRect(0, 0, this._renderWidth, this._renderHeight);

      context.beginPath();
      {
        // Move to first, start point
        context.moveTo(0, this._halfHeight);

        let currentX = 0;
        for (let i = 0; i < this._numberOfPoints; i++) {
          context.fillStyle = "cyan";
          context.fillRect(currentX - 10, this._halfHeight - 10, 20, 20);

          currentX += this._currentPointInterval;
        }

        context.fillStyle = "#ff00000";
        context.fill();
      }
      context.closePath();

      requestAnimationFrame(this.draw.bind(this));
    }

    public get canvas() { return this._canvas; };
    public set canvas(element: HTMLCanvasElement) {
      this._canvas = element;
      this.elementUpdated();
    };
  }

  class WavePoint {
    public initial: number;
    public multiplier: number;
    public offset: number;

    public value: number;

    public noUpdate: boolean;

    constructor(initial: number, multiplier: number, offset: number, noUpdate: boolean = false) {
      this.initial = initial;
      this.multiplier = multiplier;
      this.offset = offset;
      this.value = this.offset;
      this.noUpdate = noUpdate;
    }

    update(time: number) {
      if(this.noUpdate) return;
      this.value = this.offset + Math.sin(time + this.initial) * this.multiplier;
    }
  }
}