import { Approxmiate } from "./floatmath";
import { ITuple, Tuple } from "./tuple";

export abstract class AMatrix<T> {
  #values: T[][];
  #size: number[];

  get size() {
    return this.#size;
  }
  get width() {
    return this.#size[0];
  }
  get height() {
    return this.#size[1];
  }

  constructor(sizeX: number, sizeY: number, ...values: T[]) {
    this.#size = [sizeX, sizeY];
    this.#values = new Array<Array<T>>(sizeX);
    for (let row = 0; row < sizeX; ++row) {
      this.#values[row] = new Array<T>(sizeY);
      for (let col = 0; col < sizeY; ++col) {
        this.#values[row][col] = values[col + row * sizeX];
      }
    }
  }

  at(x: number, y: number): T {
    return this.#values[x][y];
  }

  abstract equalTo(expression: AMatrix<T>): boolean;
}

// Type predicate function
function isMatrix(
  expression: AMatrix<number> | ITuple<number>
): expression is AMatrix<number> {
  return (expression as AMatrix<number>).width !== undefined;
}

export class Matrix extends AMatrix<number> {
  // A number matrix can only be square. I'm lazy as fuck, bro
  constructor(size: number, ...values: number[]) {
    super(size, size, ...values);
  }

  equalTo(expression: AMatrix<number>): boolean {
    for (let row = 0; row < this.size[0]; ++row) {
      for (let col = 0; col < this.size[1]; ++col) {
        if (!Approxmiate(this.at(row, col), expression.at(row, col)))
          return false;
      }
    }
    return true;
  }

  multiply(expression: AMatrix<number>): AMatrix<number> {
    let newMatrixValues: number[] = [];
    for (let row = 0; row < 4; ++row) {
      for (let col = 0; col < 4; ++col) {
        let currentSum = 0;
        for (let iter = 0; iter < 4; ++iter) {
          currentSum += this.at(row, iter) * expression.at(iter, col);
        }
        newMatrixValues.push(currentSum);
      }
    }
    return new Matrix(this.size[0], ...newMatrixValues);
  }

  multiplyTuple(expression: ITuple<number>): ITuple<number> {
    let resultTuple = new Tuple(0, 0, 0, 0);
    for (let row = 0; row < this.size[0]; ++row) {
      let currentTuple = new Tuple(0, 0, 0, 0);
      for (let col = 0; col < this.size[1]; ++col) {
        currentTuple.values[col] = this.at(row, col);
      }
      resultTuple.values[row] = (expression as Tuple).dot(currentTuple);
    }
    return resultTuple;
  }

  transpose(): AMatrix<number> {
    let newValues: number[] = [];
    for (let col = 0; col < this.size[1]; ++col) {
      for (let row = 0; row < this.size[0]; ++row) {
        newValues.push(this.at(row, col));
      }
    }
    return new Matrix(this.size[0], ...newValues);
  }

  determinant(): number {
    if (this.size[0] == 2)
      return this.at(0, 0) * this.at(1, 1) - this.at(0, 1) * this.at(1, 0);

    let result = 0;
    for (let col = 0; col < this.size[0]; ++col) {
      result += this.at(0, col) * this.cofactor(0, col);
    }
    return result;
  }

  submatrix(x: number, y: number): AMatrix<number> {
    let newValues: number[] = [];
    for (let row = 0; row < this.size[0]; ++row) {
      if (row == x) continue;
      for (let col = 0; col < this.size[0]; ++col) {
        if (col == y) continue;
        newValues.push(this.at(row, col));
      }
    }
    return new Matrix(this.size[0] - 1, ...newValues);
  }

  minor(x: number, y: number): number {
    return (this.submatrix(x, y) as Matrix).determinant();
  }

  cofactor(x: number, y: number): number {
    const minor = this.minor(x, y);
    if ((x + y) % 2 == 1) return -minor;
    return minor;
  }

  isInvertible(): boolean {
    return this.determinant() != 0;
  }

  inverse(): AMatrix<number> {
    if (!this.isInvertible()) throw new Error("Fuck.");

    const myDeterminant = this.determinant();
    let newValues: number[] = new Array<number>(this.size[0] * this.size[1]);
    for (let row = 0; row < this.size[0]; ++row) {
      for (let col = 0; col < this.size[0]; ++col) {
        const c = this.cofactor(row, col);
        newValues[row + col * this.size[0]] = c / myDeterminant;
      }
    }
    return new Matrix(4, ...newValues);
  }

  static identity(): AMatrix<number> {
    return new Matrix(4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}
