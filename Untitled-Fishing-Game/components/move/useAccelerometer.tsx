import {useState, useEffect, useRef} from "react";
import {Accelerometer} from "expo-sensors";
import {vibrateDevice} from '../vibration/vibration'


export default function useAccelerometer() {
  const [{x, y, z}, setData] = useState({x:0, y:0, z:0});
  const [magnitude, setMagnitude] = useState<number>(0);

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return ()=> subscription.remove();
  }, []);

  useEffect(() => {
    const NewMagnitude = Math.sqrt(x**2 + y**2 + z**2);
    setMagnitude(NewMagnitude)
    if (NewMagnitude >= 3){
      vibrateDevice();
    }
    }, [x,y,z]);

  return { x, y, z, magnitude};
}
