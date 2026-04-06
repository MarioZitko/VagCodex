import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useDecodeStore } from '@/store/decodeStore';

export function ScanButton() {
  const setPendingCodes = useDecodeStore((s) => s.setPendingCodes);

  if (Platform.OS === 'web') return null;

  const handleCamera = () => {
    // Phase 3 will add OCR here; for now go straight to confirm
    setPendingCodes([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push('/decode/confirm' as any);
  };

  const handleLibrary = () => {
    // Phase 3 will add OCR here; for now go straight to confirm
    setPendingCodes([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push('/decode/confirm' as any);
  };

  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        className="flex-1 bg-gray-900 rounded-2xl p-4 items-center"
        onPress={handleCamera}
        activeOpacity={0.8}
      >
        <Text className="text-2xl mb-1">📷</Text>
        <Text className="text-white font-semibold text-sm">Scan Sticker</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-gray-700 rounded-2xl p-4 items-center"
        onPress={handleLibrary}
        activeOpacity={0.8}
      >
        <Text className="text-2xl mb-1">🖼️</Text>
        <Text className="text-white font-semibold text-sm">From Library</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
