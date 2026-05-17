/**
 * 中文：这个 Hook 用于管理 Web Preview 阶段的 mock Pair Lamb 小羊状态。
 * English: This hook manages mock Pair Lamb state for the Web Preview phase.
 */

'use client';

import { useState } from 'react';
import { mockLamb } from '../data/mockData';
import type { PairLamb } from '../types/lamb';
import type { InventoryItem } from '../types/economy';
import { calcLambMoodState } from '../lib/rewardRules';

export function useMockLamb() {
  const [lamb, setLamb] = useState<PairLamb>(mockLamb);

  function feedLamb(item: InventoryItem) {
    setLamb((prev) => {
      const newFullness = Math.min(100, prev.fullness + item.fullnessBoost);
      const newMood = Math.min(100, prev.mood + item.moodBoost);
      return {
        ...prev,
        fullness: newFullness,
        mood: newMood,
        moodState: calcLambMoodState(newFullness, newMood),
      };
    });
  }

  function addLambExp(exp: number) {
    setLamb((prev) => ({ ...prev, exp: prev.exp + exp }));
  }

  function setLambName(name: string) {
    setLamb((prev) => ({ ...prev, name }));
  }

  return { lamb, feedLamb, addLambExp, setLambName };
}
