/**
 * 中文：这个 Hook 用于管理 Web Preview 阶段的 mock 任务状态。
 * English: This hook manages mock task state for the Web Preview phase.
 */

'use client';

import { useState } from 'react';
import { mockTasks, CURRENT_USER_ID } from '../data/mockData';
import type { Task, TaskType, TaskDifficulty, TaskVisibility, TaskCategory, TaskStatus, TaskRepeat } from '../types/task';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useMockTasks() {
  // Auto-reset daily tasks whose lastCompletedDate is before today
  const [tasks, setTasks] = useState<Task[]>(() =>
    mockTasks.map((t) => {
      if (t.repeat === 'daily' && t.lastCompletedDate && t.lastCompletedDate < todayStr()) {
        return { ...t, status: 'pending', completedByIds: [], lastCompletedDate: null };
      }
      return t;
    })
  );

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
            return { ...t, status: 'pending', completedByIds: [], lastCompletedDate: null };
          }
          return { ...t, status: 'completed', completedByIds: [CURRENT_USER_ID], lastCompletedDate: t.repeat === 'daily' ? todayStr() : null };
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
    category: TaskCategory;
    priority: 0 | 1 | 2 | 3 | 4;
    repeat: TaskRepeat;
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
      category: params.category,
      priority: params.priority,
      isPinned: false,
      repeat: params.repeat,
      lastCompletedDate: null,
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function pinTask(taskId: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id !== taskId ? t : { ...t, isPinned: !t.isPinned }))
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  function updateTask(taskId: string, params: {
    title: string;
    difficulty: TaskDifficulty;
    visibility: TaskVisibility;
    category: TaskCategory;
    priority: 0 | 1 | 2 | 3 | 4;
    repeat: TaskRepeat;
  }) {
    setTasks((prev) =>
      prev.map((t) => (t.id !== taskId ? t : { ...t, ...params }))
    );
  }

  return { tasks, personalTasks, buddyTasks, sharedTasks, completeTask, addTask, deleteTask, updateTask, pinTask };
}
