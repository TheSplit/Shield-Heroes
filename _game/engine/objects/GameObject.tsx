import { IGameObject } from "@/_game/engine/objects/IGameObject";
import { JSX } from "react";

class GameObject implements IGameObject {
    Initiate(): JSX.Element {
        throw new Error("Method not implemented.");
    }

}