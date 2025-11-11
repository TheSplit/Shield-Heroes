import { IComponent } from "@/_game/engine/objects/IComponent";
import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";

export class GameObject {
  components: IComponent[] = [];
  name: string;
  style: any;

  constructor(name: string, style = defaultStyle) {
    this.name = name;
    this.style = style;
  }

  GetJSX(): JSX.Element {
      return (
      <View style={this.style.container}>
        {this.components.map((component) => (
          <React.Fragment>{component.Render()}</React.Fragment>
        ))}
      </View>
    );
  }

  Update() { }

  AddComponent(component: IComponent) {
    this.components.push(component);
  }

  RemoveComponent(name: string) {
  this.components = this.components.filter(
    component => component.name !== name
  );
  } // Nie wiem czy to by komponenty mialy swoje nazwy to dobry pomysl ale pomoglo mi to przy dawaniu hitboxów tarczom 


  HasComponent(name: string): boolean {
    this.components.map((value) => {
      if (value.name == name) { 
        return true
      }
    })
    return false;
  }

  HasComponentOfType<T>(type: new (...args: any[]) => T): boolean {
    return this.components.some(component => component instanceof type);
  }

  GetComponentOfType<T>(type: new (...args: any[]) => T): T {
  return this.components.find(component => component instanceof type) as T
  } 

  GetAllComponentsOfType<T>(type: new (...args: any[]) => T): T[] {
  return this.components.filter(component => component instanceof type) as T[];
}

  GetPosition(): { x: number; y: number } {
  const style = this.style.container;
  return {
    x: style.left,
    y: style.top
  };
}
}

const defaultStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});