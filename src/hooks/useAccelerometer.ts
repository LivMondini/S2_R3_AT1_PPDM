import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Accelerometer } from "expo-sensors";

export type AccelerometerData = { x: number; y: number; z: number };

export function useAccelerometer(intervalMs: number = 200) {
  const [data, setData] = useState<AccelerometerData>({ x: 0, y: 0, z: 0 });
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let active = true;
    let subscription: { remove: () => void } | null = null;

    const start = async () => {
      try {
        const isAvailable = await Accelerometer.isAvailableAsync();
        if (!active) return;
        if (!isAvailable) {
          setAvailable(false);
          return;
        }
        // setUpdateInterval não é suportado na web
        if (Platform.OS !== "web") {
          Accelerometer.setUpdateInterval(intervalMs);
        }
        subscription = Accelerometer.addListener(({ x, y, z }) => {
          setData({ x, y, z });
        });
      } catch {
        if (active) setAvailable(false);
      }
    };

    start();

    return () => {
      active = false;
      subscription?.remove();
    };
  }, [intervalMs]);

  return { data, available };
}
