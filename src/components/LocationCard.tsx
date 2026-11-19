import { StyleSheet, Text } from 'react-native';
import InfoCard from './InfoCard';
import { Coordinates } from '../hooks/useLocation';
import { colors } from '../theme/colors';

type Props = { coords: Coordinates | null; error: string | null };

export default function LocationCard({ coords, error }: Props) {
  return (
    <InfoCard title="Localização">
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : coords ? (
        <>
          <Text style={styles.line}>Latitude: <Text style={styles.value}>{coords.latitude.toFixed(6)}</Text></Text>
          <Text style={styles.line}>Longitude: <Text style={styles.value}>{coords.longitude.toFixed(6)}</Text></Text>
          {coords.accuracy !== null && (
            <Text style={styles.hint}>Precisão: ±{coords.accuracy.toFixed(0)} m</Text>
          )}
        </>
      ) : (
        <Text style={styles.hint}>Toque em "Obter localização" para ver as coordenadas.</Text>
      )}
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  line: { fontSize: 16, color: colors.muted, marginBottom: 4 },
  value: { color: colors.text, fontWeight: '700' },
  hint: { fontSize: 13, color: colors.muted },
  error: { fontSize: 14, color: colors.danger },
});
