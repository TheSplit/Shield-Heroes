import { JSX } from "react";
import {
    FrameInfo
} from 'react-native-reanimated';
import { Attachment } from "../objects/Attachment";

export class Script extends Attachment {
    Start(): void {}
    Update(frameInfo: FrameInfo): void {}
    GameObjectRenderOverride?(): JSX.Element;
}