import { Canvas } from "./canvas";
import { Color } from "./color";
import { ITuple, Tuple } from "./tuple";
import { writeFileSync } from 'fs';

class Projectile {
  #position: Tuple = Tuple.point(0, 0, 0) as Tuple;
  #velocity: Tuple = Tuple.vector(0, 0, 0) as Tuple;

  get position(): Tuple {
    return this.#position;
  }
  set position(pos: ITuple<number>) {
    if (!(pos as Tuple).isPoint()) {
      return;
    }
    this.#position = pos as Tuple;
  }

  get velocity(): Tuple {
    return this.#velocity;
  }
  set velocity(vel: ITuple<number>) {
    if (!(vel as Tuple).isVector()) {
      return;
    }
    this.#velocity = vel as Tuple;
  }

  constructor(position: ITuple<number>, velocity: ITuple<number>) {
    this.position = position;
    this.velocity = velocity;
  }
}

class Environment {
  #gravity: Tuple = Tuple.vector(0, 0, 0) as Tuple;
  #wind: Tuple = Tuple.vector(0, 0, 0) as Tuple;

  get gravity(): Tuple {
    return this.#gravity;
  }
  set gravity(grav: ITuple<number>) {
    if (!(grav as Tuple).isVector()) return;
    this.#gravity = grav as Tuple;
  }

  get wind(): Tuple {
    return this.#wind;
  }
  set wind(wind: ITuple<number>) {
    if (!(wind as Tuple).isVector()) return;
    this.#wind = wind as Tuple;
  }

  constructor(gravity: ITuple<number>, wind: ITuple<number>) {
    this.gravity = gravity;
    this.wind = wind;
  }
}

function tick(environment: Environment, projectile: Projectile): Projectile {
  const newPos = projectile.position.add(projectile.velocity);
  const newVel = projectile.velocity
    .add(environment.gravity)
    .add(environment.wind);
  return new Projectile(newPos, newVel);
}

let p = new Projectile(
  Tuple.point(0, 1, 0),
  (Tuple.vector(1, 1.8, 0) as Tuple).normalize().multiply(11.25)
);
const e = new Environment(Tuple.vector(0, -0.1, 0), Tuple.vector(-0.01, 0, 0));

const c = new Canvas(900, 550);
const pathColor = new Color(0.7, 0.7, 0);

let numTicks = 0;
while (p.position.y > 0) {
  c.writePixel(Math.round(p.position.x), (c.height - 1 - Math.round(p.position.y)), pathColor);
  p = tick(e, p);
  numTicks++;
}

const ppmOutput = c.toPPM();
writeFileSync("ppmoutput.ppm", ppmOutput);