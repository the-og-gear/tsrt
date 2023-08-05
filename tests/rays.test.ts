import { Tuple } from "../src/tuple";
import { Ray } from "../src/ray";

describe("Ray features", () => {
  test("Create and query a ray", () => {
    const origin = Tuple.point(1, 2, 3);
    const direction = Tuple.vector(4, 5, 6);
    const r = new Ray(origin, direction);
    expect(r.origin.equalTo(origin)).toBeTruthy();
    expect(r.direction.equalTo(direction)).toBeTruthy();
  });

  test("Compute a point from a distance", () => {
    const r = new Ray(Tuple.point(2, 3, 4), Tuple.vector(1, 0, 0));
    expect(r.position(0).equalTo(Tuple.point(2, 3, 4))).toBeTruthy();
    expect(r.position(1).equalTo(Tuple.point(3, 3, 4))).toBeTruthy();
    expect(r.position(-1).equalTo(Tuple.point(1, 3, 4))).toBeTruthy();
    expect(r.position(2.5).equalTo(Tuple.point(4.5, 3, 4))).toBeTruthy();
  });
});
