import { defaultStyles, GameObjectStyle } from "@/_game/styles/Styles";
import React, { JSX } from "react";
import { View } from "react-native";
import { Component } from "./Component";

export class GameObject {
  components: Component[] = [];
  children: GameObject[] = [];
  name: string;
  style: GameObjectStyle;
  wrapper: React.ElementType;
  width: number;
  height: number;

  constructor(name: string, width: number, height: number, style: GameObjectStyle = defaultStyles, wrapper: React.ElementType = View) {
  this.name = name;
  this.width = width;
  this.height = height;
  this.style = style;
  this.wrapper = wrapper;
  }


  Render(): JSX.Element {
  return (
    <this.wrapper style={this.style}>
      {this.RenderComponents()}
      {this.RenderChildren()}
    </this.wrapper>
  );
  }

  RenderChildren(): React.ReactNode {
    return this.children.map((child, i) => <React.Fragment>{child.Render()}</React.Fragment>);
  }

  RenderComponents(): React.ReactNode {
  return this.components.map((comp, i) => <React.Fragment>{comp.Render()}</React.Fragment>);
}

  Move(x: number, y: number) {
    this.style.left = x;
    this.style.top = y;
  }

  MoveBy(dx: number, dy: number) {
    this.style.left = (this.style.left ?? 0) + dx;
    this.style.top = ((this.style.top as number) ?? 0) + dy;
  }


  AddComponent(component: Component) {
    component.gameObject = this;
    this.components.push(component);
  }

  RemoveComponent(name: string) {
  this.components = this.components.filter(
    component => component.name !== name
  );
  } // Nie wiem czy to by komponenty mialy swoje nazwy to dobry pomysl ale pomoglo mi to przy dawaniu hitboxów tarczy


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
  const style = this.style;
  return {
    x: (this.style.left as number),
    y: (this.style.top as number)
  };
}
}