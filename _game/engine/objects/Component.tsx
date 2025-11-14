
import { JSX } from "react";
import { View } from "react-native";
import { GameObject } from "./GameObject";

export abstract class Component {
  name: string;
  public gameObject?: GameObject;

  Render(): JSX.Element {
    return (<View></View>);
  }

  GetGameObject(): GameObject | undefined {
    if (this.gameObject) return this.gameObject
    else return undefined;
  }

  constructor(name: string) {
    this.name = name;
  }

  GameObjectRenderOverride?: () => JSX.Element;
}


