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
│   ├── ScanButton.tsx          # Photo capture trigger (mobile only)
│   └── AffiliateCard.tsx       # Affiliate partner card (accent left border)
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
│   ├── platform.ts
│   └── theme.ts                # Design system color constants (source of truth)
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

## Design System

All visual tokens live in `utils/theme.ts`. Import `colors` from there — never hardcode hex values inline.

| Token | Value | Usage |
|---|---|---|
| `background` | `#F7F7F8` | Screen backgrounds |
| `surface` | `#FFFFFF` | Cards, sheets |
| `border` | `#E8E8EA` | Subtle dividers, card borders |
| `textPrimary` | `#111111` | Headings, body text |
| `textSecondary` | `#6B6B6B` | Secondary labels |
| `textMuted` | `#AAAAAA` | Captions, hints, placeholders |
| `accent` | `#1C3557` | CTAs, active states, links |
| `accentLight` | `#EDF2F8` | Chip/badge backgrounds |
| `danger` | `#C0392B` | Destructive actions only |
| `success` | `#2D6A4F` | Matched/found states |

Tailwind custom colors (defined in `tailwind.config.js` → `theme.extend.colors`):
- `bg-background`, `bg-surface`, `border-divider`, `text-primary`, `text-secondary`, `text-muted`
- `bg-accent`, `text-accent`, `bg-accent-light`, `text-accent-light`, `text-danger`, `text-success`

**Typography rules:**
- Heading: 24px, `fontWeight: '700'`, `textPrimary`
- Subheading: 16–18px, `fontWeight: '600'`, `textPrimary`
- Body: 15px, `fontWeight: '400'`, `textPrimary`
- Caption/label: 12px, `fontWeight: '500'`, `textMuted`, `textTransform: 'uppercase'`, `letterSpacing: 0.8`

**Layout rules:**
- Screen horizontal padding: 20px
- Card padding: 16px
- Section spacing: 24px between sections
- Card border radius: 12px (`rounded-xl`)
- Chip/badge border radius: 6px (`rounded-md`)
- Cards: `bg-surface`, `borderWidth: 1`, `borderColor: colors.border` — no shadows
- CTA buttons: `bg-accent`, `height: 56`, `rounded-xl`, white text `fontWeight: '600'`
- Tab bar: white bg, accent active, textMuted inactive

**Component conventions:**
- `AffiliateCard`: surface card with 3px left border in accent color, full-width CTA button
- `PRCodeChip`: accentLight bg, accent text, 6px radius, 32px height
- `EquipmentCard`: description left, code badge right (accentLight bg)
- `CategorySection`: uppercase caption header, chevron via Ionicons, accent-light count badge
- `ScanButton`: two side-by-side buttons — accent fill (camera) + accent-light/bordered (library)

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
- Hardcode hex color values — always use `colors` from `utils/theme.ts`
- Use gradient backgrounds, heavy drop shadows, or pure white screen backgrounds
- Use custom fonts — system font only
