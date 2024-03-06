export {};

declare global {
  interface Array<T> {
    maxBy(func: (value: T, index: number) => number): T;
    minBy(func: (value: T, index: number) => number): T;
  }
}

Array.prototype.maxBy = function<T>(func: (value: T, index: number) => number): T {
  let [max, value]: [number, T | null] = [Number.NEGATIVE_INFINITY, null];
  for (let i = 0; i < this.length; i++) {
    if(this[i] > max) {
      max = func(this[i], i);
      value = this[i];
    }
  }

  return value!!;
}

Array.prototype.minBy = function<T>(func: (value: T, index: number) => number): T {
  let [min, value]: [number, T | null] = [Number.POSITIVE_INFINITY, null];
  for (let i = 0; i < this.length; i++) {
    if(this[i] < min) {
      min = func(this[i], i);
      value = this[i];
    }
  }

  return value!!;
}