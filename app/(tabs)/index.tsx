import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { useState } from 'react';
import { extractPRCodesFromText } from '@/utils/prCodeParser';
import { useDecodeStore } from '@/store/decodeStore';
import { ScanButton } from '@/components/ScanButton';

export default function HomeScreen() {
  const [inputText, setInputText] = useState('');
  const setPendingCodes = useDecodeStore((s) => s.setPendingCodes);

  const handleContinue = () => {
    const codes = extractPRCodesFromText(inputText);
    setPendingCodes(codes);
    router.push('/decode/confirm' as Href);
  };

  const hasInput = inputText.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="pt-4 pb-6">
          <Text className="text-3xl font-bold text-gray-900">VagCodex</Text>
          <Text className="text-gray-400 mt-1">Decode VAG factory equipment</Text>
        </View>

        {/* Manual entry */}
        <View className="bg-white rounded-2xl p-4 border border-gray-100">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Paste PR codes
          </Text>
          <TextInput
            className="border border-gray-200 rounded-xl px-3 py-3 text-gray-900 text-base"
            placeholder="e.g. 0E2 1LQ 7UG GY3 3S2"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="characters"
            autoCorrect={false}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
          <Text className="text-xs text-gray-400 mt-2">
            3-character codes from the sticker inside your boot lid
          </Text>
        </View>

        {/* Mobile scan options */}
        {Platform.OS !== 'web' && (
          <>
            <View className="flex-row items-center my-5">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-3 text-gray-400 text-sm">or scan sticker</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>
            <ScanButton />
          </>
        )}

        {/* Continue button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-2xl p-4 mt-6 items-center"
          onPress={handleContinue}
          disabled={!hasInput}
          activeOpacity={0.8}
          style={{ opacity: hasInput ? 1 : 0.4 }}
        >
          <Text className="text-white font-semibold text-base">
            Review codes →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
