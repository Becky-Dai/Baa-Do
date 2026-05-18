/**
 * 中文：添加任务模态框，支持类型、分类、优先级、复杂度选择。
 * English: Add task modal with type, category, priority, and complexity selectors.
 */

'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import type { TaskType, TaskDifficulty, TaskVisibility, TaskCategory, TaskRepeat } from '../../types/task';
import type { Task } from '../../types/task';
import { useT } from '../../contexts/LangContext';

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
    repeat: TaskRepeat;
  }) => void;
}

const CATEGORY_VALUES: { value: TaskCategory; emoji: string; key: 'cat.life'|'cat.study'|'cat.work'|'cat.fitness'|'cat.leisure'|'cat.diet'|'cat.social'|'cat.other' }[] = [
  { value: 'life',    emoji: '🏠', key: 'cat.life'    },
  { value: 'study',   emoji: '📚', key: 'cat.study'   },
  { value: 'work',    emoji: '💼', key: 'cat.work'    },
  { value: 'fitness', emoji: '💪', key: 'cat.fitness' },
  { value: 'leisure', emoji: '🎮', key: 'cat.leisure' },
  { value: 'diet',    emoji: '🍎', key: 'cat.diet'    },
  { value: 'social',  emoji: '💬', key: 'cat.social'  },
  { value: 'other',   emoji: '✨', key: 'cat.other'   },
];

const COMPLEXITY_VALUES: { val: TaskDifficulty; dotColor: string; ringColor: string; labelKey: 'task.easy'|'task.medium'|'task.hard' }[] = [
  { val: 'easy',   dotColor: 'bg-green-400', ringColor: 'ring-green-400', labelKey: 'task.easy'   },
  { val: 'medium', dotColor: 'bg-amber-400', ringColor: 'ring-amber-400', labelKey: 'task.medium' },
  { val: 'hard',   dotColor: 'bg-red-400',   ringColor: 'ring-red-400',   labelKey: 'task.hard'   },
];

export default function AddTaskModal({ isOpen, onClose, initialTask, onAdd }: AddTaskModalProps) {
  const t = useT();
  const [title, setTitle]           = useState(initialTask?.title ?? '');
  const [type, setType]             = useState<TaskType>(initialTask?.type ?? 'personal');
  const [category, setCategory]     = useState<TaskCategory>(initialTask?.category ?? 'study');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>(initialTask?.difficulty ?? 'easy');
  const [priority, setPriority]     = useState<0 | 1 | 2 | 3 | 4>(initialTask?.priority ?? 0);
  const [visibility, setVisibility] = useState<TaskVisibility>(initialTask?.visibility ?? 'private');
  const [repeat, setRepeat]         = useState<TaskRepeat>(initialTask?.repeat ?? 'once');

  const isEditMode = !!initialTask;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ type, title: title.trim(), difficulty, visibility, category, priority, repeat });
    setTitle('');
    setType('personal');
    setCategory('study');
    setDifficulty('easy');
    setPriority(0);
    setVisibility('private');
    setRepeat('once');
    onClose();
  }

  const priorityLabelKey = `modal.priority${priority}` as 'modal.priority0'|'modal.priority1'|'modal.priority2'|'modal.priority3'|'modal.priority4';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? t('modal.editTitle') : t('modal.addTitle')}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">

        {/* Task type */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">{t('modal.taskType')}</p>
          <div className="grid grid-cols-2 gap-2">
            {([
              { val: 'personal' as TaskType, emoji: '🐑', labelKey: 'modal.typePersonal' as const },
              { val: 'shared'   as TaskType, emoji: '🤝', labelKey: 'modal.typeShared'   as const },
            ]).map(({ val, emoji, labelKey }) => (
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
                <span>{emoji}</span><span>{t(labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">{t('modal.category')}</p>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORY_VALUES.map(({ value, emoji, key }) => (
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
                <span>{t(key)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">{t('modal.titleLabel')}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={type === 'personal' ? t('modal.personalPlaceholder') : t('modal.sharedPlaceholder')}
            className="w-full border border-green-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            maxLength={50}
            required
          />
        </div>

        {/* Priority */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">{t('modal.priority')}</p>
          <div className="flex items-center gap-1">
            {([1, 2, 3, 4] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(priority === level ? 0 : level)}
                className="text-2xl leading-none transition-all hover:scale-110"
                style={level <= priority ? {} : { filter: 'grayscale(0.6)', opacity: 0.45 }}
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
                {t('modal.clearPriority')}
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">{t(priorityLabelKey)}</p>
        </div>

        {/* Complexity */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">{t('modal.complexity')}</p>
          <div className="flex gap-3">
            {COMPLEXITY_VALUES.map(({ val, dotColor, ringColor, labelKey }) => (
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
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility (personal only) */}
        {type === 'personal' && (
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">{t('modal.visibility')}</p>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as TaskVisibility)}
              className="w-full border border-green-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="private">{t('modal.visPrivate')}</option>
              <option value="status_only">{t('modal.visStatus')}</option>
              <option value="visible_to_buddy">{t('modal.visVisible')}</option>
            </select>
          </div>
        )}

        {/* Repeat toggle */}
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3 cursor-pointer select-none transition-colors"
          style={{ background: repeat === 'daily' ? 'rgba(74,222,128,0.12)' : '#f9fafb', border: `1.5px solid ${repeat === 'daily' ? '#4ade80' : '#e5e7eb'}` }}
          onClick={() => setRepeat(repeat === 'daily' ? 'once' : 'daily')}
        >
          <div>
            <p className="text-sm font-semibold text-gray-700">🔁 {t('task.repeatLabel')}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t('task.repeatHint')}</p>
          </div>
          <div
            className="w-10 h-6 rounded-full relative transition-colors flex-shrink-0 ml-3"
            style={{ background: repeat === 'daily' ? '#4ade80' : '#d1d5db' }}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
              style={{ left: repeat === 'daily' ? '22px' : '2px' }}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-1">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} className="flex-1">
            {t('modal.cancel')}
          </Button>
          <Button type="submit" size="sm" className="flex-1" disabled={!title.trim()}>
            {isEditMode ? t('modal.save') : t('modal.add')}
          </Button>
        </div>

      </form>
    </Modal>
  );
}
