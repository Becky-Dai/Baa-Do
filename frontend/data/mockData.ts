/**
 * 中文：这个文件存放 BaaDo Web Preview 第一阶段使用的 mock 数据。
 * English: This file stores mock data for Phase 1 of BaaDo Web Preview.
 */

import type { User } from '../types/user';
import type { PairRoom } from '../types/room';
import type { PairLamb } from '../types/lamb';
import type { Task } from '../types/task';
import type { InventoryItem, ActivityLogEntry, MeadowElement } from '../types/economy';

export const mockUsers: User[] = [
  {
    id: 'user-beiqi',
    name: 'Beiqi',
    avatarColor: '#a8d5a2',
    baaCoins: 45,
    bondWithLamb: 55,
    bondLevel: 2,
  },
  {
    id: 'user-alice',
    name: 'Alice',
    avatarColor: '#f4c2c2',
    baaCoins: 30,
    bondWithLamb: 30,
    bondLevel: 1,
  },
];

export const mockRoom: PairRoom = {
  id: 'room-001',
  inviteCode: 'MOCHI7',
  status: 'active',
  userAId: 'user-beiqi',
  userBId: 'user-alice',
  lambId: 'lamb-mochi',
  homeExp: 35,
  homeLevel: 2,
  createdAt: '2026-05-10T10:00:00Z',
};

export const mockLamb: PairLamb = {
  id: 'lamb-mochi',
  name: 'Mochi',
  appearance: 'milktea',
  level: 2,
  exp: 60,
  fullness: 72,
  mood: 80,
  moodState: 'normal',
  currentOutfit: null,
};

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    type: 'personal',
    title: '背 30 个单词',
    difficulty: 'easy',
    status: 'pending',
    visibility: 'status_only',
    ownerId: 'user-beiqi',
    completedByIds: [],
    createdAt: '2026-05-17T08:00:00Z',
    category: 'study',
    priority: 1,
    isPinned: true,
  },
  {
    id: 'task-002',
    type: 'personal',
    title: '运动 20 分钟',
    difficulty: 'medium',
    status: 'completed',
    visibility: 'visible_to_buddy',
    ownerId: 'user-beiqi',
    completedByIds: ['user-beiqi'],
    createdAt: '2026-05-17T08:00:00Z',
    category: 'fitness',
    priority: 0,
    isPinned: false,
  },
  {
    id: 'task-003',
    type: 'personal',
    title: 'Alice 的任务',
    difficulty: 'easy',
    status: 'pending',
    visibility: 'private',
    ownerId: 'user-alice',
    completedByIds: [],
    createdAt: '2026-05-17T08:00:00Z',
    category: 'other',
    priority: 0,
    isPinned: false,
  },
  {
    id: 'task-004',
    type: 'shared',
    title: '一起复盘本周计划',
    difficulty: 'medium',
    status: 'partially_completed',
    visibility: 'visible_to_buddy',
    ownerId: null,
    completedByIds: ['user-beiqi'],
    createdAt: '2026-05-17T08:00:00Z',
    category: 'work',
    priority: 2,
    isPinned: false,
  },
  {
    id: 'task-005',
    type: 'shared',
    title: '一起散步 20 分钟',
    difficulty: 'easy',
    status: 'pending',
    visibility: 'visible_to_buddy',
    ownerId: null,
    completedByIds: [],
    createdAt: '2026-05-17T08:00:00Z',
    category: 'fitness',
    priority: 0,
    isPinned: false,
  },
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'item-001',
    name: '普通干草',
    type: 'food',
    quantity: 3,
    ownerId: 'user-beiqi',
    fullnessBoost: 15,
    moodBoost: 0,
    bondBoost: 0,
  },
  {
    id: 'item-002',
    name: '优质苜蓿',
    type: 'food',
    quantity: 1,
    ownerId: 'user-beiqi',
    fullnessBoost: 30,
    moodBoost: 5,
    bondBoost: 0,
  },
  {
    id: 'item-003',
    name: '莓果零食',
    type: 'food',
    quantity: 1,
    ownerId: 'user-alice',
    fullnessBoost: 0,
    moodBoost: 20,
    bondBoost: 5,
  },
  {
    id: 'deco-001',
    name: '石头',
    type: 'decoration',
    quantity: 3,
    ownerId: 'user-beiqi',
    fullnessBoost: 0,
    moodBoost: 0,
    bondBoost: 0,
  },
  {
    id: 'deco-002',
    name: '小花',
    type: 'decoration',
    quantity: 2,
    ownerId: 'user-beiqi',
    fullnessBoost: 0,
    moodBoost: 0,
    bondBoost: 0,
  },
  {
    id: 'deco-003',
    name: '木桩',
    type: 'decoration',
    quantity: 1,
    ownerId: 'user-beiqi',
    fullnessBoost: 0,
    moodBoost: 0,
    bondBoost: 0,
  },
];

