import { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import useAccelerometer from '@/components/move/useAccelerometer';

interface StartScreenProps {
  onStartGame: () => void;
}

export default function StartScreen({ onStartGame }: StartScreenProps) {
  const magnitude = useAccelerometer()["magnitude"];
  const [hasShaken, setHasShaken] = useState(false);
  const fadeAnim = new Animated.Value(1);

  // Gestion du secouement du téléphone pour commencer
  useEffect(() => {
    if (magnitude >= 2.5 && !hasShaken) {
      setHasShaken(true);
      // Animation de disparition
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onStartGame();
      });
    }
  }, [magnitude, hasShaken, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.overlay}>
        <ThemedText style={styles.text}>Secouez votre telephone pour pecher !</ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    paddingHorizontal: 30,
    letterSpacing: 1,
  },
});

