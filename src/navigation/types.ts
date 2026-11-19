import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: { photoUri?: string } | undefined;
  Camera: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type CameraProps = NativeStackScreenProps<RootStackParamList, "Camera">;
