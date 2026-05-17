/**
 * 中文：这个 Hook 用于管理 Web Preview 阶段的 mock 库存状态。
 * English: This hook manages mock inventory state for the Web Preview phase.
 */

'use client';

import { useState } from 'react';
import { mockInventory, CURRENT_USER_ID } from '../data/mockData';
import type { InventoryItem } from '../types/economy';

export function useMockInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);

  const myItems = inventory.filter(
    (item) => item.ownerId === CURRENT_USER_ID && item.quantity > 0
  );

  function addItem(itemName: string, type: InventoryItem['type'], effects: Partial<InventoryItem>) {
    setInventory((prev) => {
      const existing = prev.find((i) => i.name === itemName && i.ownerId === CURRENT_USER_ID);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const newItem: InventoryItem = {
        id: `item-${Date.now()}`,
        name: itemName,
        type,
        quantity: 1,
        ownerId: CURRENT_USER_ID,
        fullnessBoost: effects.fullnessBoost ?? 0,
        moodBoost: effects.moodBoost ?? 0,
        bondBoost: effects.bondBoost ?? 0,
      };
      return [...prev, newItem];
    });
  }

  function consumeItem(itemId: string) {
    setInventory((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i
      )
    );
  }

  return { inventory, myItems, addItem, consumeItem };
}
