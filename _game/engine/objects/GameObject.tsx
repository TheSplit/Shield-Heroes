import { defaultStyles, GameObjectStyle } from "@/_game/styles/Styles";
import React, { JSX } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Script } from "../scripts/Script";
import { Vector2 } from "../vectors/Vectors";
import { Block } from "./Block";
import { Component } from "./Component";

export type GameObjectProps = {
  name: string, width: number, height: number, style?: GameObjectStyle, wrapper?: React.ElementType, offsetByHalf?: boolean, opacity?: number
}

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
  rotation: number = 0;

  
  constructor({
    name,
    width,
    height,
    style = defaultStyles,
    wrapper = Animated.View,
    offsetByHalf = true,
    opacity = 1,
  }: GameObjectProps) {

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

GetScript(name: string): Script | undefined {
  return this.scripts.find(script => script.name === name);
}

  GetAllComponentsOfType<T>(type: new (...args: any[]) => T): T[] {
  return this.components.filter((component) => component instanceof type) as T[];
}

  GetChild(name: string): GameObject | undefined {
    return this.children.find((child) => child.name === name);
  }

  GetPosition(): Vector2 {
  const style = this.style;
  return new Vector2(this.style.left as number, this.style.top as number) }

RotateTo(target: Vector2) {
  const pos = this.GetPosition();
  const dir = target.subtract(pos);

  const angleRad = Math.atan2(dir.y, dir.x);
  const angleDeg = angleRad * (180 / Math.PI);

  this.rotation = angleDeg;

  this.style.transform = [
    { rotate: `${angleDeg}deg` }
  ];
}
}
