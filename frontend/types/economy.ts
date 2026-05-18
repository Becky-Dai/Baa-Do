/**
 * 中文：BaaDo Web Preview 经济系统类型定义（道具、库存、活动日志）。
 * English: Economy system type definitions for BaaDo Web Preview.
 */

import type { UserId } from './user';

export type ItemType = 'food' | 'outfit' | 'toy' | 'meadow_element';

export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  quantity: number;
  ownerId: UserId | null;
  fullnessBoost: number;
  moodBoost: number;
  bondBoost: number;
}

export interface ActivityLogEntry {
  id: string;
  actorId: UserId;
  actorName: string;
  action: string;
  timestamp: string;
  isPublic: boolean;
  taskId?: string;
}

export interface MeadowElement {
  id: string;
  name: string;
  emoji: string;
  unlockedAt: string;
  isPlaced: boolean;
}
