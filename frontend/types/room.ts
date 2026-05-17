/**
 * 中文：BaaDo Web Preview Pair Room 类型定义。
 * English: Pair Room type definitions for BaaDo Web Preview.
 */

import type { UserId } from './user';

export type RoomStatus =
  | 'pending_pair'
  | 'lamb_setup'
  | 'active'
  | 'paused'
  | 'ending'
  | 'archived';

export interface PairRoom {
  id: string;
  inviteCode: string;
  status: RoomStatus;
  userAId: UserId;
  userBId: UserId | null;
  lambId: string | null;
  homeExp: number;
  homeLevel: number;
  createdAt: string;
}
