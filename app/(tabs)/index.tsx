
import GameScene from "@/_game/engine/game_scene/GameScene";
import { GetTree, ObjectTree } from "@/_game/engine/objects/ObjectTree";
import { Background } from "@/_game/objects/background/Background";
import { Cat } from "@/_game/objects/cat/Cat";
import { Z } from "@/_game/objects/cat/rest_level/Z";
import { Shadow } from "@/_game/objects/cat/shadows/Shadow";
import {
  FloatingJoystick
} from "@/_game/objects/joystick/FloatingJoystick";
import { JoystickBehaviour } from "@/_game/objects/joystick/JoystickBehaviour";
import { Shield } from "@/_game/objects/shield/Shield";
import { Spawner } from "@/_game/objects/spawner/Spawner";
import { useMemo } from "react";
import { View } from "react-native";

type SpawnZProps = {
  tree: ObjectTree, 
  initialX: number,
  initialY: number,
  difX: number, 
  difY: number, 
  times: number;
}

function Prepare() {
  // useCollisionSystem();
}

export default function HomeScreen() {
  Prepare();
  const tree: ObjectTree = useMemo(() => {
    const tree = GetTree();
    
    tree.Add(new Shadow("Shadow"));
    tree.Add(new Cat("Cat"));

    let shield = new Shield("Shield", {
      pivotX: 0,
      pivotY: 0,
      radius: 200,
      rotationSpeed: 2,
      shieldAngle: 0,
      currentAngle: 0,
    })

    tree.Add(shield);
    SpawnZs({
      tree: tree,
      initialX: 30,
      initialY: -50,
      difX: -20,
      difY: 7,
      times: 3,
    });
    const joystick = new FloatingJoystick("Joystick");
    joystick.Move(999, 990); 
    let jb: JoystickBehaviour = joystick.GetScript("JoystickBehaviour") as JoystickBehaviour;
    jb.ChangeShield(shield);
    tree.Add(joystick);


    <Spawner></Spawner>


    return tree;
  }, []); 
    return (
    <View style={{ flex: 1 }}>
      <Background />
      <GameScene tree={tree} />
    </View>
  );
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
