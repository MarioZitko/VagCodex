import { create } from "zustand";
import type {
	CapturedImage,
	DecodeResult,
	DecoderStatus,
	AppError,
} from "@/types";

interface AppState {
	status: DecoderStatus;
	capturedImage: CapturedImage | null;
	decodeResult: DecodeResult | null;
	error: AppError | null;

	// Actions
	setStatus: (status: DecoderStatus) => void;
	setCapturedImage: (image: CapturedImage | null) => void;
	setDecodeResult: (result: DecodeResult | null) => void;
	setError: (error: AppError | null) => void;
	reset: () => void;
}

const initialState = {
	status: "idle" as DecoderStatus,
	capturedImage: null,
	decodeResult: null,
	error: null,
};

export const useAppStore = create<AppState>((set) => ({
	...initialState,

	setStatus: (status) => set({ status }),
	setCapturedImage: (capturedImage) => set({ capturedImage }),
	setDecodeResult: (decodeResult) => set({ decodeResult }),
	setError: (error) => set({ error }),
	reset: () => set(initialState),
}));
