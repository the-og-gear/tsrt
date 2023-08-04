import { Approxmiate } from "./floatmath";

/**
 * The ITuple interface is a generic interface that can store
 * any data type as values. All iterations of Tuple and Color
 * should implement this.
 */
interface ITuple<T> {
  values: T[];

  // An ITuple<T> can only check equality against ITuples of
  // the same generic type
  equalTo(expression: ITuple<T>): boolean;

  add(expression: ITuple<T>): ITuple<T>;
  subtract(expression: ITuple<T>): ITuple<T>;
  multiply(expression: number): ITuple<T>;
  divide(expression: number): ITuple<T>;
}

class Tuple implements ITuple<number> {
  values: number[];

  get x(): number {
    return this.values[0];
  }
  set x(value: number) {
    this.values[0] = value;
  }

  get y(): number {
    return this.values[1];
  }
  set y(value: number) {
    this.values[1] = value;
  }

  get z(): number {
    return this.values[2];
  }
  set z(value: number) {
    this.values[2] = value;
  }

  get w(): number {
    return this.values[3];
  }
  set w(value: number) {
    this.values[3] = value;
  }

  constructor(x: number, y: number, z: number, w: number) {
    this.values = [x, y, z, w];
  }

  equalTo(expression: ITuple<number>): boolean {
    // Technically a Tuple should only contain 4 values,
    // but this ensures we don't break that.
    for (let i = 0; i < this.values.length; ++i) {
      if (!Approxmiate(this.values[i], expression.values[i])) {
        return false;
      }
    }
    return true;
  }

  isPoint(): boolean {
    return this.w == 1;
  }

  isVector(): boolean {
    return this.w == 0;
  }

  static point(x: number, y: number, z: number): ITuple<number> {
    return new this(x, y, z, 1.0);
  }

  static vector(x: number, y: number, z: number): ITuple<number> {
    return new this(x, y, z, 0.0);
  }

  add(expression: ITuple<number>): ITuple<number> {
    const b: Tuple = expression as Tuple;
    return new Tuple(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
  }

  subtract(expression: ITuple<number>): ITuple<number> {
    const b: Tuple = expression as Tuple;
    return new Tuple(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
  }

  negate(): ITuple<number> {
    return new Tuple(-this.x, -this.y, -this.z, -this.w);
  }

  multiply(expression: number): ITuple<number> {
    return new Tuple(
      this.x * expression,
      this.y * expression,
      this.z * expression,
      this.w * expression
    );
  }

  divide(expression: number): ITuple<number> {
    return this.multiply(1 / expression);
  }

  magnitude() {
    return Math.sqrt(
      Math.pow(this.x, 2) +
        Math.pow(this.y, 2) +
        Math.pow(this.z, 2) +
        Math.pow(this.w, 2)
    );
  }

  normalize() {
    const myMagnitude = this.magnitude();
    return new Tuple(
      this.x / myMagnitude,
      this.y / myMagnitude,
      this.z / myMagnitude,
      this.w / myMagnitude
    );
  }

  dot(expression: ITuple<number>): number {
    // This line lets us alias an ITuple where needed, so we can actually dot product a color with a tuple.
    // If we implement ITuple as a number, we implement everything we need here anyways.
    const b: Tuple = expression as Tuple;
    return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
  }

  cross(expression: ITuple<number>): ITuple<number> {
    const b: Tuple = expression as Tuple;
    if (!b.isVector()) return new Tuple(0, 0, 0, 0);
    return Tuple.vector(
      this.y * b.z - this.z * b.y,
      this.z * b.x - this.x * b.z,
      this.x * b.y - this.y * b.x
    );
  }
}

export { ITuple, Tuple };
