/**
 * 中文：添加任务模态框，支持类型、分类、优先级、复杂度选择。
 * English: Add task modal with type, category, priority, and complexity selectors.
 */

'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { TaskType, TaskDifficulty, TaskVisibility, TaskCategory } from '../../types/task';

import type { Task } from '../../types/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: Task;
  onAdd: (params: {
    type: TaskType;
    title: string;
    difficulty: TaskDifficulty;
    visibility: TaskVisibility;
    category: TaskCategory;
    priority: 0 | 1 | 2 | 3 | 4;
  }) => void;
}

const CATEGORIES: { value: TaskCategory; emoji: string; label: string }[] = [
  { value: 'life',    emoji: '🏠', label: '生活' },
  { value: 'study',   emoji: '📚', label: '学习' },
  { value: 'work',    emoji: '💼', label: '工作' },
  { value: 'fitness', emoji: '💪', label: '健身' },
  { value: 'leisure', emoji: '🎮', label: '休闲' },
  { value: 'diet',    emoji: '🍎', label: '饮食' },
  { value: 'social',  emoji: '💬', label: '社交' },
  { value: 'other',   emoji: '✨', label: '其他' },
];

const COMPLEXITY: { val: TaskDifficulty; label: string; dotColor: string; ringColor: string }[] = [
  { val: 'easy',   label: '轻松',  dotColor: 'bg-green-400', ringColor: 'ring-green-400' },
  { val: 'medium', label: '适中',  dotColor: 'bg-amber-400', ringColor: 'ring-amber-400' },
  { val: 'hard',   label: '挑战',  dotColor: 'bg-red-400',   ringColor: 'ring-red-400'   },
];

export default function AddTaskModal({ isOpen, onClose, initialTask, onAdd }: AddTaskModalProps) {
  const [title, setTitle]           = useState(initialTask?.title ?? '');
  const [type, setType]             = useState<TaskType>(initialTask?.type ?? 'personal');
  const [category, setCategory]     = useState<TaskCategory>(initialTask?.category ?? 'study');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>(initialTask?.difficulty ?? 'easy');
  const [priority, setPriority]     = useState<0 | 1 | 2 | 3 | 4>(initialTask?.priority ?? 0);
  const [visibility, setVisibility] = useState<TaskVisibility>(initialTask?.visibility ?? 'private');

  const isEditMode = !!initialTask;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ type, title: title.trim(), difficulty, visibility, category, priority });
    // reset
    setTitle('');
    setType('personal');
    setCategory('study');
    setDifficulty('easy');
    setPriority(0);
    setVisibility('private');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? '编辑任务 ✏️' : '添加任务 ✏️'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* Task type */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">任务类型</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { val: 'personal' as TaskType, emoji: '🐑', label: '个人 Personal' },
              { val: 'shared'   as TaskType, emoji: '🤝', label: '共同 Shared' },
            ]).map(({ val, emoji, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => setType(val)}
                className={`rounded-2xl py-2.5 text-sm font-semibold border-2 transition-all flex items-center justify-center gap-1.5 ${
                  type === val
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-green-50 hover:border-green-200'
                }`}
              >
                <span>{emoji}</span><span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">分类</p>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(({ value, emoji, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                className={`flex flex-col items-center justify-center rounded-2xl py-2 text-xs font-medium border-2 transition-all gap-0.5 ${
                  category === value
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-green-50 hover:border-green-200'
                }`}
              >
                <span className="text-lg leading-none">{emoji}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">任务内容</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={type === 'personal' ? '例如：背 30 个单词' : '例如：一起散步 20 分钟'}
            className="w-full border border-green-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            maxLength={50}
            required
          />
        </div>

        {/* Priority */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">优先级</p>
          <div className="flex items-center gap-1">
            {([1, 2, 3, 4] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(priority === level ? 0 : level)}
                className="text-2xl leading-none transition-all hover:scale-110"
                style={level <= priority ? {} : { filter: 'grayscale(1)', opacity: 0.22 }}
                title={`优先级 ${level}`}
              >
                🐑
              </button>
            ))}
            {priority > 0 && (
              <button
                type="button"
                onClick={() => setPriority(0)}
                className="text-xs text-gray-400 hover:text-gray-600 underline ml-2"
              >
                清除
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {priority === 0 ? '无优先级' : priority === 1 ? '低' : priority === 2 ? '中' : priority === 3 ? '高' : '最高 — 一定先做！'}
          </p>
        </div>

        {/* Complexity */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">复杂度</p>
          <div className="flex gap-3">
            {COMPLEXITY.map(({ val, label, dotColor, ringColor }) => (
              <button
                key={val}
                type="button"
                onClick={() => setDifficulty(val)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-2 text-sm font-medium transition-all ${
                  difficulty === val
                    ? `border-transparent ring-2 ${ringColor} bg-white text-gray-700`
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-white'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${dotColor}`} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility (personal only) */}
        {type === 'personal' && (
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">对搭子的可见性</p>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as TaskVisibility)}
              className="w-full border border-green-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="private">🔒 完全私密</option>
              <option value="status_only">👁 只显示完成状态</option>
              <option value="visible_to_buddy">🤝 对搭子可见</option>
            </select>
          </div>
        )}

        <div className="flex gap-2 mt-1">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} className="flex-1">
            取消
          </Button>
          <Button type="submit" size="sm" className="flex-1" disabled={!title.trim()}>
            {isEditMode ? '保存修改 ✓' : '添加任务 ✓'}
          </Button>
        </div>

      </form>
    </Modal>
  );
}
