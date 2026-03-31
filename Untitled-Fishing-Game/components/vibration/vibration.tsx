import {Vibration} from 'react-native';

export function vibrateDevice() {
  Vibration.vibrate(500);
}