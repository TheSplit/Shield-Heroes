
import { GetTree } from "@/_game/engine/objects/ObjectTree";
import { Cat } from "@/_game/objects/cat/Cat";

export default function HomeScreen() {


  const cat = new Cat("Cat");
  const tree = GetTree();
  tree.Add(cat);
  
  const objects = tree.GetAll();
  return tree.Render();
}

