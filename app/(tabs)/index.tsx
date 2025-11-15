
import GameScene from "@/_game/engine/game_scene/GameScene";
import { GetTree, ObjectTree } from "@/_game/engine/objects/ObjectTree";
import { Cat } from "@/_game/objects/cat/Cat";
import { Z } from "@/_game/objects/cat/rest_level/Z";
import { FloatingJoystick } from "@/_game/objects/joystick/FloatingJoystick";
import { Shield } from "@/_game/objects/shield/Shield";
import { useMemo } from "react";

type SpawnZProps = {
  tree: ObjectTree, 
  initialX: number,
  initialY: number,
  difX: number, 
  difY: number, 
  times: number;
}

export default function HomeScreen() {
  const tree = useMemo(() => {
    const tree = GetTree();
    tree.Add(new Cat("Cat"));
    tree.Add(new Shield("Shield", {
      pivotX: 0,
      pivotY: 0,
      pivotDistance: 50,
      rotationSpeed: 2,
      shieldAngle: 0,
      currentAngle: 0,
    }));
    SpawnZs({
      tree: tree,
      initialX: 30,
      initialY: -50,
      difX: -20,
      difY: 7,
      times: 3,
    });
    const joystick = new FloatingJoystick("Joystick", { radius: 128 });
    joystick.Move(50, 300); 
    tree.Add(joystick);w
    return tree;
  }, []); // Do only once (no dependenc.)
  return <GameScene/> // Add the whole game scene - will call update and start functions, do all the functionality, etc
}

function SpawnZs(props: SpawnZProps) {
  let cx = props.initialX;
  let cy = props.initialY;
  for (let i = 0; i < props.times; i++) {
  const z = new Z("Z" + i);
  z.Move(cx, cy);
  props.tree.Add(z);
  cx += props.difX;
  cy += props.difY;
  }
}
