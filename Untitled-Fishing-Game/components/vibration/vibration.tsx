import {Vibration} from 'react-native';

export function vibrateDevice(intensity : number|number[], ) {
  Vibration.vibrate(intensity);
}