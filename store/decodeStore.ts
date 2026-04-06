import { create } from 'zustand';
import type { DecodeResult } from '@/types';

interface DecodeState {
  pendingCodes: string[];
  decodeResult: DecodeResult | null;
  isDecoding: boolean;

  setPendingCodes: (codes: string[]) => void;
  setDecodeResult: (result: DecodeResult | null) => void;
  setIsDecoding: (loading: boolean) => void;
  reset: () => void;
}

export const useDecodeStore = create<DecodeState>((set) => ({
  pendingCodes: [],
  decodeResult: null,
  isDecoding: false,

  setPendingCodes: (pendingCodes) => set({ pendingCodes }),
  setDecodeResult: (decodeResult) => set({ decodeResult }),
  setIsDecoding: (isDecoding) => set({ isDecoding }),
  reset: () => set({ pendingCodes: [], decodeResult: null, isDecoding: false }),
}));
