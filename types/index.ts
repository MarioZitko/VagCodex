// ---------------------------------------------------------------------------
// PR Code database
// ---------------------------------------------------------------------------

export interface PRCode {
  code: string;
  description: string;
  category: PRCategory;
  group?: string;
}

export type PRCategory =
  | 'engine'
  | 'transmission'
  | 'exterior'
  | 'wheels'
  | 'interior'
  | 'safety'
  | 'suspension'
  | 'lighting'
  | 'comfort'
  | 'towing'
  | 'other';

// ---------------------------------------------------------------------------
// Decoder
// ---------------------------------------------------------------------------

export interface DecodeResult {
  matched: PRCode[];
  unrecognized: string[];
}

// ---------------------------------------------------------------------------
// Garage
// ---------------------------------------------------------------------------

export interface Vehicle {
  id: string;
  nickname?: string;
  vin?: string;
  prCodes: string[];
  decodedAt: string; // ISO
}

// ---------------------------------------------------------------------------
// Image capture (Phase 2+)
// ---------------------------------------------------------------------------

export interface CapturedImage {
  uri: string;
  width: number;
  height: number;
  mimeType?: string;
}

// ---------------------------------------------------------------------------
// OCR (Phase 3+)
// ---------------------------------------------------------------------------

export interface OcrResult {
  rawText: string;
  blocks: Array<{ text: string }>;
}
