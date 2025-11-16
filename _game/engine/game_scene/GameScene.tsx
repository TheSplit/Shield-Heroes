
import { ObjectTree } from "@/_game/engine/objects/ObjectTree";
import { FrameInfo } from "react-native-reanimated";
import { Script } from "../scripts/Script";

export default function GameScene({tree}: {tree: ObjectTree}) {
  
//   useEffect(() => {
//     StartAll(tree);
//   }, [])

//     useFrameCallback((frameInfo) => {
//         UpdateAll(tree, frameInfo);
//     })

  return tree.Render();
}

export function UpdateAll(tree: ObjectTree,  frameInfo: FrameInfo) {
    tree.GetAll().forEach(element => {
        element.GetAllComponentsOfType(Script).forEach((script) => {
            script.Update?.(frameInfo);
        })
    });
}

export function StartAll(tree: ObjectTree) {
    tree.GetAll().forEach(element => {
        element.GetAllComponentsOfType(Script).forEach((script) => {
            script.Start?.();
        })
    });
}