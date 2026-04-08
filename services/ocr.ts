/**
 * OCR service — Phase 3
 *
 * Requires @react-native-ml-kit/text-recognition (custom dev build, NOT Expo Go).
 * Web is explicitly unsupported — gate all call sites with Platform.OS !== 'web'.
 */

import { Platform } from 'react-native';

export async function extractPRCodesFromImage(imageUri: string): Promise<string[]> {
  if (Platform.OS === 'web') {
    throw new Error('OCR is not supported on web');
  }

  // TODO Phase 3: install @react-native-ml-kit/text-recognition, then:
  // const result = await TextRecognition.recognize(imageUri);
  // return extractPRCodesFromText(result.text);
  void imageUri;
  throw new Error('OCR not yet implemented — coming in Phase 3');
}
