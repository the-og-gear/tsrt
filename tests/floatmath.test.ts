import { Approxmiate as Approximate } from "../src/floatmath";

describe("Floating point math helpers suite", () => {
  test("Approximate successfully checks 0.1 * 0.2 = 0.02", () => {
    expect(Approximate(0.1 * 0.2, 0.02)).toBeTruthy();
  });
});
