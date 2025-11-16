import { defaultStyles, GameObjectStyle } from "@/_game/styles/Styles";
import React, { JSX } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Script } from "../scripts/Script";
import { Block } from "./Block";
import { Component } from "./Component";

export class GameObject extends Block {

  components: Component[] = [];
  children: GameObject[] = [];
  scripts: Script[] = [];
  name: string;
  style: GameObjectStyle;
  wrapper: React.ElementType;
  width: number;
  height: number;
  visible: boolean = true;           
  opacity = { value: 1 };

  constructor(name: string, width: number, height: number, style: GameObjectStyle = defaultStyles, wrapper: React.ElementType = Animated.View, offsetByHalf: boolean = true, opacity: number = 1) {
  super();
  this.name = name;
  this.width = width;
  this.height = height;
  if (offsetByHalf) {
    style.left = (style.left as number ?? 0) - width / 2;
    style.top = (style.top as number ?? 0) - height / 2;
  }
  this.style = { ...style }; // <- Creates an unique copy for the gameobject
  this.wrapper = wrapper;
  this.opacity.value = opacity;
  }


  Show() {
    this.visible = true;
    this.opacity.value = 1; 
  }

  Hide() {
    this.opacity.value = 0; 
    this.visible = false;
  }

  Render(): JSX.Element {
    const override = this.scripts.find(script => script.GameObjectRenderOverride);
    if (override && override.GameObjectRenderOverride) return override.GameObjectRenderOverride();  
    const opacity = this.opacity;
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value
    }));
    return (
    <this.wrapper style={[this.style, animatedStyle]}>
      {this.RenderComponents()}
      {this.RenderChildren()}
    </this.wrapper>
  );
  }

  RenderChildren(): React.ReactNode {
    return this.children.map((child, i) => <child.wrapper key={child.id}>{child.Render()}</child.wrapper>);
  }

  RenderComponents(): React.ReactNode {
  return this.components.map((comp, i) => <View key={comp.id}>{comp.Render()}</View>);
}

  Move(x: number, y: number) {
    this.style.left = x;
    this.style.top = y;
  }


  MoveBy(dx: number, dy: number) {
    this.style.left = (this.style.left ?? 0) + dx;
    this.style.top = ((this.style.top as number) ?? 0) + dy;
  }

  AddChild(child: GameObject) {
    this.children.push(child);
  }

  AddComponent(component: Component) {
    component.Attach(this);
    this.components.push(component);
  }

  RemoveComponent(name: string) {
  this.components = this.components.filter(
    component => component.name !== name
  );
  }

  AddScript(script: Script) {
    script.Attach(this);
    if (this.wrapper !== Animated.View) { 
      console.warn("Scripts' Update() method requires the wrapper to be of Animated.View type to work properly. Use GameObjectRenderOverride to override the render.");
    }
    this.scripts.push(script);
  }

  RemoveScript(name: string) {
      this.scripts = this.scripts.filter(
    script => script.name !== name
  );
  }

  HasComponent(name: string): boolean {
    return this.components.some((value) => value.name === name);
  }

  HasScript(name: string): boolean {
    return this.scripts.some((value) => value.name === name);
  }

  HasComponentOfType<T>(type: new (...args: any[]) => T): boolean {
    return this.components.some((component) => component instanceof type);
  }

  GetComponentOfType<T>(type: new (...args: any[]) => T): T {
  return this.components.find((component) => component instanceof type) as T
  } 

  GetAllComponentsOfType<T>(type: new (...args: any[]) => T): T[] {
  return this.components.filter((component) => component instanceof type) as T[];
}

  GetChild(name: string): GameObject | undefined {
    return this.children.find((child) => child.name === name);
  }

  GetPosition(): { x: number; y: number } {
  const style = this.style;
  return {
    x: (this.style.left as number),
    y: (this.style.top as number)
  };
}
}