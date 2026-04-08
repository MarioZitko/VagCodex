import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { useState } from 'react';
import { useDecodeStore } from '@/store/decodeStore';
import { PRCodeChip } from '@/components/PRCodeChip';
import { loadDatabase } from '@/services/database';
import { decodePRCodes } from '@/services/decoder';
import { extractPRCodesFromText } from '@/utils/prCodeParser';

export default function ConfirmScreen() {
  const { pendingCodes, setPendingCodes, setDecodeResult, isDecoding, setIsDecoding, capturedImageUri } =
    useDecodeStore();
  const [addInput, setAddInput] = useState('');
  const [decodeError, setDecodeError] = useState<string | null>(null);

  const removeCode = (code: string) => {
    setPendingCodes(pendingCodes.filter((c) => c !== code));
  };

  const addCodes = () => {
    if (!addInput.trim()) return;
    const newCodes = extractPRCodesFromText(addInput);
    setPendingCodes([...new Set([...pendingCodes, ...newCodes])]);
    setAddInput('');
  };

  const handleDecode = async () => {
    setDecodeError(null);
    setIsDecoding(true);
    try {
      const db = await loadDatabase();
      const result = decodePRCodes(pendingCodes, db);
      setDecodeResult(result);
      router.push('/decode/results' as Href);
    } catch {
      setDecodeError('Failed to load database — please try again.');
    } finally {
      setIsDecoding(false);
    }
  };

  const canDecode = pendingCodes.length > 0 && !isDecoding;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Text className="text-blue-600 text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center font-semibold text-gray-900">
          Review Codes
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Captured image preview */}
        {capturedImageUri && (
          <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-3">
            <Image
              source={{ uri: capturedImageUri }}
              style={{ width: '100%', height: 160 }}
              resizeMode="cover"
            />
            <View className="px-4 py-2.5 bg-blue-50 border-t border-blue-100">
              <Text className="text-blue-700 text-xs text-center">
                Photo captured — add PR codes manually below. Auto-detection coming in Phase 3.
              </Text>
            </View>
          </View>
        )}

        {/* Code chips */}
        <View className="bg-white rounded-2xl p-4 border border-gray-100">
          <Text className="text-sm font-semibold text-gray-700 mb-3">
            {pendingCodes.length} code{pendingCodes.length !== 1 ? 's' : ''} to decode
          </Text>

          {pendingCodes.length === 0 ? (
            <Text className="text-gray-400 text-center py-4 text-sm">
              No codes yet — add some below
            </Text>
          ) : (
            <View className="flex-row flex-wrap">
              {pendingCodes.map((code) => (
                <PRCodeChip key={code} code={code} onDelete={() => removeCode(code)} />
              ))}
            </View>
          )}
        </View>

        {/* Add more */}
        <View className="bg-white rounded-2xl p-4 mt-3 border border-gray-100">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Add more</Text>
          <View className="flex-row gap-2">
            <TextInput
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-base"
              placeholder="e.g. 5G0 3S2"
              placeholderTextColor="#9CA3AF"
              value={addInput}
              onChangeText={setAddInput}
              autoCapitalize="characters"
              autoCorrect={false}
              onSubmitEditing={addCodes}
              returnKeyType="done"
            />
            <TouchableOpacity
              className="bg-blue-50 border border-blue-200 px-4 rounded-xl items-center justify-center"
              onPress={addCodes}
            >
              <Text className="text-blue-600 font-semibold">Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Error message */}
        {decodeError && (
          <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-3">
            <Text className="text-red-700 text-sm text-center">{decodeError}</Text>
          </View>
        )}

        {/* Decode button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-2xl p-4 mt-6 items-center"
          onPress={handleDecode}
          disabled={!canDecode}
          activeOpacity={0.8}
          style={{ opacity: canDecode ? 1 : 0.4 }}
        >
          {isDecoding ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-base">Decode</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
