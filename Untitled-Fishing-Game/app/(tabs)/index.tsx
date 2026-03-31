import { Image } from 'expo-image';
import {StyleSheet, View} from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useAccelerometer from '../../components/move/useAccelerometer'
import {use, useEffect, useRef} from "react";

export default function HomeScreen({}) {
    const { x, y, z, magnitude} = useAccelerometer();

    return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
      </ThemedView>

      <View>
        <ThemedText>X : {x}</ThemedText>
        <ThemedText>Y : {y}</ThemedText>
        <ThemedText>Z : {z}</ThemedText>

      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
