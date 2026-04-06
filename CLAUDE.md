# VagCodex — Claude Code Context

## Project
Free cross-platform app (Android, iOS, Web) to decode VAG vehicle factory equipment from PR codes on the boot sticker. Brands: VW, Audi, Škoda, Seat, Cupra, Porsche. Monetization: affiliate links only (CarVertical + Autodoc).

## Stack
| Layer | Tech | Version |
|---|---|---|
| Framework | Expo managed | SDK 55 |
| RN | React Native | 0.83 |
| Language | TypeScript | 5.x |
| Navigation | Expo Router | v4 |
| State | Zustand | 5.x |
| Styling | NativeWind | v4 (Tailwind v3) |
| OCR | @react-native-ml-kit/text-recognition | Phase 3, not yet installed |
| Camera | expo-image-picker | latest |

## Critical Constraints
- **No Expo Go** — ML Kit requires custom dev build. Always `npx expo run:ios` / `npx expo run:android`
- **New Architecture ON** — `newArchEnabled: true`. All libs must support it
- **No backend** — everything on-device
- **Web = manual entry only** — no OCR on web, gate with `Platform.OS`
- **Node.js 20+** — Node 18 is EOL

## Project Structure
```
vagcodex/
├── app/
│   ├── (tabs)/_layout.tsx      # Tab navigator (Decode / Garage / About)
│   ├── (tabs)/index.tsx        # Home/Scan
│   ├── (tabs)/garage.tsx       # Saved vehicles
│   ├── (tabs)/about.tsx        # About + affiliates
│   ├── decode/confirm.tsx      # Review PR codes before decode
│   ├── decode/results.tsx      # Decoded results + affiliate CTAs
│   └── _layout.tsx             # Root Stack layout — imports global.css
├── components/
│   ├── PRCodeChip.tsx          # Deletable chip
│   ├── EquipmentCard.tsx       # Single decoded item
│   ├── CategorySection.tsx     # Collapsible category group
│   └── ScanButton.tsx          # Photo capture trigger (mobile only)
├── services/
│   ├── ocr.ts                  # ML Kit wrapper (Phase 3 stub)
│   ├── decoder.ts              # PR code lookup
│   ├── database.ts             # Bundled JSON loader
│   └── imagePicker.ts          # expo-image-picker wrapper
├── store/
│   ├── garageStore.ts          # Zustand (in-memory, AsyncStorage Phase 4)
│   └── decodeStore.ts          # Session state
├── data/
│   └── pr-codes.json           # Bundled sample dataset — DO NOT EDIT MANUALLY
├── types/index.ts
├── utils/
│   ├── prCodeParser.ts
│   └── platform.ts
├── global.css                  # NativeWind v4 entry (@tailwind directives)
├── tailwind.config.js
└── postcss.config.js
```

## Core Types
```typescript
// types/index.ts
export interface PRCode {
  code: string;
  description: string;
  category: PRCategory;
  group?: string;
}

export type PRCategory =
  | 'engine' | 'transmission' | 'exterior' | 'wheels'
  | 'interior' | 'safety' | 'suspension' | 'lighting'
  | 'comfort' | 'towing' | 'other';

export interface Vehicle {
  id: string;
  nickname?: string;
  vin?: string;
  prCodes: string[];
  decodedAt: string; // ISO
}

export interface DecodeResult {
  matched: PRCode[];
  unrecognized: string[];
}
```

## Key Service Signatures

```typescript
// database.ts — bundled JSON (remote update layer added later)
export async function loadDatabase(): Promise<PRCode[]>

// decoder.ts
export function decodePRCodes(codes: string[], db: PRCode[]): DecodeResult
export function groupByCategory(codes: PRCode[]): Record<string, PRCode[]>

// ocr.ts — mobile only (Phase 3)
export async function extractPRCodesFromImage(imageUri: string): Promise<string[]>

// prCodeParser.ts
export const PR_CODE_PATTERN = /\b[A-Z0-9]{3}\b/g
export function extractPRCodesFromText(text: string): string[]
export function filterValidPRCodes(codes: string[], knownCodes: Set<string>): { valid: string[]; unrecognized: string[] }
```

## NativeWind v4 Setup (what is actually installed)
```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```js
// babel.config.js — jsxImportSource is REQUIRED for NativeWind v4
module.exports = (api) => {
  api.cache(true);
  return { presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]] };
};
```
```js
// metro.config.js
const { withNativeWind } = require("nativewind/metro");
module.exports = withNativeWind(config, { input: "./global.css" });
```
```js
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
};
```

## Database: Remote Update Pattern (Phase 4)
- Bundled: `data/pr-codes.json` — always available offline (currently sample data)
- Remote: `https://your-domain.com/vagcodex/pr-codes.json` on Hetzner VPS
- On launch: return bundled/cached immediately, fetch remote in background, cache in AsyncStorage
- Update flow: `scp pr-codes.json user@vps:/var/www/vagcodex/pr-codes.json` → users get it silently

## User Flow
```
Home → [Scan/Library] ─── Phase 3 OCR ──→ Confirm Screen
Home → [Manual entry] ──────────────────→ Confirm Screen
Confirm Screen → [Decode] → Results Screen → [Save] → Garage
```

## Affiliate Placement
- **CarVertical** (~€10-15/sale): Results screen, after list loads. "Check full vehicle history →"
- **Autodoc**: Below CarVertical. "Find parts for your VAG →"
- One card each per session. No popups. No banners.

## Build Phases
- **Phase 1** ✅ — Core UI, manual entry, decode flow, sample database
- **Phase 2** — Implement image picker → navigate to confirm (wires up buttons)
- **Phase 3** — Add ML Kit OCR, extract PR codes from image, device only
- **Phase 4** — Garage persistence (AsyncStorage), remote database updates

## DO NOT
- Use Expo Go
- Remove `jsxImportSource: "nativewind"` from babel.config.js (needed for v4)
- Use any library that doesn't support New Architecture
- Edit pr-codes.json manually
- Add a backend
- Show OCR/camera UI on web
- Store sensitive user data
- Add ads or paywalls
