import { ShieldAngle, ShieldAngleMap } from "@/_game/engine/utils/Angles";
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import l1 from '@/_game/levels/l1.json';
import { defaultStyles } from "@/_game/styles/Styles";
import React, { useState } from "react";
import { View } from "react-native";
import { useFrameCallback } from "react-native-reanimated";
import { Projectile } from "../projectiles/definition/Projectile";
import { Leaf } from "../projectiles/leaf/Leaf";

export const Spawner: React.FC = () => {

  const [projectiles, setProjectiles] = useState<Projectile[]>([]);

  const spawnProjectile = (proj: Projectile, spawnPos: ShieldAngle) => {
    let pos: Vector2 = ShieldAngleMap[spawnPos] ?? new Vector2(200, 0);
    proj.Move(pos.x, pos.y);
    proj.RotateTo(proj.targetPos);
    setProjectiles(prev => [...prev, proj]);
  };

  let timer: number = 0
    let counter: number = 0;
    useFrameCallback((data) => {
    timer += data.timeSinceFirstFrame;
    l1.spawn.forEach(() => {
    let element = l1.spawn[counter];
    let proj: Projectile;
    let angle: ShieldAngle;

    switch (element.angle) {
    case 0:
        angle = ShieldAngle.Top;
        break;
    case 1:
        angle = ShieldAngle.TopRight;
        break;
    case 2:
        angle = ShieldAngle.Right;
        break;
    case 3:
        angle = ShieldAngle.BottomRight;
        break;
    case 4:
        angle = ShieldAngle.Bottom;
        break;
    case 5:
        angle = ShieldAngle.BottomLeft;
        break;
    case 6:
        angle = ShieldAngle.Left;
        break;
    case 7:
        angle = ShieldAngle.TopLeft;
        break;
    default:
        angle = ShieldAngle.Top;
        break;
    }

    proj = new Leaf("pr" + counter, element.speed);
    switch (element.type) {
        case "leaf": {
            proj = new Leaf("pr" + counter, element.speed);
        }
        default: {
            proj = new Leaf("pr" + counter, element.speed);
        }
    }

    if (element.delay < timer) {
    spawnProjectile(proj, angle);
    counter += 1;
    }
    });
  })

  return (
    <View style={{ flex: 1 }}>
      {projectiles.map(p => (
        <p.wrapper key={"projectile" + p.id} style={defaultStyles} />
      ))}
    </View>
  );
};