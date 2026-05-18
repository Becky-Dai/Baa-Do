/**
 * 中文：活动记录 Hook，管理运行时动态追加的日志条目。
 * English: Activity log hook managing dynamically appended log entries at runtime.
 */

'use client';

import { useState } from 'react';
import { mockActivityLogs, CURRENT_USER_ID } from '../data/mockData';
import type { ActivityLogEntry } from '../types/economy';
import type { Task } from '../types/task';

export function useMockActivityLog() {
  const [logs, setLogs] = useState<ActivityLogEntry[]>(mockActivityLogs);

  function appendTaskComplete(task: Task, userName: string) {
    // Private tasks must not leak title
    const isPrivate = task.visibility === 'private';
    const action =
      task.type === 'shared'
        ? `完成了共同任务「${task.title}」的自己部分`
        : isPrivate
        ? '完成了一个个人任务 🌾'
        : `完成了个人任务「${task.title}」🌾`;

    const entry: ActivityLogEntry = {
      id: `log-${Date.now()}`,
      actorId: CURRENT_USER_ID,
      actorName: userName,
      action,
      timestamp: new Date().toISOString(),
      isPublic: true,
      taskId: task.id,
    };

    setLogs((prev) => [...prev, entry]);
  }

  function removeByTaskId(taskId: string) {
    setLogs((prev) => prev.filter((l) => l.taskId !== taskId));
  }

  function appendFeed(lambName: string, itemName: string, userName: string) {
    const entry: ActivityLogEntry = {
      id: `log-${Date.now()}`,
      actorId: CURRENT_USER_ID,
      actorName: userName,
      action: `喂了 ${lambName} ${itemName} 🍽️`,
      timestamp: new Date().toISOString(),
      isPublic: true,
    };
    setLogs((prev) => [...prev, entry]);
  }

  return { logs, appendTaskComplete, appendFeed, removeByTaskId };
}
