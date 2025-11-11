
// Biblioteka rejestrowania obiektów wprowadzanych do programu.

import { GameObject } from "@/_game/engine/objects/GameObject";
import React from "react";
import { View } from "react-native";



export class ObjectTree {
  private objects: Record<string, GameObject> = {};

  // Adds by an existing instance.
  Add(obj: GameObject) {
        if (this.objects[obj.name]) {
        console.warn(`GameObject with name "${obj.name}" is already registered.`);
        }
        this.objects[obj.name] = obj;
        return obj.GetJSX();
    } 

  Get(name: string): GameObject | undefined {
    return this.objects[name];
  }

  Remove(name: string) {
    delete this.objects[name];
  }

  GetAll(): GameObject[] {
    return Object.values(this.objects);
  }

  Render() {
    const gameObjects = this.GetAll();
        return (
        <View style={{ flex: 1 }}>
          {gameObjects.map((obj, index) => (
            <React.Fragment key={index}>
              {obj.GetJSX()} 
            </React.Fragment>
          ))}
        </View>
      );
  }
}   

let currentTree = new ObjectTree();

export function GetTree() {
    return currentTree;
}

export function SetTree(tree: ObjectTree) {
    currentTree = tree;
}

