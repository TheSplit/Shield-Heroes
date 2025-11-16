import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, WithTimingConfig } from "react-native-reanimated";
import { Script } from "../engine/scripts/Script";

export type BobConfig = WithTimingConfig & {
  offsetTop: number;
};

export class Bob extends Script {

    
  gameObject = this.GetGameObject();
  config: BobConfig;

  style = this.gameObject?.style;

  constructor(name:string, config: BobConfig) {
    super(name);
    this.config = config;

    this.GameObjectRenderOverride = () => {
    const initialY = (this.gameObject!.style.top as number);
    const AnimatedComponent: React.FC = () => {
    const translateY = useSharedValue(initialY);

    translateY.value = withRepeat(
      withTiming(initialY + config.offsetTop, this.config),
      -1,
      true
    );

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }]
    }));

    return (
      <Animated.View style={[this.gameObject!.style, animatedStyle]}>
        {this.gameObject!.RenderComponents()}
        {this.gameObject!.RenderChildren()}
      </Animated.View>
    );
  };

  return <AnimatedComponent/>;
  };
};

}
