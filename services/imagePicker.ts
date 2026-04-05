/**
 * Image picker service
 *
 * Wraps expo-image-picker for both camera capture and library selection.
 * Implementation will be added in a later iteration.
 */

import type { CapturedImage } from "@/types";

export async function captureFromCamera(): Promise<CapturedImage | null> {
  throw new Error("Not implemented");
}

export async function pickFromLibrary(): Promise<CapturedImage | null> {
  throw new Error("Not implemented");
}
