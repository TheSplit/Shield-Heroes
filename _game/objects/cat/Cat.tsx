import { AnimatedSpriteView, SpriteProps } from "@/_game/engine/animation/Animations";
import { IAnimatedCharacter } from "@/_game/engine/animation/IAnimatedCharacter";
import React, { JSX } from "react";

const sleepFrames: SpriteProps[] = [
  { source: require("@/_game/objects/cat/sleep/sleep1.png"), width: 233, height: 165 },
  { source: require("@/_game/objects/cat/sleep/sleep2.png"), width: 233, height: 165 },
];


export class Cat implements IAnimatedCharacter {
    animations: Record<string, SpriteProps[]> = {
    walk: sleepFrames,
  };

    Initiate(): JSX.Element {
    return (<AnimatedSpriteView frames={sleepFrames} interval={1000} />);
  }
}
    