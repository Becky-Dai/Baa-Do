/**
 * 中文：这个 Hook 用于管理 Web Preview 阶段的 mock Pair Room 状态。
 * English: This hook manages mock Pair Room state for the Web Preview phase.
 */

'use client';

import { useState } from 'react';
import { mockRoom, mockUsers, CURRENT_USER_ID } from '../data/mockData';
import type { PairRoom, RoomStatus } from '../types/room';
import type { User } from '../types/user';

export function useMockRoom() {
  const [room, setRoom] = useState<PairRoom>(mockRoom);
  const [users] = useState<User[]>(mockUsers);

  const currentUser = users.find((u) => u.id === CURRENT_USER_ID)!;
  const buddyUser = users.find((u) => u.id !== CURRENT_USER_ID) ?? null;

  function setRoomStatus(status: RoomStatus) {
    setRoom((prev) => ({ ...prev, status }));
  }

  return { room, currentUser, buddyUser, setRoomStatus };
}
