
import { JSX } from "react";
import { View } from "react-native";
import { Attachment } from "./Attachment";

export abstract class Component extends Attachment {
  Render(): JSX.Element {
    return (<View></View>);
  }

  constructor(name: string) {
    super(name);
  }
}


