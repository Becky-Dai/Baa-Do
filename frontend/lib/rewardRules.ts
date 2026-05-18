/**
 * 中文：BaaDo Web Preview 奖励规则计算逻辑。
 * English: Reward rules calculation logic for BaaDo Web Preview.
 */

import type { TaskDifficulty, TaskReward } from '../types/task';
import type { LambMoodState } from '../types/lamb';

export function calcPersonalReward(difficulty: TaskDifficulty): TaskReward {
  switch (difficulty) {
    case 'easy':
      return { baaCoins: 5, lambExp: 5, bondIncrease: 5, item: '普通干草', homeExp: 0, meadowElement: null };
    case 'medium':
      return { baaCoins: 12, lambExp: 10, bondIncrease: 10, item: '优质苜蓿', homeExp: 0, meadowElement: null };
    case 'hard':
      return { baaCoins: 25, lambExp: 20, bondIncrease: 15, item: '莓果零食', homeExp: 0, meadowElement: null };
  }
}

export function calcSharedReward(difficulty: TaskDifficulty): TaskReward {
  switch (difficulty) {
    case 'easy':
      return { baaCoins: 0, lambExp: 0, bondIncrease: 0, item: null, homeExp: 10, meadowElement: 'Small Flower' };
    case 'medium':
      return { baaCoins: 0, lambExp: 0, bondIncrease: 0, item: null, homeExp: 25, meadowElement: 'Flower Path' };
    case 'hard':
      return { baaCoins: 0, lambExp: 0, bondIncrease: 0, item: null, homeExp: 50, meadowElement: 'Picnic Blanket' };
  }
}

export function calcLambMoodState(fullness: number, mood: number): LambMoodState {
  if (fullness >= 70 && mood >= 70) return 'happy';
  if (fullness < 40) return 'hungry';
  if (mood < 40) return 'sad';
  return 'normal';
}

export function calcBondLevel(bondPoints: number): number {
  if (bondPoints >= 300) return 5;
  if (bondPoints >= 180) return 4;
  if (bondPoints >= 100) return 3;
  if (bondPoints >= 40) return 2;
  return 1;
}

export function calcHomeLevel(homeExp: number): number {
  if (homeExp >= 250) return 5;
  if (homeExp >= 150) return 4;
  if (homeExp >= 80) return 3;
  if (homeExp >= 30) return 2;
  return 1;
}

export function calcLambLevel(lambExp: number): number {
  if (lambExp >= 350) return 5;
  if (lambExp >= 220) return 4;
  if (lambExp >= 120) return 3;
  if (lambExp >= 50) return 2;
  return 1;
}
