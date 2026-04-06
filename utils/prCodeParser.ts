export const PR_CODE_PATTERN = /\b[A-Z0-9]{3}\b/g;

export function extractPRCodesFromText(text: string): string[] {
  const upper = text.toUpperCase();
  const matches = upper.match(PR_CODE_PATTERN) ?? [];
  return [...new Set(matches)];
}

export function filterValidPRCodes(
  codes: string[],
  knownCodes: Set<string>
): { valid: string[]; unrecognized: string[] } {
  const valid: string[] = [];
  const unrecognized: string[] = [];
  for (const code of codes) {
    if (knownCodes.has(code)) {
      valid.push(code);
    } else {
      unrecognized.push(code);
    }
  }
  return { valid, unrecognized };
}
