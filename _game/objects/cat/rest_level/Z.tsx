// Piekny kotek ktory sobie spi :3

import { Bob } from "@/_game/effects/Bob";
import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import Animated, { Easing, ReduceMotion } from "react-native-reanimated";

const spriteProps: SpriteProps = { source: require("@/_game/objects/cat/rest_level/z.png"), width: 50, height: 50 };

export class Z extends GameObject {
  constructor(name: string) {

    super(name, 50, 50, undefined);
    
    const spriteRenderer = new SpriteRenderer("ZSpriteRenderer", spriteProps);

    const script = new Bob(
        "ZBob", 
        {
     duration: 800,
      easing: Easing.out(Easing.quad),
      offsetTop: 5,
      reduceMotion: ReduceMotion.System,
        }
    );

    this.AddComponent(spriteRenderer);
    this.AddScript(script);
  }
}