import { SpriteProps, SpriteRendererProps } from "@/_game/engine/animation/Animations";
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import { Projectile } from "@/_game/objects/projectiles/definition/Projectile";



const leafSpriteProps: SpriteProps = {
     source: require("@/_game/objects/projectiles/leaf/leaf.png"), 
    width: 22,
     height: 48,
};

const rendererProps: SpriteRendererProps = {
    sprite: leafSpriteProps,
}

export class Leaf extends Projectile {
    constructor(name: string, speed: number, targetPos: Vector2 = new Vector2(0,0)) {
        super({
            name: "Leaf",
            width: 22,
            height: 48,
        }, rendererProps,
        speed, targetPos);
    }
}