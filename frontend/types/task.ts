/**
 * 中文：BaaDo Web Preview 任务类型定义。
 * English: Task type definitions for BaaDo Web Preview.
 */

import type { UserId } from './user';

export type TaskType = 'personal' | 'shared';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'pending' | 'partially_completed' | 'completed' | 'expired';
export type TaskVisibility = 'private' | 'status_only' | 'visible_to_buddy';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  visibility: TaskVisibility;
  ownerId: UserId | null;
  completedByIds: UserId[];
  createdAt: string;
}

export interface TaskReward {
  baaCoins: number;
  lambExp: number;
  bondIncrease: number;
  item: string | null;
  homeExp: number;
  meadowElement: string | null;
}
