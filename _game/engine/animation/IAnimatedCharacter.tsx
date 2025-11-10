import { SpriteProps } from "@/_game/engine/animation/Animations";

export interface IAnimatedCharacter {

  animations: Record<string, SpriteProps[]>;
  
}