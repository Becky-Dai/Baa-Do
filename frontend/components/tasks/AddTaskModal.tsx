/**
 * 中文：添加任务模态框，支持创建个人任务和共同任务。
 * English: Add task modal supporting creation of personal and shared tasks.
 */

'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { TaskType, TaskDifficulty, TaskVisibility } from '../../types/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (params: {
    type: TaskType;
    title: string;
    difficulty: TaskDifficulty;
    visibility: TaskVisibility;
  }) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>('personal');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('easy');
  const [visibility, setVisibility] = useState<TaskVisibility>('private');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ type, title: title.trim(), difficulty, visibility });
    setTitle('');
    setType('personal');
    setDifficulty('easy');
    setVisibility('private');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="添加任务 ✏️">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Task type */}
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-2">任务类型</p>
          <div className="grid grid-cols-2 gap-2">
            {(['personal', 'shared'] as TaskType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-xl py-2 text-sm font-medium border-2 transition-all ${
                  type === t
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-green-50'
                }`}
              >
                {t === 'personal' ? '个人 Personal' : '共同 Shared'}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">任务内容</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={type === 'personal' ? '例如：背 30 个单词' : '例如：一起散步 20 分钟'}
            className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            maxLength={50}
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-2">难度</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'easy', label: 'Easy', color: 'text-green-600' },
              { val: 'medium', label: 'Medium', color: 'text-amber-600' },
              { val: 'hard', label: 'Hard', color: 'text-pink-600' },
            ].map((d) => (
              <button
                key={d.val}
                type="button"
                onClick={() => setDifficulty(d.val as TaskDifficulty)}
                className={`rounded-xl py-2 text-sm font-medium border-2 transition-all ${
                  difficulty === d.val
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-100 bg-gray-50 hover:bg-green-50'
                } ${d.color}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility (personal only) */}
        {type === 'personal' && (
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">对搭子的可见性</p>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as TaskVisibility)}
              className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
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
            添加任务 ✓
          </Button>
        </div>
      </form>
    </Modal>
  );
}
