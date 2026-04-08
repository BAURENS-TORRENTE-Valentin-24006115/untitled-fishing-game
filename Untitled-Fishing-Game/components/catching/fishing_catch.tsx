import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

export type CatchResult = 'success' | 'fail';

interface FishingCatchProps {
  duration?: number;
  targetRadius?: number;
  startRadius?: number;
  tolerance?: number;
  onResult: (result: CatchResult) => void;
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const CENTER_X = SCREEN_W / 2;
const CENTER_Y = SCREEN_H / 2;

export default function FishingCatch({
  duration = 3000,
  targetRadius = 40,
  startRadius = 130,
  tolerance = 12,
  onResult,
}: FishingCatchProps) {
  const animValue = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const isDone = useRef(false);
  const [hint, setHint] = useState<string>('Attendez le bon moment…');

  const currentRadius = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startRadius, targetRadius],
  });

  const [feedbackColor, setFeedbackColor] = useState<string>('transparent');

  useEffect(() => {
    animRef.current = Animated.timing(animValue, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    });

    animRef.current.start(({ finished }) => {
      if (finished && !isDone.current) {
        triggerResult('fail');
      }
    });

    return () => {
      animRef.current?.stop();
    };
  }, []);

  const handlePress = useCallback(() => {
    if (isDone.current) return;

    const raw = (animValue as any)._value as number;
    const radius = startRadius - raw * (startRadius - targetRadius);

    const diff = Math.abs(radius - targetRadius);
    const result: CatchResult = diff <= tolerance ? 'success' : 'fail';

    triggerResult(result);
  }, [animValue, startRadius, targetRadius, tolerance]);

  const triggerResult = (result: CatchResult) => {
    if (isDone.current) return;
    isDone.current = true;
    animRef.current?.stop();

    if (result === 'success') {
      setFeedbackColor('#1D9E75');
      setHint('Poisson attrapé !');
    } else {
      setFeedbackColor('#D85A30');
      setHint('Raté… Le poisson s\'est enfui.');
    }

    setTimeout(() => onResult(result), 800);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.overlay}>

        <View
          style={[
            styles.fixedCircle,
            {
              width: targetRadius * 2,
              height: targetRadius * 2,
              borderRadius: targetRadius,
              borderColor: feedbackColor !== 'transparent' ? feedbackColor : '#ffffff',
            },
          ]}
        />

        <Animated.View
          style={[
            styles.movingCircle,
            {
              width: Animated.multiply(currentRadius, 2),
              height: Animated.multiply(currentRadius, 2),
              borderRadius: currentRadius,
              borderColor: feedbackColor !== 'transparent' ? feedbackColor : '#A8D8FF',
              marginLeft: Animated.multiply(currentRadius, -1),
              marginTop: Animated.multiply(currentRadius, -1),
            },
          ]}
        />

        <Text style={[styles.hint, feedbackColor !== 'transparent' && { color: feedbackColor }]}>
          {hint}
        </Text>

        {feedbackColor === 'transparent' && (
          <Text style={styles.tapInstruction}>Appuyez n'importe où !</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: 'rgba(0, 15, 30, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fixedCircle: {
    position: 'absolute',
    top: CENTER_Y,
    left: CENTER_X,
    marginLeft: -40,
    marginTop: -40,
    borderWidth: 2.5,
    backgroundColor: 'transparent',
  },

  movingCircle: {
    position: 'absolute',
    top: CENTER_Y,
    left: CENTER_X,
    borderWidth: 2,
    backgroundColor: 'transparent',
    opacity: 0.85,
  },

  hint: {
    position: 'absolute',
    bottom: CENTER_Y - 180,
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  tapInstruction: {
    position: 'absolute',
    bottom: CENTER_Y - 220,
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
});