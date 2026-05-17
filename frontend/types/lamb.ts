/**
 * 中文：BaaDo Web Preview Pair Lamb 小羊类型定义。
 * English: Pair Lamb type definitions for BaaDo Web Preview.
 */

export type LambAppearance = 'white' | 'milktea' | 'curly';

export type LambMoodState = 'happy' | 'normal' | 'hungry' | 'sad';

export interface PairLamb {
  id: string;
  name: string;
  appearance: LambAppearance;
  level: number;
  exp: number;
  fullness: number;
  mood: number;
  moodState: LambMoodState;
  currentOutfit: string | null;
}
