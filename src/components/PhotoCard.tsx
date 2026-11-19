import { Image, StyleSheet, Text } from "react-native";
import InfoCard from "./InfoCard";
import { colors } from "../theme/colors";

type Props = { uri: string | null; savedMessage: string | null };

export default function PhotoCard({ uri, savedMessage }: Props) {
  return (
    <InfoCard title="Última foto">
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          {savedMessage && <Text style={styles.message}>{savedMessage}</Text>}
        </>
      ) : (
        <Text style={styles.hint}>Nenhuma foto capturada</Text>
      )}
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  message: { marginTop: 8, fontSize: 13, color: colors.muted },
  hint: { fontSize: 13, color: colors.muted },
});
