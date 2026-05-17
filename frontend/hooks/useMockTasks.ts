/**
 * 中文：这个 Hook 用于管理 Web Preview 阶段的 mock 任务状态。
 * English: This hook manages mock task state for the Web Preview phase.
 */

'use client';

import { useState } from 'react';
import { mockTasks, CURRENT_USER_ID } from '../data/mockData';
import type { Task, TaskType, TaskDifficulty, TaskVisibility } from '../types/task';

export function useMockTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const personalTasks = tasks.filter((t) => t.type === 'personal' && t.ownerId === CURRENT_USER_ID);
  const buddyTasks = tasks.filter((t) => t.type === 'personal' && t.ownerId !== CURRENT_USER_ID);
  const sharedTasks = tasks.filter((t) => t.type === 'shared');

  function completeTask(taskId: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        if (t.type === 'personal') {
          const isDone = t.completedByIds.includes(CURRENT_USER_ID);
          if (isDone) {
            // undo
            return { ...t, status: 'pending', completedByIds: [] };
          }
          return { ...t, status: 'completed', completedByIds: [CURRENT_USER_ID] };
        }
        const already = t.completedByIds.includes(CURRENT_USER_ID);
        if (already) {
          // undo shared
          const newCompleted = t.completedByIds.filter((id) => id !== CURRENT_USER_ID);
          return {
            ...t,
            completedByIds: newCompleted,
            status: newCompleted.length === 0 ? 'pending' : 'partially_completed',
          };
        }
        const newCompleted = [...t.completedByIds, CURRENT_USER_ID];
        return {
          ...t,
          completedByIds: newCompleted,
          status: newCompleted.length >= 2 ? 'completed' : 'partially_completed',
        };
      })
    );
  }

  function addTask(params: {
    type: TaskType;
    title: string;
    difficulty: TaskDifficulty;
    visibility: TaskVisibility;
  }) {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      type: params.type,
      title: params.title,
      difficulty: params.difficulty,
      status: 'pending',
      visibility: params.visibility,
      ownerId: params.type === 'personal' ? CURRENT_USER_ID : null,
      completedByIds: [],
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  return { tasks, personalTasks, buddyTasks, sharedTasks, completeTask, addTask };
}
