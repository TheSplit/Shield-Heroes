// Piekny kotek ktory sobie spi :3

import { Sway } from "@/_game/effects/Sway";
import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { Easing, ReduceMotion } from "react-native-reanimated";

const spriteProps: SpriteProps = { source: require("@/_game/objects/cat/rest_level/z.png"), width: 50, height: 50 };

export class Z extends GameObject {
  constructor(name: string) {

    super({name: name,width: 50,height: 50});
    
    const spriteRenderer = new SpriteRenderer("ZSpriteRenderer", spriteProps);

    const script = new Sway(
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