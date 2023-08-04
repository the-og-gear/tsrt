import { AMatrix, Matrix } from "../src/matrix";
import { Tuple } from "../src/tuple";

describe("Basic matrix functionality", () => {
  describe("Creation and inspection", () => {
    test("Create and inspect a 4x4 matrix", () => {
      const m = new Matrix(
        4,
        1,
        2,
        3,
        4,
        5.5,
        6.5,
        7.5,
        8.5,
        9,
        10,
        11,
        12,
        13.5,
        14.5,
        15.5,
        16.5
      );

      expect(m.at(0, 0)).toEqual(1);
      expect(m.at(0, 3)).toEqual(4);
      expect(m.at(1, 0)).toEqual(5.5);
      expect(m.at(1, 2)).toEqual(7.5);
      expect(m.at(2, 2)).toEqual(11);
      expect(m.at(3, 0)).toEqual(13.5);
      expect(m.at(3, 2)).toEqual(15.5);
    });

    test("Create and inspect a 3x3 matrix", () => {
      const m = new Matrix(3, -3, 5, 0, 1, -2, -7, 0, 1, 1);

      expect(m.at(0, 0)).toEqual(-3);
      expect(m.at(1, 1)).toEqual(-2);
      expect(m.at(2, 2)).toEqual(1);
    });

    test("Create and inspect a 2x2 matrix", () => {
      const m = new Matrix(2, -3, 5, 1, -2);

      expect(m.at(0, 0)).toEqual(-3);
      expect(m.at(0, 1)).toEqual(5);
      expect(m.at(1, 0)).toEqual(1);
      expect(m.at(1, 1)).toEqual(-2);
    });
  });

  describe("Equality", () => {
    test("Equals", () => {
      const matrixA = new Matrix(
        4,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2
      );
      const matrixB = new Matrix(
        4,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2
      );

      expect(matrixA.equalTo(matrixB)).toBeTruthy();
    });

    test("Inequality", () => {
      const matrixA = new Matrix(
        4,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2
      );
      const matrixB = new Matrix(
        4,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      );

      expect(matrixA.equalTo(matrixB)).toBeFalsy();
    });
  });

  describe("Math", () => {
    test("Multiply two matrices", () => {
      const matrixA = new Matrix(
        4,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2
      );
      const matrixB = new Matrix(
        4,
        -2,
        1,
        2,
        3,
        3,
        2,
        1,
        -1,
        4,
        3,
        6,
        5,
        1,
        2,
        7,
        8
      );
      const expected = new Matrix(
        4,
        20,
        22,
        50,
        48,
        44,
        54,
        114,
        108,
        40,
        58,
        110,
        102,
        16,
        26,
        46,
        42
      );

      expect(
        (matrixA.multiply(matrixB) as AMatrix<number>).equalTo(expected)
      ).toBeTruthy();
    });

    test("Multiply a matrix and a tuple", () => {
      const matrix = new Matrix(
        4,
        1,
        2,
        3,
        4,
        2,
        4,
        4,
        2,
        8,
        6,
        4,
        1,
        0,
        0,
        0,
        1
      );
      const tuple = new Tuple(1, 2, 3, 1);
      const expected = new Tuple(18, 24, 33, 1);

      expect(matrix.multiplyTuple(tuple).equalTo(expected)).toBeTruthy();
    });

    test("Multiply by the identity matrix", () => {
      const matrix = new Matrix(
        4,
        0,
        1,
        2,
        3,
        4,
        1,
        2,
        4,
        8,
        2,
        4,
        8,
        16,
        4,
        8,
        16,
        32
      );
      const identity = Matrix.identity();
      expect(matrix.multiply(identity).equalTo(matrix)).toBeTruthy();
    });

    test("Transposing a matrix", () => {
      const matrix = new Matrix(
        4,
        0,
        9,
        3,
        0,
        9,
        8,
        0,
        8,
        1,
        8,
        5,
        3,
        0,
        0,
        5,
        8
      );
      const expected = new Matrix(
        4,
        0,
        9,
        1,
        0,
        9,
        8,
        8,
        0,
        3,
        0,
        5,
        5,
        0,
        8,
        3,
        8
      );
      expect(matrix.transpose().equalTo(expected)).toBeTruthy();
    });

    test("Transposing the identity matrix", () => {
      expect(
        (Matrix.identity() as Matrix).transpose().equalTo(Matrix.identity())
      ).toBeTruthy();
    });
  });

  describe("Inverse related functions", () => {
    test("Calculate the determinant of a 2x2 matrix", () => {
      const matrix = new Matrix(2, 1, 5, -3, 2);
      expect(matrix.determinant()).toEqual(17);
    });

    test("Calculate the determinant of a 3x3 matrix", () => {
      const matrix = new Matrix(3, 1, 2, 6, -5, 8, -4, 2, 6, 4);
      expect(matrix.cofactor(0, 0)).toEqual(56);
      expect(matrix.cofactor(0, 1)).toEqual(12);
      expect(matrix.cofactor(0, 2)).toEqual(-46);
      expect(matrix.determinant()).toEqual(-196);
    });

    test("Calculate the determinant of a 4x4 matrix", () => {
      const matrix = new Matrix(
        4,
        -2,
        -8,
        3,
        5,
        -3,
        1,
        7,
        3,
        1,
        2,
        -9,
        6,
        -6,
        7,
        7,
        -9
      );
      expect(matrix.cofactor(0, 0)).toEqual(690);
      expect(matrix.cofactor(0, 1)).toEqual(447);
      expect(matrix.cofactor(0, 2)).toEqual(210);
      expect(matrix.cofactor(0, 3)).toEqual(51);
      expect(matrix.determinant()).toEqual(-4071);
    });

    test("A submatrix of a 3x3 matrix is a 2x2 matrix", () => {
      const input = new Matrix(3, 1, 5, 0, -3, 2, 7, 0, 6, -3);
      const expected = new Matrix(2, -3, 2, 0, 6);

      expect(input.submatrix(0, 2).equalTo(expected)).toBeTruthy();
    });

    test("A submatrix of a 4x4 matrix is a 3x3 matrix", () => {
      const input = new Matrix(
        4,
        -6,
        1,
        1,
        6,
        -8,
        5,
        8,
        6,
        -1,
        0,
        8,
        2,
        -7,
        1,
        -1,
        1
      );
      const expected = new Matrix(3, -6, 1, 6, -8, 8, 6, -7, -1, 1);

      expect(input.submatrix(2, 1).equalTo(expected)).toBeTruthy();
    });

    test("Calculate a minor of a 3x3 matrix", () => {
      const matrixA = new Matrix(3, 3, 5, 0, 2, -1, -7, 6, -1, 5);
      const matrixB = matrixA.submatrix(1, 0);
      expect((matrixB as Matrix).determinant()).toEqual(25);
      expect(matrixA.minor(1, 0)).toEqual(25);
    });

    test("Calculate the cofactor of a 3x3 matrix", () => {
      const matrixA = new Matrix(3, 4, 5, 0, 2, -1, -7, 6, -1, 5);
      expect(matrixA.minor(0, 0)).toEqual(-12);
      expect(matrixA.cofactor(0, 0)).toEqual(-12);
      expect(matrixA.minor(1, 0)).toEqual(25);
      expect(matrixA.cofactor(1, 0)).toEqual(-25);
    });

    test("Check if invertible matrix is invertible", () => {
      const matrix = new Matrix(
        4,
        6,
        4,
        4,
        4,
        5,
        5,
        7,
        6,
        4,
        -9,
        3,
        -7,
        9,
        1,
        7,
        -6
      );
      expect(matrix.determinant()).toEqual(-2120);
      expect(matrix.isInvertible()).toBeTruthy();
    });

    test("Check if noninvertible matrix is invertible", () => {
      const matrix = new Matrix(
        4,
        -4,
        2,
        -2,
        -3,
        9,
        6,
        2,
        6,
        0,
        -5,
        1,
        -5,
        0,
        0,
        0,
        0
      );
      expect(matrix.determinant()).toEqual(0);
      expect(matrix.isInvertible()).toBeFalsy();
    });

    test("Calculate the inverse of a matrix", () => {
      const matrixA = new Matrix(
        4,
        -5,
        2,
        6,
        -8,
        1,
        -5,
        1,
        8,
        7,
        7,
        -6,
        -7,
        1,
        -3,
        7,
        4
      );
      const matrixB = matrixA.inverse();
      const expected = new Matrix(
        4,
        0.21805,
        0.45113,
        0.2406,
        -0.04511,
        -0.80827,
        -1.45677,
        -0.44361,
        0.52068,
        -0.07895,
        -0.22368,
        -0.05263,
        0.19737,
        -0.52256,
        -0.81391,
        -0.30075,
        0.30639
      );

      expect(matrixA.determinant()).toEqual(532);
      expect(matrixA.cofactor(2, 3)).toEqual(-160);
      expect(matrixB.at(3, 2)).toBeCloseTo(-160 / 532);
      expect(matrixA.cofactor(3, 2)).toEqual(105);
      expect(matrixB.at(2, 3)).toBeCloseTo(105 / 532);
      expect(matrixB.equalTo(expected)).toBeTruthy();
    });

    test("Calculate the inverse of another matrix", () => {
      const matrix = new Matrix(
        4,
        8,
        -5,
        9,
        2,
        7,
        5,
        6,
        1,
        -6,
        0,
        9,
        6,
        -3,
        0,
        -9,
        -4
      );
      const expected = new Matrix(
        4,
        -0.15385,
        -0.15385,
        -0.28205,
        -0.53846,
        -0.07692,
        0.12308,
        0.02564,
        0.03077,
        0.35897,
        0.35897,
        0.4359,
        0.92308,
        -0.69231,
        -0.69231,
        -0.76923,
        -1.92308
      );
      expect(matrix.inverse().equalTo(expected)).toBeTruthy();
    });

    test("Multiply a product by its inverse", () => {
      const matrixA = new Matrix(
        4,
        3,
        -9,
        7,
        3,
        3,
        -8,
        2,
        -9,
        -4,
        4,
        4,
        1,
        -6,
        5,
        -1,
        1
      );
      const matrixB = new Matrix(
        4,
        8,
        2,
        2,
        2,
        3,
        -1,
        7,
        0,
        7,
        0,
        5,
        4,
        6,
        -2,
        0,
        5
      );
      const result = matrixA.multiply(matrixB);
      expect(
        (result as Matrix).multiply(matrixB.inverse()).equalTo(matrixA)
      ).toBeTruthy();
    });
  });
});
