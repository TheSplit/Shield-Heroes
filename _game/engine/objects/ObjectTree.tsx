
// Biblioteka rejestrowania obiektów wprowadzanych do programu.

import { GameObject } from "@/_game/engine/objects/GameObject";
import React from "react";
import { View } from "react-native";


export class ObjectTree {
  private objects: Record<string, GameObject> = {};
  
  Add(obj: GameObject) {
      if (this.objects[obj.name]) {
        console.warn(`GameObject with name "${obj.name}" is already registered.`);
        }
        this.objects[obj.name] = obj;
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
      <View style={{ position: 'relative',
        flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
      }}>
          {gameObjects.map((obj) => (
            <View key={obj.name}>
              {obj.Render()} 
            </View>
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

