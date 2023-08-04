import exp from "constants";
import { ITuple, Tuple } from "../src/tuple";

describe("Tuple test suite", () => {
  test("A tuple with w=1.0 is a point", () => {
    const a = new Tuple(4.3, -4.2, 3.1, 1.0);
    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.w).toEqual(1.0);
    expect(a.isPoint()).toBeTruthy();
    expect(a.isVector()).toBeFalsy();
  });

  test("A tuple with w=0.0 is a vector", () => {
    const a = new Tuple(4.3, -4.2, 3.1, 0.0);
    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.w).toEqual(0.0);
    expect(a.isPoint()).toBeFalsy();
    expect(a.isVector()).toBeTruthy();
  });

  test("point() creates tuples with w=1.0", () => {
    const p = Tuple.point(4, -4, 3);
    expect(p.equalTo(new Tuple(4, -4, 3, 1))).toBeTruthy();
  });

  test("vector() creates tuples with w=0", () => {
    const v = Tuple.vector(4, -4, 3);
    expect(v.equalTo(new Tuple(4, -4, 3, 0))).toBeTruthy();
  });
});

describe("Tuple math", () => {
  test("Adding two tuples", () => {
    const tupleA: Tuple = new Tuple(3, -2, 5, 1);
    const tupleB: Tuple = new Tuple(-2, 3, 1, 0);
    const expected: ITuple<number> = new Tuple(1, 1, 6, 1);

    expect(tupleA.add(tupleB).equalTo(expected)).toBeTruthy();
  });

  test("Subtracting two points", () => {
    const point1: Tuple = Tuple.point(3, 2, 1) as Tuple;
    const point2: Tuple = Tuple.point(5, 6, 7) as Tuple;
    const expected = Tuple.vector(-2, -4, -6);

    expect(point1.subtract(point2).equalTo(expected)).toBeTruthy();
  });

  test("Subtracting a vector from a point", () => {
    const point: Tuple = Tuple.point(3, 2, 1) as Tuple;
    const vector: Tuple = Tuple.vector(5, 6, 7) as Tuple;
    const expected = Tuple.point(-2, -4, -6);

    expect(point.subtract(vector).equalTo(expected)).toBeTruthy();
  });

  test("Subtracting two vectors", () => {
    const vector1 = Tuple.vector(3, 2, 1) as Tuple;
    const vector2 = Tuple.vector(5, 6, 7) as Tuple;
    const expected = Tuple.vector(-2, -4, -6);

    expect(vector1.subtract(vector2).equalTo(expected)).toBeTruthy();
  });

  test("Subtracting a vector from the zero vector", () => {
    const zero = Tuple.vector(0, 0, 0) as Tuple;
    const vector = Tuple.vector(1, -2, 3) as Tuple;
    const expected = Tuple.vector(-1, 2, -3);

    expect(zero.subtract(vector).equalTo(expected)).toBeTruthy();
  });

  test("Negate a tuple", () => {
    const tuple = new Tuple(1, -2, 3, -4);
    const expected = new Tuple(-1, 2, -3, 4);

    expect(tuple.negate().equalTo(expected)).toBeTruthy();
  });

  test("Multiply a tuple by a scalar", () => {
    const tuple = new Tuple(1, -2, 3, -4);
    const expected = new Tuple(3.5, -7, 10.5, -14);

    expect(tuple.multiply(3.5).equalTo(expected)).toBeTruthy();
  });

  test("Multiply a tuple by a fraction", () => {
    const tuple = new Tuple(1, -2, 3, -4);
    const expected = new Tuple(0.5, -1, 1.5, -2);

    expect(tuple.multiply(0.5).equalTo(expected)).toBeTruthy();
  });

  test("Divide a tuple by a scalar", () => {
    const tuple = new Tuple(1, -2, 3, -4);
    const expected = new Tuple(0.5, -1, 1.5, -2);

    expect(tuple.divide(2).equalTo(expected)).toBeTruthy();
  });

  test("The dot product of two tuples", () => {
    const tuple1 = Tuple.vector(1, 2, 3) as Tuple;
    const tuple2 = Tuple.vector(2, 3, 4);

    expect(tuple1.dot(tuple2)).toEqual(20);
  });

  test("The cross product of two vectors", () => {
    const vector1 = Tuple.vector(1, 2, 3) as Tuple;
    const vector2 = Tuple.vector(2, 3, 4) as Tuple;

    const expected1 = Tuple.vector(-1, 2, -1);
    const expected2 = Tuple.vector(1, -2, 1);

    expect(vector1.cross(vector2).equalTo(expected1)).toBeTruthy();
    expect(vector2.cross(vector1).equalTo(expected2)).toBeTruthy();
  });
});

describe("Vector math", () => {
  test("Compute the magnitude of vector(1, 0, 0)", () => {
    const vector = Tuple.vector(1, 0, 0) as Tuple;

    expect(vector.magnitude()).toEqual(1);
  });

  test("Compute the magnitude of vector(0, 1, 0)", () => {
    const vector = Tuple.vector(0, 1, 0) as Tuple;

    expect(vector.magnitude()).toEqual(1);
  });

  test("Compute the magnitude of vector(0, 0, 1)", () => {
    const vector = Tuple.vector(0, 0, 1) as Tuple;

    expect(vector.magnitude()).toEqual(1);
  });

  test("Compute the magnitude of vector(1, 2, 3)", () => {
    const vector = Tuple.vector(1, 2, 3) as Tuple;

    expect(vector.magnitude()).toBeCloseTo(Math.sqrt(14));
  });

  test("Compute the magnitude of vector(-1, -2, -3)", () => {
    const vector = Tuple.vector(-1, -2, -3) as Tuple;

    expect(vector.magnitude()).toBeCloseTo(Math.sqrt(14));
  });

  test("Normalizing vector(4,0,0) gives (1,0,0)", () => {
    const vector = Tuple.vector(4, 0, 0) as Tuple;
    const expected = Tuple.vector(1, 0, 0);

    expect(vector.normalize().equalTo(expected)).toBeTruthy();
  });

  test("Normalizing vector(1, 2, 3)", () => {
    const vector = Tuple.vector(1, 2, 3) as Tuple;
    const expected = Tuple.vector(
      1 / Math.sqrt(14),
      2 / Math.sqrt(14),
      3 / Math.sqrt(14)
    );

    expect(vector.normalize().equalTo(expected)).toBeTruthy();
  });

  test("The magnitude of a normalized vector", () => {
    const vector = Tuple.vector(1, 2, 3) as Tuple;
    expect(vector.normalize().magnitude()).toEqual(1);
  });
});
