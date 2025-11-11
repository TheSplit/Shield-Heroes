import React, { JSX, useEffect, useState } from "react";
import { Image } from "react-native";
import { IComponent } from "../objects/IComponent";

// Notes:
// "..." notation spreads the props used as an argument to the props variable (just use instead of direct assignment)  
// > SpriteRenderer
// - SpriteProps
// > AnimatedSpriteRenderer
// - AnimationProps
// * Frames = SpriteProps[]
// * Name
// * Interval

export type SpriteProps = {
  source: any; 
  width: number;
  height: number;
};

export type SpriteRendererProps = {
  sprite: SpriteProps;
};

export type AnimationProps = {
  frames: SpriteProps[];
  name: string;
  interval: number;
};

export type AnimatedSpriteRendererProps = {
  animations: Record<string, AnimationProps>;
  defaultAnimation?: string;
};  

export function AnimatedSpriteViewComponent({frames, interval = 100}: {frames: SpriteProps[]; interval?: number;}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const { source, width, height } = frames[frameIndex];

  useEffect(() => {
    if (frames.length === 0) return;
    const timer = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % frames.length);
    }, interval);
    return () => clearInterval(timer);
  }, [frames, interval]);

  return <Image source={source} style={{ width, height }} resizeMode="contain" />;
}

export class SpriteRenderer implements IComponent {
  spriteProps: SpriteProps;

  constructor(name: string, spriteProps: SpriteProps) {
    this.name = name;
    this.spriteProps = { ...spriteProps };
  }
  name: string;

  Render(): JSX.Element {
    const { source, width, height } = this.spriteProps;
    return <Image source={source} style={{ width, height }} resizeMode="contain" />;
  }
}

export class AnimatedSpriteRenderer implements IComponent {
  name: string;
  animations: Record<string, AnimationProps>;
  currentAnimationKey: string;

  constructor(name: string, props: AnimatedSpriteRendererProps) {
    this.name = name;
    this.animations = { ...props.animations }; 
    if (props.defaultAnimation) this.currentAnimationKey = props.defaultAnimation;
    else {this.currentAnimationKey = Object.keys(props.animations)[0]}
  }

  Play(animationKey: string) {
    if (!this.animations[animationKey]) {
      console.warn(`The animation "${animationKey}" does not exist.`); return;
    }
    this.currentAnimationKey = animationKey;
  }

  Render(): JSX.Element {
    const animation = this.animations[this.currentAnimationKey];
    return <AnimatedSpriteViewComponent frames={animation.frames} interval={animation.interval} />;
  }
}
