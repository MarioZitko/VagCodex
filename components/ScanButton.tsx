import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useImagePicker } from '@/hooks/useImagePicker';
import { colors } from '@/utils/theme';

export function ScanButton() {
  const { captureFromCamera, pickFromLibrary } = useImagePicker();

  if (Platform.OS === 'web') return null;

  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        className="flex-1 bg-accent rounded-xl flex-row items-center justify-center gap-2"
        style={{ height: 56 }}
        onPress={captureFromCamera}
        activeOpacity={0.8}
      >
        <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
        <Text className="text-white font-semibold text-sm">Scan Sticker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-accent-light rounded-xl flex-row items-center justify-center gap-2"
        style={{ height: 56, borderWidth: 1, borderColor: colors.accent }}
        onPress={pickFromLibrary}
        activeOpacity={0.8}
      >
        <Ionicons name="image-outline" size={20} color={colors.accent} />
        <Text className="text-accent font-semibold text-sm">From Library</Text>
      </TouchableOpacity>
    </View>
  );
}
