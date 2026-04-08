import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useImagePicker } from '@/hooks/useImagePicker';

export function ScanButton() {
  const { captureFromCamera, pickFromLibrary } = useImagePicker();

  if (Platform.OS === 'web') return null;

  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        className="flex-1 bg-gray-900 rounded-2xl p-4 items-center"
        onPress={captureFromCamera}
        activeOpacity={0.8}
      >
        <Text className="text-2xl mb-1">📷</Text>
        <Text className="text-white font-semibold text-sm">Scan Sticker</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-gray-700 rounded-2xl p-4 items-center"
        onPress={pickFromLibrary}
        activeOpacity={0.8}
      >
        <Text className="text-2xl mb-1">🖼️</Text>
        <Text className="text-white font-semibold text-sm">From Library</Text>
        <Text className="text-gray-400 text-xs mt-0.5">Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
