import { Image } from 'expo-image';
import {StyleSheet, View} from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useAccelerometer from '../../components/move/useAccelerometer'
import {useEffect, useRef, useState} from "react";
import { HungerBar } from '@/components/hunger-bar';

export default function HomeScreen({}) {
  const { x, y, z, magnitude} = useAccelerometer();
  const [message, setMessage] = useState<string>("en attente");
  const isWaiting = useRef<boolean>(false);
  const [hunger, setHunger] = useState(20);
  const [tickSpeed, SetTickSpeed] = useState(3000);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  const timerToTime = (timer) => {
    const mins = Math.floor(timer/60);
    const secs = timer % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Gestion du mouvement
  useEffect(() => {
    if (magnitude >= 4 && !isWaiting.current){
      isWaiting.current = true;
      setMessage("la ligne est lancer");
      setTimeout(()=> {
        setMessage("en attente");
        isWaiting.current = false;
      }, 3000);
    }
  }, [magnitude]);


  // Pour la faim et la vitesse de tick
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(prev => prev <= 0 ? 20 : prev - 1);
      SetTickSpeed(prev => prev <= 750 ? 750 : prev - 75);
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [tickSpeed]);

  // Pour le score
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => prev + 10);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Pour le timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <View style={styles.screenContainer}>
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
            <ThemedText>{message}</ThemedText>
            <ThemedText>Hunger : {hunger}</ThemedText>
            <ThemedText>Tick Speed : {tickSpeed}</ThemedText>
            <ThemedText>Score : {score}</ThemedText>
            <ThemedText>Timer : {timerToTime(timer)}</ThemedText>
          </View>
        </ParallaxScrollView>
        <HungerBar hunger={hunger} />
      </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
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
