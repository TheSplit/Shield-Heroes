
import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { createGameObjectStyle, GameObjectStyle } from "@/_game/styles/Styles";

const shadowProps: SpriteProps = {
    source: require("@/_game/objects/cat/shadows/shadow.png"),
    width: 260,
    height: 79
};


export class Shadow extends GameObject {
  constructor(name: string) {
      const shadowStyle: GameObjectStyle = createGameObjectStyle({
      width: 260,
      height: 79,
      left: 0,
      top: 50,
      zIndex: -9999
    });

    super(name, 260, 79, shadowStyle);
    
    const spriteRenderer = new SpriteRenderer("CatSpriteRenderer", shadowProps);
    this.AddComponent(spriteRenderer);
  }
}

