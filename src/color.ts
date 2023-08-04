import exp from "constants";
import { Approxmiate } from "./floatmath";
import { ITuple } from "./tuple";

class Color implements ITuple<number> {
  values: number[];

  get r() {
    return this.values[0];
  }
  set r(value: number) {
    this.values[0] = value;
  }

  get g() {
    return this.values[1];
  }
  set g(value: number) {
    this.values[1] = value;
  }

  get b() {
    return this.values[2];
  }
  set b(value: number) {
    this.values[2] = value;
  }

  get a() {
    return this.values[3];
  }
  set a(value: number) {
    this.values[3] = value;
  }

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.values = [r, g, b, a];
  }

  equalTo(expression: ITuple<number>): boolean {
    for (let element = 0; element < this.values.length; ++element) {
      if (!Approxmiate(this.values[element], expression.values[element]))
        return false;
    }
    return true;
  }

  add(expression: ITuple<number>): ITuple<number> {
    const b: Color = expression as Color;
    return new Color(this.r + b.r, this.g + b.g, this.b + b.b, this.a + b.a);
  }

  subtract(expression: ITuple<number>): ITuple<number> {
    const b: Color = expression as Color;
    return new Color(this.r - b.r, this.g - b.g, this.b - b.b, this.a - b.a);
  }

  multiply(expression: number): ITuple<number> {
    return new Color(
      this.r * expression,
      this.g * expression,
      this.b * expression,
      this.a * expression
    );
  }

  color_multiply(expression: ITuple<number>): ITuple<number> {
    const b: Color = expression as Color;
    return new Color(this.r * b.r, this.g * b.g, this.b * b.b, this.a * b.a);
  }

  divide(expression: number): ITuple<number> {
    throw new Error("Why are you dividing a color tbh?");
  }
}

export { Color };
