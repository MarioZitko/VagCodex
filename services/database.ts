import type { PRCode } from '@/types';
import bundled from '@/data/pr-codes.json';

let cached: PRCode[] | null = null;

export async function loadDatabase(): Promise<PRCode[]> {
  if (cached) return cached;
  cached = bundled as PRCode[];
  return cached;
}
