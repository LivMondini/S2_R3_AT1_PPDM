import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import { CameraProps } from "../navigation/types";
import { colors } from "../theme/colors";

export default function CameraScreen({ navigation }: CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [busy, setBusy] = useState(false);
  const insets = useSafeAreaInsets();

  // carregar as permissoes
  if (!permission) return <View style={styles.container} />;

  // pedir pro user
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          Precisamos da permissão para usar a câmera.
        </Text>
        <AppButton
          title="Permitir câmera"
          icon="photo-camera"
          onPress={requestPermission}
        />
        <View style={styles.spacer} />
        <AppButton
          title="Voltar"
          icon="arrow-back"
          onPress={() => navigation.goBack()}
          variant="accent"
        />
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || busy) return;
    setBusy(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      // a foto vai voltar
      if (photo?.uri) navigation.popTo("Home", { photoUri: photo.uri });
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <View style={[styles.controls, { paddingBottom: 16 + insets.bottom }]}>
        <View style={styles.controlItem}>
          <AppButton
            title="Cancelar"
            icon="close"
            onPress={() => navigation.goBack()}
            variant="accent"
          />
        </View>
        <View style={styles.controlItem}>
          <AppButton
            title="Capturar"
            icon="camera"
            onPress={takePicture}
            loading={busy}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  controls: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "#000",
  },
  controlItem: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 16,
  },
  spacer: { height: 12 },
});
