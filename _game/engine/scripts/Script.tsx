import { JSX } from "react";
import { Attachment } from "../objects/Attachment";

export class Script extends Attachment {
    Start(): void {}
    Update(): void {}
    GameObjectRenderOverride?(): JSX.Element;
}