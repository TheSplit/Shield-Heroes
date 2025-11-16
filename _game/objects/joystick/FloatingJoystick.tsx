import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { Handle } from "./Handle";
import { JoystickBehaviour } from "./JoystickBehaviour";


const joystickProps: SpriteProps = { source: require("@/_game/objects/joystick/joystick.png"), width:256, height: 256 };

export type JoystickProps = {
    radius: number;
};

export class FloatingJoystick extends GameObject {

  props: JoystickProps;

  constructor(name: string, props: JoystickProps = { radius: 128 }) {

    super({
      name: name, 
      width: 256,
      height: 256,
  });
    this.props = props;

    const joystickSpriteRenderer = new SpriteRenderer("BorderSpriteRenderer", joystickProps);
    
    this.AddComponent(joystickSpriteRenderer);
    this.AddChild(new Handle("JoystickHandle"));
    this.AddScript(new JoystickBehaviour("JoystickBehaviour", this));
    this.Hide();
}
}