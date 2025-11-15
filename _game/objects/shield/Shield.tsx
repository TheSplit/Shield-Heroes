
import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import Animated from "react-native-reanimated";

const spriteProps: SpriteProps = { source: require("@/_game/objects/shield/shield.png"), width: 71, height: 36 };

type ShieldProps = { 
    pivotX: number;
    pivotY: number;
    pivotDistance: number;
    rotationSpeed: number;
    shieldAngle: ShieldAngle;
    currentAngle: number;
};

enum ShieldAngle
{
    Right,
    TopRight,
    Top,
    TopLeft,
    Left,
    BottomLeft,
    Bottom,
    BottomRight
}

const AngleMap: Record<number, ShieldAngle> = {
  0: ShieldAngle.Right,
  45: ShieldAngle.TopRight,
  90: ShieldAngle.Top,
  135: ShieldAngle.TopLeft,
  180: ShieldAngle.Left,
  225: ShieldAngle.BottomLeft,
  270: ShieldAngle.Bottom,
  315: ShieldAngle.BottomRight,
};


export class Shield extends GameObject {

  constructor(name: string, ShieldProps: ShieldProps) {

    super(name, 200, 200, undefined, Animated.View);

    const spriteRenderer = new SpriteRenderer("ShieldSpriteRenderer", spriteProps);
    
    this.AddComponent(spriteRenderer);

    this.Move(ShieldProps.pivotX, ShieldProps.pivotY - ShieldProps.pivotDistance);

    

  }
}