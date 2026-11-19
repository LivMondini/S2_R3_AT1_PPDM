import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import AccelerometerCard from "../components/AccelerometerCard";
import LocationCard from "../components/LocationCard";
import PhotoCard from "../components/PhotoCard";
import { useLocation } from "../hooks/useLocation";
import { saveToGallery } from "../services/gallery";
import { HomeProps } from "../navigation/types";
import { colors } from "../theme/colors";

export default function HomeScreen({ navigation, route }: HomeProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const { coords, loading, error, getLocation } = useLocation();

// para salvar na galeria 
  useEffect(() => {
    const uri = route.params?.photoUri;
    if (!uri) return;

    setPhotoUri(uri);
    setSavedMessage("Salvando na galeria...");
    saveToGallery(uri).then((saved) =>
      setSavedMessage(
        saved
          ? "Foto salva na galeria do dispositivo."
          : "Não foi possível salvar na galeria (permissão negada).",
      ),
    );
  }, [route.params?.photoUri]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.appName}>Diário de Viagem</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.content}>
        <View style={styles.buttons}>
          <AppButton
            title="Tirar foto"
            icon="photo-camera"
            onPress={() => navigation.navigate("Camera")}
          />
          <AppButton
            title="Obter localização"
            icon="my-location"
            onPress={getLocation}
            loading={loading}
            variant="accent"
          />
        </View>

        <PhotoCard uri={photoUri} savedMessage={savedMessage} />
        <LocationCard coords={coords} error={error} />
        <AccelerometerCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  appName: { fontSize: 28, fontWeight: "800", color: "#fff" },
  body: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 16 },
  buttons: { gap: 12 },
});
