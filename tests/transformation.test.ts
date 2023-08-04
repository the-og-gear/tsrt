import { Tuple } from "../src/tuple";
import {
  Rotate_X,
  Rotate_Y,
  Rotate_Z,
  Scale,
  Shear,
  Translation,
} from "../src/transform";
import { Matrix } from "../src/matrix";

describe("Transformation tests", () => {
  describe("Translations", () => {
    test("Multiplying by a translation matrix", () => {
      const transform = Translation(5, -3, 2);
      const p = Tuple.point(-3, 4, 5);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(2, 1, 7))
      ).toBeTruthy();
    });

    test("Multiplying by the inverse of a translation matrix", () => {
      const transform = Translation(5, -3, 2);
      const inv = transform.inverse();
      const p = Tuple.point(-3, 4, 5);
      expect(
        (inv as Matrix).multiplyTuple(p).equalTo(Tuple.point(-8, 7, 3))
      ).toBeTruthy();
    });

    test("Translation does not affect vectors", () => {
      const transform = Translation(5, -3, 2);
      const v = Tuple.vector(-3, 4, 5);
      expect(transform.multiplyTuple(v).equalTo(v)).toBeTruthy();
    });
  });

  describe("Scaling", () => {
    test("Scaling matrix applied to a point", () => {
      const transform = Scale(2, 3, 4);
      const p = Tuple.point(-4, 6, 8);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(-8, 18, 32))
      ).toBeTruthy();
    });

    test("Scaling matrix applied to a vector", () => {
      const transform = Scale(2, 3, 4);
      const v = Tuple.vector(-4, 6, 8);
      expect(
        transform.multiplyTuple(v).equalTo(Tuple.vector(-8, 18, 32))
      ).toBeTruthy();
    });

    test("Scaling by the inverse of a scaling matrix", () => {
      const transform = Scale(2, 3, 4);
      const inv: Matrix = transform.inverse() as Matrix;
      const v = Tuple.vector(-4, 6, 8);
      expect(inv.multiplyTuple(v).equalTo(Tuple.vector(-2, 2, 2))).toBeTruthy();
    });

    test("Reflection is scaling by a negative value", () => {
      const transform = Scale(-1, 1, 1);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(-2, 3, 4))
      ).toBeTruthy();
    });
  });

  describe("Rotations", () => {
    test("Rotating a point around the X axis", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Rotate_X(Math.PI / 4);
      const full_quarter = Rotate_X(Math.PI / 2);
      expect(
        half_quarter
          .multiplyTuple(p)
          .equalTo(Tuple.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2))
      ).toBeTruthy();
      expect(
        full_quarter.multiplyTuple(p).equalTo(Tuple.point(0, 0, 1))
      ).toBeTruthy();
    });

    test("Inverse of an X axis rotation", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Rotate_X(Math.PI / 4);
      const inv = half_quarter.inverse() as Matrix;
      expect(
        inv
          .multiplyTuple(p)
          .equalTo(Tuple.point(0, Math.sqrt(2) / 2, -(Math.sqrt(2) / 2)))
      ).toBeTruthy();
    });

    test("Rotating a point around the Y axis", () => {
      const p = Tuple.point(0, 0, 1);
      const half_quarter = Rotate_Y(Math.PI / 4);
      const full_quarter = Rotate_Y(Math.PI / 2);
      expect(
        half_quarter
          .multiplyTuple(p)
          .equalTo(Tuple.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2))
      ).toBeTruthy();
      expect(
        full_quarter.multiplyTuple(p).equalTo(Tuple.point(1, 0, 0))
      ).toBeTruthy();
    });

    test("Rotating a point around the Z axis", () => {
      const p = Tuple.point(0, 1, 0);
      const half_quarter = Rotate_Z(Math.PI / 4);
      const full_quarter = Rotate_Z(Math.PI / 2);
      expect(
        half_quarter
          .multiplyTuple(p)
          .equalTo(Tuple.point(-(Math.sqrt(2) / 2), Math.sqrt(2) / 2, 0))
      ).toBeTruthy();
      expect(
        full_quarter.multiplyTuple(p).equalTo(Tuple.point(-1, 0, 0))
      ).toBeTruthy();
    });
  });

  describe("Shearing", () => {
    test("A shearing transform moves X in proportion to Y", () => {
      const transform = Shear(1, 0, 0, 0, 0, 0);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(5, 3, 4))
      ).toBeTruthy();
    });

    test("A shearing transform moves X in proportion to Z", () => {
      const transform = Shear(0, 1, 0, 0, 0, 0);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(6, 3, 4))
      ).toBeTruthy();
    });

    test("A shearing transform moves Y in proportion to X", () => {
      const transform = Shear(0, 0, 1, 0, 0, 0);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(2, 5, 4))
      ).toBeTruthy();
    });

    test("A shearing transform moves Y in proportion to Z", () => {
      const transform = Shear(0, 0, 0, 1, 0, 0);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(2, 7, 4))
      ).toBeTruthy();
    });

    test("A shearing transform moves Z in proportion to X", () => {
      const transform = Shear(0, 0, 0, 0, 1, 0);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(2, 3, 6))
      ).toBeTruthy();
    });

    test("A shearing transform moves Z in proportion to Y", () => {
      const transform = Shear(0, 0, 0, 0, 0, 1);
      const p = Tuple.point(2, 3, 4);
      expect(
        transform.multiplyTuple(p).equalTo(Tuple.point(2, 3, 7))
      ).toBeTruthy();
    });
  });

  test("Individual transformations are applied in sequence", () => {
    const p = Tuple.point(1, 0, 1);
    const A = Rotate_X(Math.PI / 2);
    const B = Scale(5, 5, 5);
    const C = Translation(10, 5, 7);
    const p2 = A.multiplyTuple(p);
    expect(p2.equalTo(Tuple.point(1, -1, 0))).toBeTruthy();
    const p3 = B.multiplyTuple(p2);
    expect(p3.equalTo(Tuple.point(5, -5, 0))).toBeTruthy();
    const p4 = C.multiplyTuple(p3);
    expect(p4.equalTo(Tuple.point(15, 0, 7))).toBeTruthy();
  });

  test("Chained transformations are applied in reverse order", () => {
    const p = Tuple.point(1, 0, 1);
    const A = Rotate_X(Math.PI / 2);
    const B = Scale(5, 5, 5);
    const C = Translation(10, 5, 7);
    const T = C.multiply(B.multiply(A)) as Matrix;
    expect(T.multiplyTuple(p).equalTo(Tuple.point(15, 0, 7))).toBeTruthy();
  });
});
