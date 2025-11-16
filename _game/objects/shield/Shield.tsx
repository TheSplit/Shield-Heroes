
import { SpriteProps, SpriteRenderer } from "@/_game/engine/animation/Animations";
import { GameObject } from "@/_game/engine/objects/GameObject";
import { ShieldAngle } from "@/_game/engine/utils/Angles";
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import { shieldAngleToDir } from './../../engine/utils/Angles';

const spriteProps: SpriteProps = { source: require("@/_game/objects/shield/shield.png"), width: 36, height: 71 };

type ShieldProps = { 
    pivotX: number;
    pivotY: number;
    radius: number;
    rotationSpeed: number;
    shieldAngle: ShieldAngle;
    currentAngle: number;
};


export class Shield extends GameObject {

    props: ShieldProps;

ChangeAngle(angle: ShieldAngle | Vector2) {

  let dir: Vector2;

  if (angle instanceof Vector2) {
    dir = angle.normalize();
  } else {
    dir = shieldAngleToDir(angle);
    this.props.shieldAngle = angle;
  }
  const pos = new Vector2(
    this.props.pivotX + dir.x * this.props.radius,
    this.props.pivotY + dir.y * this.props.radius
  );
  this.Move(pos.x, pos.y);
  this.RotateTo(new Vector2(this.props.pivotX, this.props.pivotY));
}

  constructor(name: string, props: ShieldProps) {

    super({name: name, width: 36, height: 71});

    this.props = props;

    const spriteRenderer = new SpriteRenderer("ShieldSpriteRenderer", spriteProps);
    
    this.AddComponent(spriteRenderer);

    this.ChangeAngle(ShieldAngle.Bottom);

  }
}