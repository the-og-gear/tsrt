import { ITuple } from "./tuple";

export class Ray {
  origin: ITuple<number>;
  direction: ITuple<number>;

  constructor(pos: ITuple<number>, dir: ITuple<number>) {
    this.origin = pos;
    this.direction = dir;
  }

  position(distance: number): ITuple<number> {
    return this.origin.add(this.direction.multiply(distance));
  }
}
