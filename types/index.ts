// ---------------------------------------------------------------------------
// Image capture
// ---------------------------------------------------------------------------

export interface CapturedImage {
  uri: string;
  width: number;
  height: number;
  /** MIME type, e.g. "image/jpeg" */
  mimeType?: string;
}

// ---------------------------------------------------------------------------
// OCR / text recognition
// ---------------------------------------------------------------------------

export interface RecognizedBlock {
  text: string;
  /** Bounding box corners, if provided by the ML Kit engine */
  boundingBox?: BoundingBox;
}

export interface BoundingBox {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface OcrResult {
  rawText: string;
  blocks: RecognizedBlock[];
}

// ---------------------------------------------------------------------------
// Decoder
// ---------------------------------------------------------------------------

export type DecoderStatus = "idle" | "capturing" | "processing" | "done" | "error";

export interface DecodeResult {
  /** The structured data extracted after decoding */
  payload: Record<string, unknown>;
  rawText: string;
  capturedAt: Date;
}

// ---------------------------------------------------------------------------
// App-wide errors
// ---------------------------------------------------------------------------

export interface AppError {
  code: string;
  message: string;
}
