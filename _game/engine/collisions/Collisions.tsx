
// System detekcji kolizji w programie.

import { Component } from "@/_game/engine/objects/Component";
import { JSX } from "react";
import { View } from "react-native";
import { useFrameCallback } from "react-native-reanimated";
import { GameObject } from "../objects/GameObject";
import { GetTree } from "../objects/ObjectTree";

export type CollisionProps = {
name: string, 
sizeX: number,
sizeY: number,
xOffset: number, 
yOffset: number, 
onCollisionEntered?: (collider: BoxCollision) => void;
onCollisionExited?: (collider: BoxCollision) => void;
}

export class BoxCollision extends Component {
    sizeX: number;
    sizeY: number;
    offsetX: number;
    offsetY: number;
    name: string;
    onCollisionEntered?: (collider: BoxCollision) => void;
    onCollisionExited?: (collider: BoxCollision) => void;


    constructor(name: string, collisionProps: CollisionProps) {
      super(name);
      this.sizeX = collisionProps.sizeX;
      this.sizeY = collisionProps.sizeY;
      this.offsetX = collisionProps.xOffset;
      this.offsetY = collisionProps.yOffset
      this.name = collisionProps.name;
      this.onCollisionEntered = collisionProps.onCollisionEntered;
      this.onCollisionExited = collisionProps.onCollisionExited;
    }


    Render(): JSX.Element {
        return <View></View>
    }

    CollisionEntered(object: BoxCollision) {}

    CollisionExited(object: BoxCollision) {}
}

useFrameCallback(() => {
  CheckCollisions();
})

class CollisionParams {
    gameObject: GameObject;
    collisionComponent: BoxCollision;

    constructor(gameObject: GameObject, collitionComponent: BoxCollision) {
        this.gameObject = gameObject;
        this.collisionComponent = collitionComponent;
    }
}

function CheckCollision(a: CollisionParams, b: CollisionParams): boolean {
  // Get numeric positions
  const aPos = { x: a.gameObject.style.left ?? 0, y: a.gameObject.style.top ?? 0 };
  const bPos = { x: b.gameObject.style.left ?? 0, y: b.gameObject.style.top ?? 0 };

  const aCol = a.collisionComponent;
  const bCol = b.collisionComponent;

  const aMin = { x: aPos.x + aCol.offsetX, y: aPos.y + aCol.offsetY };
  const aMax = { x: aMin.x + aCol.sizeX, y: aMin.y + aCol.sizeY };

  const bMin = { x: bPos.x + bCol.offsetX, y: bPos.y + bCol.offsetY };
  const bMax = { x: bMin.x + bCol.sizeX, y: bMin.y + bCol.sizeY };

  return (
    aMin.x < bMax.x &&
    aMax.x > bMin.x &&
    aMin.y < bMax.y &&
    aMax.y > bMin.y
  );
}



function CheckCollisions() {
    let collisions: CollisionParams[] = []; 
    GetTree().GetAll().forEach((gameObject) => {
        gameObject.GetAllComponentsOfType(BoxCollision).forEach((collisionComponent) => {
            collisions.push(new CollisionParams(gameObject, collisionComponent));
        })
    })

    for (let i = 0; i < collisions.length; i++) {
      for (let j = i + 1; j < collisions.length; j++) {
        const a = collisions[i];
        const b = collisions[j];

        if (CheckCollision(a, b)) {
          a.collisionComponent.CollisionEntered(b.collisionComponent);
          b.collisionComponent.CollisionEntered(a.collisionComponent);
        }
      }
    }
}
