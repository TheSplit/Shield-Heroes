
// System wprowadzana sprite'ów/animacji do programu.


import React, { useEffect, useState } from "react";
import { Image } from "react-native";

export type SpriteProps = {
  source: any; 
  width: number;
  height: number;
};

export type AnimatedSpriteProps = {
  frames: SpriteProps[],
  interval: number
}

export function SpriteView({ source, width, height }: SpriteProps) {
  return (
    <Image
      source={{ uri: source }}
      style={{ width: width, height: height }}
      resizeMode="contain"  
    />
  );
}

export function AnimatedSpriteView({ frames, interval = 100 }: AnimatedSpriteProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (frames.length === 0) return;

    const timer = setInterval(() => {
      setFrameIndex(previousFrameIndex => (previousFrameIndex + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer);
  }, [frames, interval]);

  const { source, width, height } = frames[frameIndex];

  return <Image source={source} style={{ width, height }} resizeMode="contain" />;
}