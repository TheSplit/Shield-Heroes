
// System detekcji kolizji w programie.

import { JSX } from "react";
import { View } from "react-native";
import { useFrameCallback } from "react-native-reanimated";
import { GameObject } from "../objects/GameObject";
import { IComponent } from "../objects/IComponent";
import { GetTree } from "../objects/ObjectTree";


export type CollisionProps = {
name: string, 
x: number,
y: number,
xOffset: number, 
yOffset: number, 
isTrigger: boolean,
}

export class BoxCollision implements IComponent {
    sizeX: number;
    sizeY: number;
    offsetX: number;
    offsetY: number;
    name: string;
    isTrigger: boolean;

    constructor(collisionProps: CollisionProps) {
        this.sizeX = collisionProps.x;
        this.sizeY = collisionProps.y;
        this.offsetX = collisionProps.xOffset;
        this.offsetY = collisionProps.yOffset
        this.name = collisionProps.name;
        this.isTrigger = collisionProps.isTrigger;
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
    const aPos = a.gameObject.style.position;
    const bPos = b.gameObject.style.position;

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
