import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/spring";
import { Script } from "../engine/scripts/Script";

export class Bob extends Script {

  gameObject = this.GetGameObject();
  config: SpringConfig;
  style = this.gameObject?.style;

  constructor(name:string, config: SpringConfig) {
    super(name);
    this.config = config;

this.GameObjectRenderOverride = () => {
  const initialY = typeof this.gameObject?.style.top === "number" ? (this.gameObject!.style.top as number) : 0;
  const AnimatedComponent: React.FC = () => {
    const translateY = useSharedValue(initialY);

    useEffect(() => {
      translateY.value = withRepeat(
        withSpring(initialY + 50, this.config),
        -1,
        true
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }]
    }));

    return (
      <Animated.View style={[this.gameObject!.style, animatedStyle]}>
        {this.gameObject?.RenderComponents()}
        {this.gameObject?.RenderChildren()}
      </Animated.View>
    );
  };

  return <AnimatedComponent />;
};
};

}
