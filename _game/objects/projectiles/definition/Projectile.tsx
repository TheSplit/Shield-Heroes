import { GameObject, GameObjectProps } from "@/_game/engine/objects/GameObject";
import { ProjectileBehaviour } from "./ProjectileBehaviour";
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import { AnimationProps, SpriteProps, SpriteRenderer, SpriteRendererProps } from "@/_game/engine/animation/Animations";



export class Projectile extends GameObject {

    speed: number;
    targetPos: Vector2;
    spriteRendererProps: SpriteRendererProps;

    constructor(props: GameObjectProps, spriteRendererProps: SpriteRendererProps, speed: number, targetPos: Vector2) {
        super(props);
        this.speed = speed;
        this.targetPos = targetPos;
        this.spriteRendererProps = spriteRendererProps;
        this.AddScript(new ProjectileBehaviour("ProjectileBehaviour", this));
        this.AddComponent(new SpriteRenderer("LeafSpriteRenderer", spriteRendererProps.sprite));
    }

}