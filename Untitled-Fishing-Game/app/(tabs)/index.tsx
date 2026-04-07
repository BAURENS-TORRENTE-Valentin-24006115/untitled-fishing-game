import FishOverlay from '@/components/catching/fish_overlay';
import FishingCatch from '@/components/catching/fishing_catch';
import GameManager from '@/components/gameManager/GameManager';
import PauseMenu from "@/components/PauseMenu/PauseMenu";
import { HungerBar } from '@/components/hunger-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from "react";
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import fishesData from '../../assets/data/json/fishes.json';
import useAccelerometer from '../../components/move/useAccelerometer';

export default function HomeScreen({}) {
  
  const { x, y, z, magnitude} = useAccelerometer();
  const [message, setMessage] = useState<string>("en attente");
  const [showCatch, setShowCatch] = useState<boolean>(false);
  const isWaiting = useRef<boolean>(false);
  const waitingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hunger, setHunger] = useState(20);
  const [tickSpeed, SetTickSpeed] = useState(3000);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [caughtFish, setCaughtFish] = useState<any>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const clearWaitingTimer = () => {
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }
  };

  const buttonPause = () => setIsPause(true)

  const fish_rod_paths = [
    require('@/assets/fishing_rod/canne_a_peche_sized.png'),
    require('@/assets/fishing_rod/canne_a_peche_chargement_sized.png'),
    require('@/assets/fishing_rod/canne_a_peche_lancer_sized.png')
  ];
  const [fishRodId, setFishRodId] = useState(0);

  const timerToTime = (timer: number) => {
    const mins = Math.floor(timer/60);
    const secs = timer % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Gestion du mouvement
  useEffect(() => {
    if(isGameOver || isPause) {
      return;
    }
    if (magnitude >= 4 && !isWaiting.current && !showCatch) {
      isWaiting.current = true;
      setMessage('la ligne est lancée');
      setFishRodId(1);

      const randomDelay = Math.floor(Math.random() * 3000) + 1000;
      clearWaitingTimer();
      waitingTimeoutRef.current = setTimeout(() => {
        setMessage('un poisson mord !');
        setFishRodId(2);
        setShowCatch(true);
        waitingTimeoutRef.current = null;
      }, randomDelay);
    }
  }, [magnitude, isGameOver, isPause, showCatch]);

  // Nettoie le timer de peche si la partie est arretee/mise en pause
  useEffect(() => {
    if (isGameOver || isPause) {
      clearWaitingTimer();
    }
  }, [isGameOver, isPause]);

  // Cleanup global au demontage
  useEffect(() => {
    return () => clearWaitingTimer();
  }, []);

        
  // Pour la faim et la vitesse de tick
  useEffect(() => {
    if (isGameOver || isPause) {
      return;
    }
    const interval = setInterval(() => {
      setHunger(prev =>{
        const nextHunger = prev - 1;
        if(nextHunger <= 0){
          setIsGameOver(true);
          return 0;
        }
        return nextHunger;
      });

      SetTickSpeed(prev => prev <= 750 ? 750 : prev - 75);
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [tickSpeed, isGameOver, isPause]);

  // Pour le score
  useEffect(() => {
    if (isGameOver || isPause) {
      return;
    }
    const interval = setInterval(() => {
      setScore(prev => prev + 10);
    }, 100);

    return () => clearInterval(interval);
  }, [isGameOver, isPause]);

  // Pour le timer
  useEffect(() => {
    if (isGameOver || isPause) {
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver, isPause]);

  const handleCatchResult = (result: 'success' | 'fail') => {
    setShowCatch(false);
    if (result === 'success') {
      const listePoisson = fishesData.poissons;
      const poissonAleatoire = listePoisson[Math.floor(Math.random() * listePoisson.length)]
      setCaughtFish(poissonAleatoire);
      setMessage('Poisson attrape !');
      setFishRodId(0);
    } else {
      setMessage('Rate... retour a l\'attente');
      isWaiting.current = false;
      setFishRodId(0);
    }
  };

  const resetGame = () => {
    clearWaitingTimer();
    setShowCatch(false);
    setCaughtFish(null);
    setHunger(20);
    setScore(0);
    setTimer(0);
    setIsGameOver(false);
    setIsPause(false);
    SetTickSpeed(3000);
    setFishRodId(0);
    isWaiting.current = false;
    setMessage("en attente");
  }

  return (
    <>
      <Image
        style={styles.backgroundImage}
        source={require('@/assets/background/main_background-sized.png')}
        contentFit="cover"
      />
      
      <Image
          style={styles.fishingRodImage}
          source={fish_rod_paths[fishRodId]}
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

        <View>
          <TouchableOpacity style={styles.pauseButton} onPress={buttonPause}>
            <Image
                style={styles.pauseIcon}
                source={require('@/assets/bouton/pause.png')}
                contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        
        <HungerBar hunger={hunger} />
      </View>

      {showCatch && (
        <FishingCatch
          duration={Math.random() * 1500 + 750}
          targetRadius={40}
          startRadius={Math.random() * 40 + 90}
          tolerance={14}
          onResult={handleCatchResult}
        />
      )}
      {caughtFish &&(
        <FishOverlay 
          fish={caughtFish}
          onClose={() => {
            setScore(prev => prev + caughtFish.scoreFish)
            setHunger(prev => Math.min(prev + caughtFish.valeur_nutritive, 20));
            setCaughtFish(null);
            isWaiting.current = false;
          }} 
        />
      )}
      {isGameOver && (
        <GameManager
          score={score}
          timer={timerToTime(timer)}
          onRestart={resetGame}
        />
      )}
      {isPause && (
          <PauseMenu
              onResume={() => setIsPause(false)} />
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
  fishingRodImage: {
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
  pauseButton: {
    position: 'absolute',
    top: -150,
    right: 20,
    zIndex: 100,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseIcon: {
    width: 28,
    height: 28,
  },
});
