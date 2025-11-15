import { Script } from "@/_game/engine/scripts/Script";
import { snapDirection } from "@/_game/engine/utils/Angles";
import { Vector2 } from "@/_game/engine/Vectors/Vectors";
import { JSX } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FloatingJoystick } from "./FloatingJoystick";
import { Handle } from "./Handle";

export class JoystickBehaviour extends Script {

  gameObject = this.GetGameObject();
    handle: Handle;
    joystick: FloatingJoystick;

  constructor(name:string) {
    super(name);
    this.handle = this.gameObject;
    this.joystick = this.gameObject.GetChildByName("JoystickHandle");
  }

    GameObjectRenderOverride(): JSX.Element {
        const pan = Gesture.Pan()
        .onUpdate((e) => {
            const handleV = new Vector2(this.handle.GetPosition().x, this.handle.GetPosition().y);
            const touchV = new Vector2(e.translationX, e.translationY);
            const distance = handleV.distanceTo(touchV);
            const direction = handleV.directionTo((touchV), true);
            if (distance > this.joystick.props.radius) { 
                handleV.x *= this.joystick.props.radius;
                handleV.y *= this.joystick.props.radius;
                this.handle.Move(handleV.x, handleV.y);
            }

            const snapped = snapDirection(direction);
        
            this.handle.Move(this.joystick.props.radius * snapped.x, this.joystick.props.radius * snapped.y);
        });

        return (
            <GestureDetector gesture={pan}>
                {this.gameObject.RenderComponents()}
                {this.gameObject.RenderChildren()}
            </GestureDetector>
        );
    };

}