import { create } from 'zustand';
import type { DecodeResult } from '@/types';

interface DecodeState {
  pendingCodes: string[];
  decodeResult: DecodeResult | null;
  isDecoding: boolean;
  isOcrProcessing: boolean;
  capturedImageUri: string | null;

  setPendingCodes: (codes: string[]) => void;
  setDecodeResult: (result: DecodeResult | null) => void;
  setIsDecoding: (loading: boolean) => void;
  setIsOcrProcessing: (processing: boolean) => void;
  setCapturedImageUri: (uri: string | null) => void;
  reset: () => void;
}

export const useDecodeStore = create<DecodeState>((set) => ({
  pendingCodes: [],
  decodeResult: null,
  isDecoding: false,
  isOcrProcessing: false,
  capturedImageUri: null,

  setPendingCodes: (pendingCodes) => set({ pendingCodes }),
  setDecodeResult: (decodeResult) => set({ decodeResult }),
  setIsDecoding: (isDecoding) => set({ isDecoding }),
  setIsOcrProcessing: (isOcrProcessing) => set({ isOcrProcessing }),
  setCapturedImageUri: (capturedImageUri) => set({ capturedImageUri }),
  reset: () =>
    set({
      pendingCodes: [],
      decodeResult: null,
      isDecoding: false,
      isOcrProcessing: false,
      capturedImageUri: null,
    }),
}));
