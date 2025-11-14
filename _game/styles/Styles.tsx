import { useEffect, useState } from "react";
import { ViewStyle } from "react-native";

export type GameObjectStyle = ViewStyle & {
    position: "absolute",
    left: number,
    right: number,
    top?: number,
}
export type StyleOverrides = Partial<GameObjectStyle>


export const defaultStyles: GameObjectStyle = {
    position: "absolute" as const,
    left: 0,
    right: 0,
    top: 0,
}

export const mergeStyles = (
    baseStyle: GameObjectStyle,
    overrides?: StyleOverrides
): GameObjectStyle => {
    if (!overrides) return baseStyle
    return {
        ...baseStyle,
        ...overrides,
    }
}


export const createGameObjectStyle = (
    overrides?: StyleOverrides
): GameObjectStyle => {
    return mergeStyles(defaultStyles, overrides)
}


export function getDimensions() {

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
    width: window.innerWidth,
    height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
}