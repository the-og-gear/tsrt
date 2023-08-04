import { Matrix } from "./matrix";

export function Translation(x: number, y: number, z: number): Matrix {
  return new Matrix(4, 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
}

export function Scale(x: number, y: number, z: number): Matrix {
  return new Matrix(4, x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
}

export function Rotate_X(r: number): Matrix {
  return new Matrix(
    4,
    1,
    0,
    0,
    0,
    0,
    Math.cos(r),
    -Math.sin(r),
    0,
    0,
    Math.sin(r),
    Math.cos(r),
    0,
    0,
    0,
    0,
    1
  );
}

export function Rotate_Y(r: number): Matrix {
  return new Matrix(
    4,
    Math.cos(r),
    0,
    Math.sin(r),
    0,
    0,
    1,
    0,
    0,
    -Math.sin(r),
    0,
    Math.cos(r),
    0,
    0,
    0,
    0,
    1
  );
}

export function Rotate_Z(r: number): Matrix {
  return new Matrix(
    4,
    Math.cos(r),
    -Math.sin(r),
    0,
    0,
    Math.sin(r),
    Math.cos(r),
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  );
}

export function Shear(
  xy: number,
  xz: number,
  yx: number,
  yz: number,
  zx: number,
  zy: number
): Matrix {
  return new Matrix(4, 1, xy, xz, 0, yx, 1, yz, 0, zx, zy, 1, 0, 0, 0, 0, 1);
}
