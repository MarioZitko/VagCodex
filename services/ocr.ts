/**
 * OCR service
 *
 * Uses @react-native-ml-kit/text-recognition.
 * Requires a custom dev build — NOT compatible with Expo Go.
 * Implementation will be added in a later iteration.
 */

import type { OcrResult } from "@/types";

export async function recognizeText(imageUri: string): Promise<OcrResult> {
  throw new Error("Not implemented");
}
