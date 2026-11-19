import { StyleSheet, Text, View } from "react-native";
import InfoCard from "./InfoCard";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { colors } from "../theme/colors";

export default function AccelerometerCard() {
  const { data, available } = useAccelerometer(200);

  return (
    <InfoCard title="Acelerômetro (tempo real)">
      {available ? (
        <View style={styles.row}>
          <Axis label="X" value={data.x} />
          <Axis label="Y" value={data.y} />
          <Axis label="Z" value={data.z} />
        </View>
      ) : (
        <Text style={styles.hint}>
          Acelerômetro indisponível neste dispositivo. Teste em um celular.
        </Text>
      )}
    </InfoCard>
  );
}

function Axis({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.axis}>
      <Text style={styles.axisLabel}>{label}</Text>
      <Text style={styles.axisValue}>{value.toFixed(3)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  axis: { flex: 1, alignItems: "center" },
  axisLabel: { fontSize: 13, color: colors.muted, fontWeight: "600" },
  axisValue: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "700",
    marginTop: 4,
  },
  hint: { fontSize: 13, color: colors.muted },
});
