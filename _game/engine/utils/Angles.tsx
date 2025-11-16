
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import { deg2rad } from "../math/Math";

export enum ShieldAngle
{
    Right,
    TopRight,
    Top,
    TopLeft,
    Left,
    BottomLeft,
    Bottom,
    BottomRight
}

export const AngleMap: Record<number, ShieldAngle> = {
  0: ShieldAngle.Right,
  45: ShieldAngle.TopRight,
  90: ShieldAngle.Top,
  135: ShieldAngle.TopLeft,
  180: ShieldAngle.Left,
  225: ShieldAngle.BottomLeft,
  270: ShieldAngle.Bottom,
  315: ShieldAngle.BottomRight,
};

export function snapAngle(angleDeg: number): ShieldAngle {
  const raw = Math.round(angleDeg / 45) * 45;
  const snapped = ((raw % 360) + 360) % 360; 
  return AngleMap[snapped];
}

export const directionMap: Record<number, Vector2> = {
  0: new Vector2(1, 0),
  45: new Vector2(1, 1).normalize(),
  90: new Vector2(0, 1),
  135: new Vector2(-1, 1).normalize(),
  180: new Vector2(-1, 0),
  225: new Vector2(-1, -1).normalize(),
  270: new Vector2(0, -1),
  315: new Vector2(1, -1).normalize(),
};

export function shieldAngleToDir(angle: ShieldAngle): Vector2 {
  const entry = Object.entries(AngleMap).find((deg, val) => val === angle);
  if (!entry) throw new Error("Invalid ShieldAngle");
  const deg = Number(entry[0]);
  return directionMap[deg];
}


export let ShieldAngleMap: Partial<Record<ShieldAngle, Vector2>> = {};

let radius = 40;

Object.values(ShieldAngle).map((value, i) => {
    let angleDeg: number = i * 45;
    let angleRad: number = deg2rad(angleDeg);
    let spawnPos: Vector2 = new Vector2(Math.cos(angleRad) * radius, Math.sin(angleRad) * radius);
    ShieldAngleMap[value as ShieldAngle] = spawnPos;
})




export function snapDirection(vector: Vector2): Vector2 {
    let dirs: Vector2[] = Object.values(directionMap);
    let closestDir: Vector2 = dirs[0];            

    dirs.forEach(dir => {
        if (vector.dot(dir) > vector.dot(closestDir)) {
            closestDir = dir;
        }
    });
    
    return closestDir;
}