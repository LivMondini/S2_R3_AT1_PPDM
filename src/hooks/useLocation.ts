import { useCallback, useState } from "react";
import * as Location from "expo-location";

export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export function useLocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permissão de localização negada. Ative nas configurações.");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    } catch {
      setError(
        "Não foi possível obter a localização. Verifique se o GPS está ligado.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { coords, loading, error, getLocation };
}
