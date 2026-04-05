export const APP_NAME = "VagCodex";

export const IMAGE_PICKER = {
  /** Max image dimension (px) fed into ML Kit to keep memory usage reasonable */
  MAX_DIMENSION: 2048,
  QUALITY: 0.9,
} as const;

export const OCR = {
  /** Minimum confidence score to consider a text block valid (0–1) */
  MIN_CONFIDENCE: 0.6,
} as const;
