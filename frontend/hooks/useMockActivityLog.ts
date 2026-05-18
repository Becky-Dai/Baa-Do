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
    const isPrivate = task.visibility === 'private';
    let actionKey: string;
    let actionVars: Record<string, string>;

    if (task.type === 'shared') {
      actionKey = 'log.action.completeShared';
      actionVars = { title: task.title };
    } else if (isPrivate) {
      actionKey = 'log.action.completePersonalPrivate';
      actionVars = {};
    } else {
      actionKey = 'log.action.completePersonal';
      actionVars = { title: task.title };
    }

    const entry: ActivityLogEntry = {
      id: `log-${Date.now()}`,
      actorId: CURRENT_USER_ID,
      actorName: userName,
      action: '',
      actionKey,
      actionVars,
      timestamp: new Date().toISOString(),
      isPublic: true,
      taskId: task.id,
    };

    setLogs((prev) => [...prev, entry]);
  }

  function removeByTaskId(taskId: string) {
    setLogs((prev) => prev.filter((l) => l.taskId !== taskId));
  }

  function appendFeed(lambName: string, itemKey: string, userName: string) {
    const entry: ActivityLogEntry = {
      id: `log-${Date.now()}`,
      actorId: CURRENT_USER_ID,
      actorName: userName,
      action: '',
      actionKey: 'log.action.feed',
      actionVars: { lamb: lambName, itemKey },
      timestamp: new Date().toISOString(),
      isPublic: true,
    };
    setLogs((prev) => [...prev, entry]);
  }

  return { logs, appendTaskComplete, appendFeed, removeByTaskId };
}
