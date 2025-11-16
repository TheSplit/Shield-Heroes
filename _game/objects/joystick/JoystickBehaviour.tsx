import { GameObject } from "@/_game/engine/objects/GameObject";
import { Script } from "@/_game/engine/scripts/Script";
import { snapDirection } from "@/_game/engine/utils/Angles";
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import { JSX } from "react";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Shield } from "../shield/Shield";
import { FloatingJoystick } from "./FloatingJoystick";
import { Handle } from "./Handle";

export class JoystickBehaviour extends Script {

  handle: Handle;
  joystick: FloatingJoystick;
  shield?: Shield;

  constructor(name:string, gameObject: GameObject) {
    super(name);
    this.gameObject = gameObject;
    this.handle = this.gameObject!.GetChild("JoystickHandle") as Handle;
    this.joystick = this.gameObject! as FloatingJoystick; // <- for typing
    this.joystick.Hide();
  }

  ChangeShield(shield: Shield) { this.shield = shield };

    GameObjectRenderOverride(): JSX.Element {
      const closuredInstance = this;
        const pan = Gesture.Pan()
        .onBegin((e) => {
            closuredInstance.joystick.Show();
            closuredInstance.joystick.Move(e.translationX, e.translationY);
        })
        .onUpdate((e) => {
            const handleV = new Vector2(closuredInstance.handle.GetPosition().x, closuredInstance.handle.GetPosition().y);
            const touchV = new Vector2(e.translationX, e.translationY);
            const distance = handleV.distanceTo(touchV);
            const direction = handleV.directionTo((touchV), true);
            if (distance > closuredInstance.joystick.props.radius) { 
                handleV.x *= closuredInstance.joystick.props.radius;
                handleV.y *= closuredInstance.joystick.props.radius;
                closuredInstance.handle.Move(handleV.x, handleV.y);
            }

            const snapped = snapDirection(direction);
            
            closuredInstance.handle.Move(closuredInstance.joystick.props.radius * snapped.x, closuredInstance.joystick.props.radius * snapped.y);
            this.shield?.ChangeAngle(snapped);

        }).
        onEnd(() => {
            closuredInstance.joystick.Hide();
        });

    return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <GestureDetector gesture={pan}>
      <Animated.View style={this.joystick.style}>
      {this.gameObject!.RenderComponents()}
      <this.handle.wrapper style={this.joystick.style}>
        {this.handle.Render()}
      </this.handle.wrapper>
    </Animated.View>
  </GestureDetector>
</GestureHandlerRootView>
    );
    };

}