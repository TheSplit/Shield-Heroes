// Piekny kotek ktory sobie spi :3

import { AnimatedSpriteRenderer, AnimationProps } from "@/_game/engine/animation/Animations";
import { BoxCollision } from "@/_game/engine/collisions/Collisions";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { createGameObjectStyle, GameObjectStyle, getDimensions } from "@/_game/styles/Styles";

const sleepFrames: AnimationProps = {
  frames: [
    { source: require("@/_game/objects/cat/sleep/sleep1.png"), width: 233, height: 165 },
    { source: require("@/_game/objects/cat/sleep/sleep2.png"), width: 233, height: 165 },
  ],
  interval: 1000,
  name: "sleep"
};

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

const catStyle: GameObjectStyle = createGameObjectStyle({
  width: 233,
  height: 165,
  left: getDimensions().width / 2 - 233 / 2,
  top: getDimensions().height / 2 - 165 / 2,
});

export class Cat extends GameObject {
  constructor(name: string) {
    super(name, 233, 165, catStyle);
    this.AddComponent(spriteRenderer);
    this.AddComponent(collisionComponent);
  }
}

