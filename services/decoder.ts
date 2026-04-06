import type { PRCode, DecodeResult } from '@/types';

export function decodePRCodes(codes: string[], db: PRCode[]): DecodeResult {
  const dbMap = new Map(db.map((p) => [p.code, p]));
  const matched: PRCode[] = [];
  const unrecognized: string[] = [];

  for (const code of codes) {
    const found = dbMap.get(code.toUpperCase());
    if (found) {
      matched.push(found);
    } else {
      unrecognized.push(code);
    }
  }

  return { matched, unrecognized };
}

export function groupByCategory(codes: PRCode[]): Record<string, PRCode[]> {
  const groups: Record<string, PRCode[]> = {};
  for (const code of codes) {
    if (!groups[code.category]) groups[code.category] = [];
    groups[code.category].push(code);
  }
  return groups;
}
