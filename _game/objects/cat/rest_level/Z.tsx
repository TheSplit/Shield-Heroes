// Piekny kotek ktory sobie spi :3

import { Bob } from "@/_game/effects/Bob";
import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import Animated, { ReduceMotion } from "react-native-reanimated";

const spriteProps: SpriteProps = { source: require("@/_game/objects/cat/rest_level/z.png"), width: 50, height: 50 };

const spriteRenderer = new SpriteRenderer("ZSpriteRenderer", spriteProps);

const script = new Bob(
    "ZBob", 
    {
    duration: 1501,
      dampingRatio: 1.1,
      mass: 86,
      overshootClamping: false,
      energyThreshold: 6e-9,
      velocity: 0,
      reduceMotion: ReduceMotion.System,
    }
);

export class Z extends GameObject {
  constructor(name: string) {
    super(name, 50, 50, undefined, Animated.View);
    this.AddComponent(spriteRenderer);
    this.AddComponent(script);
  }
}