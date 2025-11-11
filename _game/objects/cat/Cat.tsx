// Piekny kotek ktory sobie spi :3

import { AnimatedSpriteRenderer, AnimationProps } from "@/_game/engine/animation/Animations";
import { BoxCollision } from "@/_game/engine/collisions/Collisions";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { StyleSheet } from "react-native";

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

const collisionComponent = new BoxCollision({
  name: "CatCollision",
  x: 100,
  y: 100,
  xOffset: 0,
  yOffset: 0,
  isTrigger: false
})

const catStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export class Cat extends GameObject {
  constructor(name: string) {
    super(name, catStyle);
    this.AddComponent(spriteRenderer);
    this.AddComponent(collisionComponent);
  }
}