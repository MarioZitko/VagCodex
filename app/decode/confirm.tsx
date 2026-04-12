import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDecodeStore } from '@/store/decodeStore';
import { PRCodeChip } from '@/components/PRCodeChip';
import { loadDatabase } from '@/services/database';
import { decodePRCodes } from '@/services/decoder';
import { extractPRCodesFromText } from '@/utils/prCodeParser';
import { extractPRCodesFromImage } from '@/services/ocr';
import { colors } from '@/utils/theme';

export default function ConfirmScreen() {
  const {
    pendingCodes,
    setPendingCodes,
    setDecodeResult,
    isDecoding,
    setIsDecoding,
    isOcrProcessing,
    setIsOcrProcessing,
    capturedImageUri,
  } = useDecodeStore();

  const [addInput, setAddInput] = useState('');
  const [decodeError, setDecodeError] = useState<string | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const ocrRanRef = useRef(false);

  // Run OCR once when screen mounts with a captured image
  useEffect(() => {
    if (!capturedImageUri || Platform.OS === 'web' || ocrRanRef.current) return;
    ocrRanRef.current = true;

    let cancelled = false;
    setIsOcrProcessing(true);
    setOcrError(null);

    extractPRCodesFromImage(capturedImageUri)
      .then((codes) => {
        if (cancelled) return;
        setPendingCodes(codes);
        setIsOcrProcessing(false);
      })
      .catch(() => {
        if (cancelled) return;
        setOcrError('Could not read codes from image — add them manually below.');
        setIsOcrProcessing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [capturedImageUri, setIsOcrProcessing, setPendingCodes]);

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

  const canDecode = pendingCodes.length > 0 && !isDecoding && !isOcrProcessing;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View
        className="flex-row items-center bg-surface"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} hitSlop={8} className="flex-row items-center gap-1">
          <Ionicons name="chevron-back" size={18} color={colors.accent} />
          <Text style={{ color: colors.accent, fontSize: 15 }}>Back</Text>
        </TouchableOpacity>
        <Text
          className="flex-1 text-center"
          style={{ fontWeight: '600', color: colors.textPrimary, fontSize: 16 }}
        >
          Review Codes
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ height: 20 }} />

        {/* Subtitle */}
        <Text style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 20 }}>
          Review the codes detected. Remove any false positives before decoding.
        </Text>

        {/* Captured image preview */}
        {capturedImageUri && (
          <View
            className="bg-surface rounded-xl overflow-hidden"
            style={{ borderWidth: 1, borderColor: colors.border, marginBottom: 16 }}
          >
            <Image
              source={{ uri: capturedImageUri }}
              style={{ width: '100%', height: 160 }}
              resizeMode="cover"
            />
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                backgroundColor: colors.accentLight,
                borderTopWidth: 1,
                borderTopColor: colors.border,
              }}
            >
              {isOcrProcessing ? (
                <View className="flex-row items-center justify-center gap-2">
                  <ActivityIndicator size="small" color={colors.accent} />
                  <Text style={{ color: colors.accent, fontSize: 12 }}>Scanning for PR codes...</Text>
                </View>
              ) : (
                <Text style={{ color: colors.accent, fontSize: 12, textAlign: 'center' }}>
                  {pendingCodes.length > 0
                    ? `${pendingCodes.length} code${pendingCodes.length !== 1 ? 's' : ''} detected — review and remove any false positives`
                    : 'No codes detected — add them manually below'}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* OCR error */}
        {ocrError && (
          <View
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFF8F7',
              borderWidth: 1,
              borderColor: '#F5C6C2',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: colors.danger, fontSize: 13, textAlign: 'center' }}>
              {ocrError}
            </Text>
          </View>
        )}

        {/* Code chips */}
        <View
          className="bg-surface rounded-xl p-4"
          style={{ borderWidth: 1, borderColor: colors.border }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 12,
            }}
          >
            {isOcrProcessing
              ? 'Scanning...'
              : `${pendingCodes.length} code${pendingCodes.length !== 1 ? 's' : ''} to decode`}
          </Text>

          {isOcrProcessing ? (
            <View className="items-center" style={{ paddingVertical: 24 }}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 12 }}>
                Reading sticker...
              </Text>
            </View>
          ) : pendingCodes.length === 0 ? (
            <Text style={{ color: colors.textMuted, textAlign: 'center', paddingVertical: 16, fontSize: 14 }}>
              No codes yet — add some below
            </Text>
          ) : (
            <View className="flex-row flex-wrap" style={{ gap: 0 }}>
              {pendingCodes.map((code) => (
                <PRCodeChip key={code} code={code} onDelete={() => removeCode(code)} />
              ))}
            </View>
          )}
        </View>

        {/* Add more */}
        <View
          className="bg-surface rounded-xl p-4"
          style={{ borderWidth: 1, borderColor: colors.border, marginTop: 12 }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 10,
            }}
          >
            Add codes
          </Text>
          <View className="flex-row gap-2">
            <TextInput
              className="flex-1"
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 48,
                fontSize: 15,
                color: colors.textPrimary,
                backgroundColor: colors.background,
              }}
              placeholder="e.g. 5G0 3S2"
              placeholderTextColor={colors.textMuted}
              value={addInput}
              onChangeText={setAddInput}
              autoCapitalize="characters"
              autoCorrect={false}
              onSubmitEditing={addCodes}
              returnKeyType="done"
            />
            <TouchableOpacity
              className="bg-accent-light rounded-xl items-center justify-center"
              style={{
                paddingHorizontal: 16,
                height: 48,
                borderWidth: 1,
                borderColor: colors.accent,
              }}
              onPress={addCodes}
            >
              <Text style={{ color: colors.accent, fontWeight: '600', fontSize: 14 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Decode error */}
        {decodeError && (
          <View
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFF8F7',
              borderWidth: 1,
              borderColor: '#F5C6C2',
              marginTop: 12,
            }}
          >
            <Text style={{ color: colors.danger, fontSize: 13, textAlign: 'center' }}>
              {decodeError}
            </Text>
          </View>
        )}

        {/* Decode button */}
        <TouchableOpacity
          className="bg-accent rounded-xl items-center justify-center"
          style={{ height: 56, marginTop: 24, opacity: canDecode ? 1 : 0.35 }}
          onPress={handleDecode}
          disabled={!canDecode}
          activeOpacity={0.8}
        >
          {isDecoding ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>Decode</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
