import { Image } from "expo-image"
import { JSX } from "react"

export function Background(): JSX.Element {
    return (
        <Image
        source={require('@/_game/objects/background/background.png')}
        style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -10}}
        contentFit="cover">
      </Image>
    )
} 