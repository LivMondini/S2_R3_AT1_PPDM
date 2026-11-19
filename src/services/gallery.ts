import { Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";

export async function saveToGallery(uri: string): Promise<boolean> {
  try {
    if (Platform.OS === "web") {
      const link = document.createElement("a");
      link.href = uri;
      link.download = `foto-viagem-${Date.now()}.jpg`;
      link.click();
      return true;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== "granted") return false;
    await MediaLibrary.saveToLibraryAsync(uri);
    return true;
  } catch {
    return false;
  }
}
