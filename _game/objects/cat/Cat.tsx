// Piekny kotek ktory sobie spi :3

import { AnimatedSpriteRenderer, AnimationProps } from "@/_game/engine/animation/Animations";
import { BoxCollision } from "@/_game/engine/collisions/Collisions";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { createGameObjectStyle, GameObjectStyle } from "@/_game/styles/Styles";

const sleepFrames: AnimationProps = {
  frames: [
    { source: require("@/_game/objects/cat/sleep/sleep1.png"), width: 233, height: 165 },
    { source: require("@/_game/objects/cat/sleep/sleep2.png"), width: 233, height: 165 },
  ],
  interval: 1000,
  name: "sleep"
};


export class Cat extends GameObject {
  constructor(name: string) {
      const catStyle: GameObjectStyle = createGameObjectStyle({
      width: 233,
      height: 165,
      left: 0,
      top: 0,
      
      });

    super({
      name: name, width: 233, height: 165, style: catStyle});
    
    const spriteRenderer = new AnimatedSpriteRenderer("CatSpriteRenderer", {
      animations: {
        sleep: sleepFrames
      },
      defaultAnimation: "sleep"
    });

    const collisionComponent = new BoxCollision("catCollision", {
      name: "CatCollision",
      sizeX: 100,
      sizeY: 100,
      xOffset: 0,
      yOffset: 0,
      onCollisionEntered: (collider) => {
      }
    })

    this.AddComponent(spriteRenderer);
    this.AddComponent(collisionComponent);
  }
}

