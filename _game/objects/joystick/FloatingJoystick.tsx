import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { Handle } from "./Handle";


const joystickProps: SpriteProps = { source: require("@/_game/objects/joystick/handle.png"), width:256, height: 256 };

export type JoystickProps = {
    radius: number;
};

export class FloatingJoystick extends GameObject {

  props: JoystickProps;

  constructor(name: string, props: JoystickProps) {

    super(name, 256, 256);
    this.props = props;

    const joystickSpriteRenderer = new SpriteRenderer("BorderSpriteRenderer", joystickProps);
    
    this.AddComponent(joystickSpriteRenderer);
    this.AddChild(new Handle("JoystickHandle"));
  
}
}