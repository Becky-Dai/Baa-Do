/**
 * 中文：任务卡片组件，展示单条任务及完成/编辑/删除操作。
 * English: Task card component showing a single task with complete, edit, and delete actions.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Badge from '../ui/Badge';
import type { Task } from '../../types/task';

type BadgeColor = React.ComponentProps<typeof Badge>['color'];

interface TaskCardProps {
  task: Task;
  currentUserId: string;
  buddyName?: string;
  onComplete: (taskId: string) => void;
  onUncomplete: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
}

const difficultyColor: Record<string, BadgeColor> = {
  easy: 'green',
  medium: 'amber',
  hard: 'pink',
};

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const categoryEmoji: Record<string, string> = {
  life: '🏠', study: '📚', work: '💼', fitness: '💪',
  leisure: '🎮', diet: '🍎', social: '💬', other: '✨',
};

function SharedProgress({ task, buddyName }: { task: Task; buddyName?: string }) {
  const count = task.completedByIds.length;
  return (
    <div className="flex items-center gap-1 mt-1">
      <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${count >= 1 ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
        {count >= 1 ? '✓' : '○'}
      </span>
      <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${count >= 2 ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
        {count >= 2 ? '✓' : '○'}
      </span>
      <span className="text-xs text-gray-400 ml-1">
        {count === 0 && '等待双方完成'}
        {count === 1 && `等待 ${buddyName ?? '搭子'} 完成`}
        {count >= 2 && '双方都完成了！'}
      </span>
    </div>
  );
}

export default function TaskCard({
  task, currentUserId, buddyName,
  onComplete, onUncomplete, onDelete, onEdit,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDone = task.status === 'completed';
  const alreadyCompleted = task.completedByIds.includes(currentUserId);
  const isPrivate = task.visibility === 'private';
  const isOwnTask = task.ownerId === currentUserId;
  const canManage = isOwnTask || task.type === 'shared';

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const outerStyle: React.CSSProperties = {
    position: 'relative',
    backdropFilter: 'blur(40px) saturate(200%) brightness(108%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(108%)',
    backgroundColor: isDone ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.28)',
    border: '1px solid rgba(255,255,255,0.55)',
    boxShadow: isDone
      ? '0 2px 8px rgba(0,0,0,0.06)'
      : '0 8px 32px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.4)',
  };

  const specularStyle: React.CSSProperties = {
    position: 'absolute', top: 0, left: 0, right: 0, height: '52%',
    background: 'linear-gradient(175deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)',
    borderRadius: '16px 16px 40% 40% / 12px 12px 20px 20px',
    pointerEvents: 'none',
  };

  const rimStyle: React.CSSProperties = {
    position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
    pointerEvents: 'none',
  };

  return (
    <div
      className={`rounded-2xl p-4 transition-all ${isDone ? 'opacity-55' : ''}`}
      style={outerStyle}
    >
      <div style={specularStyle} />
      <div style={rimStyle} />

      <div className="relative flex items-start gap-3">
        {/* Complete button */}
        <button
          onClick={() => alreadyCompleted ? onUncomplete(task.id) : onComplete(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            alreadyCompleted
              ? 'bg-green-200 border-green-300 text-green-600 hover:bg-red-100 hover:border-red-300 hover:text-red-400'
              : 'border-green-300 hover:bg-green-50'
          }`}
        >
          {alreadyCompleted && <span className="text-xs">✓</span>}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-sm font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {isPrivate && !isOwnTask ? '私密任务' : task.title}
            </p>
            {isPrivate && <span className="text-xs text-gray-300">🔒</span>}
          </div>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs">{categoryEmoji[task.category] ?? '✨'}</span>
            {task.priority > 0 && (
              <span className="text-xs">{'🚩'.repeat(task.priority)}</span>
            )}
            <Badge label={difficultyLabel[task.difficulty]} color={difficultyColor[task.difficulty]} />
            {task.type === 'shared' && <Badge label="共同" color="blue" />}
            {isDone && <Badge label="完成 ✓" color="green" />}
          </div>

          {task.type === 'shared' && (
            <SharedProgress task={task} buddyName={buddyName} />
          )}
        </div>

        {/* Three-dot menu */}
        {canManage && (
          <div ref={menuRef} className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-white/40 transition-colors text-xs"
            >
              ···
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-7 z-50 w-28 rounded-2xl overflow-hidden shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <button
                  onClick={() => { setMenuOpen(false); onEdit?.(task.id); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-green-50 flex items-center gap-2"
                >
                  <span>✏️</span> 编辑
                </button>
                <div className="h-px bg-gray-100 mx-2" />
                <button
                  onClick={() => { setMenuOpen(false); onDelete?.(task.id); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <span>🗑</span> 删除
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
