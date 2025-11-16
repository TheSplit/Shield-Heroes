import { Script } from '@/_game/engine/scripts/Script';
import { Vector2 } from "@/_game/engine/vectors/Vectors";
import { FrameInfo } from "react-native-reanimated";
import { Projectile } from "./Projectile";

export class ProjectileBehaviour extends Script {

    projectile: Projectile;

  constructor(name:string, gameObject: Projectile, targetPos = new Vector2(0,0)) {
    super(name);
    this.projectile = gameObject; // <- For typing
  }

  Update(frameInfo: FrameInfo): void {
    let dir: Vector2 = this.projectile.GetPosition().directionTo(this.projectile.targetPos).normalize();
    this.gameObject?.MoveBy(dir.x * this.projectile.speed * frameInfo.timeSinceFirstFrame, dir.y * this.projectile.speed * frameInfo.timeSinceFirstFrame);
  }
}
