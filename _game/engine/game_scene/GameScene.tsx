
import { GetTree, ObjectTree } from "@/_game/engine/objects/ObjectTree";
import { useEffect } from "react";
import { useFrameCallback } from "react-native-reanimated";
import { Script } from "../scripts/Script";

export default function GameScene() {
  const objectTree = GetTree();
  
    useEffect(() => {
        StartAll(objectTree);
    }, [])

    useFrameCallback(() => {
        UpdateAll(objectTree);
    })

  return objectTree.Render();
}

export function UpdateAll(tree: ObjectTree) {
    tree.GetAll().forEach(element => {
        element.GetAllComponentsOfType(Script).forEach((script) => {
            script.Update?.();
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