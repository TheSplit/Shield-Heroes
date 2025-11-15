import { JSX } from "react";
import { Block } from "./Block";

export abstract class Attachment extends Block {
  name: string;
  gameObject?: any;

  constructor(name: string) {
    super();
    this.name = name;
  }

  GetGameObject() {
    return this.gameObject;
  }

Attach(gameObject: any) {
    this.gameObject = gameObject;
  }


  Render?(): JSX.Element | null;
}