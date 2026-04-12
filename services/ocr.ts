/**
 * OCR service — Phase 3
 *
 * Uses @react-native-ml-kit/text-recognition (ML Kit on Android, Apple Vision on iOS).
 * Requires a custom dev build — NOT compatible with Expo Go.
 * Web is explicitly unsupported — gate all call sites with Platform.OS !== 'web'.
 */

import { Platform } from 'react-native';
import { extractPRCodesFromText } from '@/utils/prCodeParser';

export async function extractPRCodesFromImage(imageUri: string): Promise<string[]> {
  if (Platform.OS === 'web') {
    throw new Error('OCR is not supported on web');
  }

  // Dynamic require prevents the native module from being bundled on web
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const TextRecognition = require('@react-native-ml-kit/text-recognition').default;
  const result = await TextRecognition.recognize(imageUri);
  return extractPRCodesFromText(result.text);
}
