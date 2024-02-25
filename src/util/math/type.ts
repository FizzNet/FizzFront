type Number2 = {
  x: number,
  y: number
}

type Number3 = {
  x: number,
  y: number,
  z: number
}

type Number4 = {
  x: number,
  y: number,
  z: number,
  w: number
}

function isNumber2(value: any): value is Number2 {
  return "x" in value && "y" in value;
}

function isNumber3(value: any): value is Number3 {
  return isNumber2(value) && "z" in value;
}

function isNumber4(value: any): value is Number4 {
  return isNumber3(value) && "w" in value;
}

export {
  isNumber2,
  isNumber3,
  isNumber4
}

export type {
  Number2,
  Number3,
  Number4
}