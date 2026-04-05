/**
 * Decoder service
 *
 * Transforms raw OCR text into structured data.
 * Implementation will be added in a later iteration.
 */

import type { DecodeResult, OcrResult } from "@/types";

export async function decode(ocrResult: OcrResult): Promise<DecodeResult> {
  throw new Error("Not implemented");
}
