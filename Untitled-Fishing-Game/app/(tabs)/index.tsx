import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useAccelerometer from '../../components/move/useAccelerometer';
import { useEffect, useRef, useState } from 'react';
import FishingCatch from '@/components/catching/fishing_catch';

export default function HomeScreen() {
  const { x, y, z, magnitude } = useAccelerometer();
  const [message, setMessage] = useState<string>('en attente');
  const [showCatch, setShowCatch] = useState<boolean>(false);
  const isWaiting = useRef<boolean>(false);

  useEffect(() => {
    if (magnitude >= 4 && !isWaiting.current && !showCatch) {
      isWaiting.current = true;
      setMessage('la ligne est lancée');
      setShowCatch(true);
    }
  }, [magnitude]);

  const handleCatchResult = (result: 'success' | 'fail') => {
    setShowCatch(false);
    isWaiting.current = false;

    if (result === 'success') {
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
        </View>
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