export const mockActivityLogs: ActivityLogEntry[] = [
  // 5月15日
  {
    id: 'log-101',
    actorId: 'user-alice',
    actorName: 'Alice',
    action: '喂了 Mochi 一颗 优质苜蓿 🍀',
    actionKey: 'log.action.feed',
    actionVars: { lamb: 'Mochi', itemKey: 'item.clover' },
    timestamp: '2026-05-15T08:20:00Z',
    isPublic: true,
  },
  {
    id: 'log-102',
    actorId: 'user-beiqi',
    actorName: 'Beiqi',
    action: '完成了个人任务，Mochi 得到了 普通干草 🌾',
    actionKey: 'log.action.completePersonalEarned',
    actionVars: { itemKey: 'item.hay' },
    timestamp: '2026-05-15T14:00:00Z',
    isPublic: true,
  },
  // 5月16日
  {
    id: 'log-201',
    actorId: 'user-beiqi',
    actorName: 'Beiqi',
    action: '完成了共同任务"一起制定本周计划"的自己部分',
    actionKey: 'log.action.completeShared',
    actionVars: { title: '一起制定本周计划' },
    timestamp: '2026-05-16T09:10:00Z',
    isPublic: true,
  },
  {
    id: 'log-202',
    actorId: 'user-alice',
    actorName: 'Alice',
    action: '完成了共同任务"一起制定本周计划"，Meadow 解锁了 Small Flower 🌸',
    actionKey: 'log.action.completeSharedUnlock',
    actionVars: { title: '一起制定本周计划', element: 'Small Flower' },
    timestamp: '2026-05-16T10:30:00Z',
    isPublic: true,
  },
  {
    id: 'log-203',
    actorId: 'user-beiqi',
    actorName: 'Beiqi',
    action: '喂了 Mochi 一颗 莓果零食 🍓',
    actionKey: 'log.action.feed',
    actionVars: { lamb: 'Mochi', itemKey: 'item.berry' },
    timestamp: '2026-05-16T20:00:00Z',
    isPublic: true,
  },
  // 5月17日
  {
    id: 'log-001',
    actorId: 'user-beiqi',
    actorName: 'Beiqi',
    action: '完成了个人任务，Mochi 得到了 普通干草 🌾',
    actionKey: 'log.action.completePersonalEarned',
    actionVars: { itemKey: 'item.hay' },
    timestamp: '2026-05-17T09:30:00Z',
    isPublic: true,
  },
  {
    id: 'log-002',
    actorId: 'user-alice',
    actorName: 'Alice',
    action: '喂了 Mochi 一颗 莓果零食 🍓',
    actionKey: 'log.action.feed',
    actionVars: { lamb: 'Mochi', itemKey: 'item.berry' },
    timestamp: '2026-05-17T10:00:00Z',
    isPublic: true,
  },
  {
    id: 'log-003',
    actorId: 'user-beiqi',
    actorName: 'Beiqi',
    action: '完成了共同任务"一起复盘本周计划"的自己部分',
    actionKey: 'log.action.completeShared',
    actionVars: { title: '一起复盘本周计划' },
    timestamp: '2026-05-17T11:00:00Z',
    isPublic: true,
  },
];

export const mockMeadowElements: MeadowElement[] = [
  {
    id: 'meadow-001',
    name: 'Small Flower',
    emoji: '🌸',
    unlockedAt: '2026-05-12T12:00:00Z',
    isPlaced: true,
  },
  {
    id: 'meadow-002',
    name: 'Wooden Sign',
    emoji: '🪧',
    unlockedAt: '2026-05-15T16:00:00Z',
    isPlaced: true,
  },
  {
    id: 'meadow-003',
    name: 'Picnic Blanket',
    emoji: '🧺',
    unlockedAt: '2026-05-17T11:00:00Z',
    isPlaced: false,
  },
];

export const CURRENT_USER_ID = 'user-beiqi';
