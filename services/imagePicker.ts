import * as ImagePicker from 'expo-image-picker';
import type { CapturedImage } from '@/types';

export async function captureFromCamera(): Promise<CapturedImage | null> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') return null;

  const result = await ImagePicker.launchCameraAsync({ quality: 0.9 });
  if (result.canceled) return null;

  const { uri, width, height, mimeType } = result.assets[0];
  return { uri, width, height, mimeType };
}

export async function pickFromLibrary(): Promise<CapturedImage | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') return null;

  const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.9 });
  if (result.canceled) return null;

  const { uri, width, height, mimeType } = result.assets[0];
  return { uri, width, height, mimeType };
}
