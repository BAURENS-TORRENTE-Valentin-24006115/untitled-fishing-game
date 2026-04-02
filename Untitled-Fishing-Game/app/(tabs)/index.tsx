import FishOverlay from '@/components/catching/fish_overlay';
import FishingCatch from '@/components/catching/fishing_catch';
import { HungerBar } from '@/components/hunger-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from 'react-native';
import fishesData from '../../assets/data/json/fishes.json';
import useAccelerometer from '../../components/move/useAccelerometer';

export default function HomeScreen({}) {
  
  const { x, y, z, magnitude} = useAccelerometer();
  const [message, setMessage] = useState<string>("en attente");
  const [showCatch, setShowCatch] = useState<boolean>(false);
  const isWaiting = useRef<boolean>(false);
  const [hunger, setHunger] = useState(20);
  const [tickSpeed, SetTickSpeed] = useState(3000);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [caughtFish, setCaughtFish] = useState<any>(null);

  const timerToTime = (timer: number) => {
    const mins = Math.floor(timer/60);
    const secs = timer % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Gestion du mouvement
  useEffect(() => {
    if (magnitude >= 4 && !isWaiting.current && !showCatch) {
      isWaiting.current = true;
      setMessage('la ligne est lancée');
      setShowCatch(true);
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

  const handleCatchResult = (result: 'success' | 'fail') => {
    setShowCatch(false);
    if (result === 'success') {
      const listePoisson = fishesData.poissons;
      const poissonAleatoire = listePoisson[Math.floor(Math.random() * listePoisson.length)]
      setCaughtFish(poissonAleatoire);
      setMessage('Poisson attrapé !');
    } else {
      setMessage('Raté... retour à l\'attente');
    }
  };

  return (
    <>
      <Image
        style={styles.backgroundImage}
        source={require('@/assets/background/main_background-sized.png')}
        contentFit="cover"
      />

      <View style={styles.page}>
        <ThemedView style={styles.titleContainer} />
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
        
        <HungerBar hunger={hunger} />
      </View>

      {showCatch && (
        <FishingCatch
          duration={2500}
          targetRadius={40}
          startRadius={130}
          tolerance={14}
          onResult={handleCatchResult}
        />
      )}
      {caughtFish &&(
        <FishOverlay 
          fish={caughtFish}
          onClose={() => {
            setCaughtFish(null);
            isWaiting.current = false;
          }} 
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  page: {
    flex: 1,
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
  tinyLogo: {
    width: 430,
    height: 750,
  },
});
