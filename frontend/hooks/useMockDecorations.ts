/**
 * 中文：管理场景中已放置装饰物品的 mock 状态。
 * English: Mock state for decorations placed in the sheep scene.
 */
'use client';
import { useState } from 'react';
import type { PlacedDecoration } from '../types/economy';

export function useMockDecorations() {
  const [placedDecorations, setPlacedDecorations] = useState<PlacedDecoration[]>([]);

  function placeDecoration(itemName: string, x: number, z: number) {
    setPlacedDecorations((prev) => [
      ...prev,
      { id: `deco-placed-${Date.now()}`, itemName, x, z },
    ]);
  }

  function removeDecoration(id: string) {
    setPlacedDecorations((prev) => prev.filter((d) => d.id !== id));
  }

  return { placedDecorations, placeDecoration, removeDecoration };
}
