import {Number2} from "@src/util/math/type.ts";

export namespace Draw {
  type OriginFunction = (element: HTMLElement) => Number2;
  type UpdateFunction = (position: Number2) => void;

  export class InterpolatedRectCursorProvider {
    public interpolation = 0.1;

    public update: UpdateFunction = () => {};
    public calculateOrigin: OriginFunction = () => {
      return { x: 0, y: 0 }
    };

    public minimumDiffToUpdate = 1;

    private _origin!: [number, number];
    private _offset: [number, number] = [0, 0];
    private _targetOffset: [number, number] = this._origin;

    private _element!: HTMLElement;

    private _boundMouseMoveListener = this.handleMouseMove.bind(this);
    private _boundMouseLeaveListener = this.handleMouseLeave.bind(this);

    private _requestedFrameId = 0;

    public constructor(update: UpdateFunction, calculateOrigin: OriginFunction, interpolation: number) {
      this.update = update;
      this.calculateOrigin = calculateOrigin;
      this.interpolation = interpolation;
    }

    public create(element: HTMLElement) {
      this._element = element;

      this._element.addEventListener("mousemove", this._boundMouseMoveListener);
      this._element.addEventListener("mouseleave", this._boundMouseLeaveListener);

      this.initializeOrigin();

      this._requestedFrameId = requestAnimationFrame(this.animateOffset.bind(this));
    }

    public destroy() {
      this._element.removeEventListener("mousemove", this._boundMouseMoveListener);
      this._element.removeEventListener("mouseleave", this._boundMouseLeaveListener);

      cancelAnimationFrame(this._requestedFrameId);
    }

    private initializeOrigin() {
      const origin  = this.calculateOrigin(this._element);
      this._origin = [origin.x, origin.y];
      this._offset = this._origin;
      this._targetOffset = this._origin;
    }

    private animateOffset() {
      const x = Math.lerp(this._offset[0], this._targetOffset[0], this.interpolation);
      const y = Math.lerp(this._offset[1], this._targetOffset[1], this.interpolation);

      this.updateAuto([x, y])
      this._requestedFrameId = requestAnimationFrame(this.animateOffset.bind(this));
    }

    private updateAuto(newOffset: [number, number]) {
      const [diffX, diffY] = this.calculateDiff(this._offset, newOffset);

      this._offset = newOffset;

      if(diffX > this.minimumDiffToUpdate || diffY > this.minimumDiffToUpdate) {
        // Update
        this.callUpdate();
      }
    }

    private calculateDiff(p1: [number, number], p2: [number, number]) {
      const diffX = Math.abs(p1[0] - p2[0]);
      const diffY = Math.abs(p1[1] - p2[1]);

      return [diffX, diffY];
    }

    private handleMouseMove(e: MouseEvent) {
      const rect = this._element.getBoundingClientRect();

      this._targetOffset = [e.clientX - rect.left, e.clientY - rect.top];
    }

    private handleMouseLeave() {
      this._targetOffset = this._origin;
    }

    private callUpdate() {
      this.update({
        x: this._offset[0],
        y: this._offset[1]
      })
    }
  }
}