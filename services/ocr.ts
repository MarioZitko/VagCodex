/**
 * OCR service
 *
 * Will use @react-native-ml-kit/text-recognition (add back to package.json when implementing).
 * Requires a custom dev build — NOT compatible with Expo Go.
 */

import type { OcrResult } from "@/types";

export async function recognizeText(imageUri: string): Promise<OcrResult> {
  throw new Error("Not implemented");
}
