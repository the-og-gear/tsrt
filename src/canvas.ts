import { Color } from "./color";
import { ITuple } from "./tuple";

class Canvas {
    pixels: Color[];
    #width: number;
    #height: number;

    get width(): number {
        return this.#width;
    }
    get height(): number {
        return this.#height;
    }

    constructor(width: number, height: number) {
        this.#width = width;
        this.#height = height;
        this.pixels = new Array<Color>(width * height);
        for (let i = 0; i < this.#width * this.#height; ++i) {
            this.pixels[i] = new Color(0, 0, 0);
        }
    }

    pixelAt(x: number, y: number): ITuple<number> {
        return this.pixels[x + y * this.#width];
    }

    writePixel(x: number, y: number, color: ITuple<number>): void {
        this.pixels[x + y * this.#width] = color as Color;
    }

    toPPM(): string {
        let result = `P3\n${this.#width} ${this.#height}\n255\n`;

        for (const pixel of this.pixels) {
            result += `${scale(pixel.r)} ${scale(pixel.g)} ${scale(pixel.b)}\n`;
        }

        return result;
    }
}

function scale(value: number): number {
    return Math.round(Math.max(0, Math.min(value, 1)) * 255);
}

export { Canvas }