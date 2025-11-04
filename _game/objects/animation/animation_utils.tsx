import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function SpriteExample() {
  const frameIndex = useSharedValue(0);
  const totalFrames = 4;
  const frameWidth = 64;

  useEffect(() => {
    const interval = setInterval(() => {
      frameIndex.value = (frameIndex.value + 1) % totalFrames;
    }, 100); // fps = 10
    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -frameIndex.value * frameWidth }],
  }));

  return (
    <View style={{ width: frameWidth, height: 64, overflow: 'hidden' }}>
      <Animated.Image
        source={require('./assets/player-sprite.png')}
        style={[{ width: frameWidth * totalFrames, height: 64 }, animatedStyle]}
      />
    </View>
  );
}
