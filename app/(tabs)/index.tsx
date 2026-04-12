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
import { colors } from '@/utils/theme';

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
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={{ paddingTop: 24, paddingBottom: 28 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>
            VagCodex
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary, marginTop: 4 }}>
            Decode VAG factory equipment from PR codes
          </Text>
        </View>

        {/* Mobile: scan as primary CTA */}
        {Platform.OS !== 'web' && (
          <>
            <ScanButton />
            <View className="flex-row items-center" style={{ marginVertical: 20 }}>
              <View className="flex-1" style={{ height: 1, backgroundColor: colors.border }} />
              <Text style={{ marginHorizontal: 12, fontSize: 13, color: colors.textMuted }}>
                or enter codes manually
              </Text>
              <View className="flex-1" style={{ height: 1, backgroundColor: colors.border }} />
            </View>
          </>
        )}

        {/* Manual entry */}
        <View
          className="bg-surface rounded-xl p-4"
          style={{ borderWidth: 1, borderColor: colors.border }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 10,
            }}
          >
            PR Codes
          </Text>
          <TextInput
            className="rounded-xl text-primary"
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
              fontSize: 15,
              color: colors.textPrimary,
              backgroundColor: colors.background,
              minHeight: 100,
              textAlignVertical: 'top',
            }}
            placeholder="e.g. 0E2 1LQ 7UG GY3 3S2"
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 8 }}>
            3-character codes from the sticker inside your boot lid
          </Text>
        </View>

        {/* Continue button */}
        <TouchableOpacity
          className="bg-accent rounded-xl items-center justify-center"
          style={{ height: 56, marginTop: 24, opacity: hasInput ? 1 : 0.35 }}
          onPress={handleContinue}
          disabled={!hasInput}
          activeOpacity={0.8}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>
            Review codes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
