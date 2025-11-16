import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";

const handleProps: SpriteProps = { source: require("@/_game/objects/joystick/handle.png"), width: 100, height: 100 };

export class Handle extends GameObject {

  constructor(name: string) {

    super(name, 100, 100);

    const handleSpriteRenderer = new SpriteRenderer("HandleSpriteRenderer", handleProps);
    
    this.AddComponent(handleSpriteRenderer);
    
  }
}

