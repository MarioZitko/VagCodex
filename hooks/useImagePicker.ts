import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { captureFromCamera, pickFromLibrary } from '@/services/imagePicker';
import { useDecodeStore } from '@/store/decodeStore';

export function useImagePicker() {
  const { setPendingCodes, setCapturedImageUri } = useDecodeStore();

  const handleCaptured = (uri: string | null) => {
    if (!uri) return;
    setCapturedImageUri(uri);
    setPendingCodes([]);
    router.push('/decode/confirm' as Href);
  };

  return {
    captureFromCamera: async () => {
      const image = await captureFromCamera();
      handleCaptured(image?.uri ?? null);
    },
    pickFromLibrary: async () => {
      const image = await pickFromLibrary();
      handleCaptured(image?.uri ?? null);
    },
  };
}
