import { StyleSheet, View, type TextProps } from 'react-native';
import { ThemedViewProps } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

export function Cat() {
  return (<Image source={require('@/_game/cat/cat_atlas')}/>);
}

