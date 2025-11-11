import { JSX } from "react";


export interface IComponent {
  name: string;
  Render(): JSX.Element;
}


