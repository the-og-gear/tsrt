import { Color } from "../src/color";
import { Canvas } from "../src/canvas";

describe("Canvas tests", () => {
  test("Creating a canvas", () => {
    const c = new Canvas(10, 20);

    expect(c.width).toEqual(10);
    expect(c.height).toEqual(20);

    // Intentionally not using pixelAt here, we're making
    // absolutely certain by bypassing the methods that this
    // is doing what it's supposed to
    for (const pixel of c.pixels) {
      expect(pixel.equalTo(new Color(0, 0, 0))).toBeTruthy();
    }
  });

  test("Writing pixels to a canvas", () => {
    const c = new Canvas(10, 20);
    const pixelColor = new Color(1, 0, 0);

    c.writePixel(2, 3, pixelColor);
    expect(c.pixelAt(2, 3).equalTo(new Color(1, 0, 0))).toBeTruthy();
  });

  describe("Canvas output", () => {
    test("Constructing the PPM header", () => {
      const c = new Canvas(5, 3);
      const ppmOutput = c.toPPM();
      expect(ppmOutput.substring(0, 10)).toEqual("P3\n5 3\n255");
    });

    test("Constructing PPM pixel data", () => {
      const c = new Canvas(3, 3);
      c.writePixel(0, 0, new Color(1.5, 0, 0));
      c.writePixel(1, 1, new Color(0, 0.5, 0));
      c.writePixel(2, 2, new Color(-0.5, 0, 1));
      const ppmOutput = c.toPPM();
      expect(ppmOutput.substring(11)).toEqual(
        "255 0 0\n0 0 0\n0 0 0\n0 0 0\n0 128 0\n0 0 0\n0 0 0\n0 0 0\n0 0 255\n"
      );
    });
  });
});
