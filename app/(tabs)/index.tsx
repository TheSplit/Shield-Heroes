
import GameScene from "@/_game/engine/game_scene/GameScene";
import { GetTree, ObjectTree } from "@/_game/engine/objects/ObjectTree";
import { Cat } from "@/_game/objects/cat/Cat";
import { Z } from "@/_game/objects/cat/rest_level/Z";
import { getDimensions } from "@/_game/styles/Styles";
import { useMemo } from "react";


export default function HomeScreen() {
  const tree = useMemo(() => {
    const tree = GetTree();
    const cat = new Cat("Cat");
    tree.Add(cat);
    SpawnZs(tree, getDimensions().width / 2, getDimensions().height / 2, -5, -5, 3);

    return tree;
  }, []); // Do only once (no dependenc.)
  return <GameScene/> // Add the whole game scene - will call update and start functions, do all the functionality, etc
}

function SpawnZs(tree: ObjectTree, initialX: number, initialY: number, difX: number, difY: number, times: number = 3) {
  let cx = initialX;
  let cy = initialY;
  for (let i = 0; i < times; i++) {
  const z = new Z("Z" + i);
  z.Move(cx, cy);
  tree.Add(z);
  cx += difX;
  cy += difY;
  }
}
