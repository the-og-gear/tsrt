import { Color } from "../src/color";

describe("Color test suite", () => {
  test("Colors are (r, g, b) tuples", () => {
    const color = new Color(-0.5, 0.4, 1.7);
    expect(color.r).toEqual(-0.5);
    expect(color.g).toEqual(0.4);
    expect(color.b).toEqual(1.7);
  });
});

describe("Color math", () => {
  describe("Addition and subtraction", () => {
    const color1 = new Color(0.9, 0.6, 0.75);
    const color2 = new Color(0.7, 0.1, 0.25);

    test("Adding colors", () => {
      const expected = new Color(1.6, 0.7, 1.0, 2);

      expect(color1.add(color2).equalTo(expected)).toBeTruthy();
    });

    test("Subtracting colors", () => {
      const expected = new Color(0.2, 0.5, 0.5, 0);

      expect(color1.subtract(color2).equalTo(expected)).toBeTruthy();
    });
  });

  describe("Multiplication", () => {
    test("Multiplying a color by a scalar", () => {
      const c = new Color(0.2, 0.3, 0.4);
      const expected = new Color(0.4, 0.6, 0.8, 2);

      expect(c.multiply(2).equalTo(expected)).toBeTruthy();
    });

    test("Multiplying a color by a color", () => {
      const color1 = new Color(1, 0.2, 0.4);
      const color2 = new Color(0.9, 1, 0.1);
      const expected = new Color(0.9, 0.2, 0.04);

      expect(color1.color_multiply(color2).equalTo(expected)).toBeTruthy();
    });
  });
});
