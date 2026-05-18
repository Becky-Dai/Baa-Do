/**
 * 中文：任务卡片组件，展示单条任务及完成/编辑/删除操作。
 * English: Task card component showing a single task with complete, edit, and delete actions.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  easy: 'green', medium: 'amber', hard: 'pink',
};
const difficultyLabel: Record<string, string> = {
  easy: 'Easy', medium: 'Medium', hard: 'Hard',
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
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDone = task.status === 'completed';
  const alreadyCompleted = task.completedByIds.includes(currentUserId);
  const isPrivate = task.visibility === 'private';
  const isOwnTask = task.ownerId === currentUserId;
  const canManage = isOwnTask || task.type === 'shared';

  function openMenu() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
    setMenuOpen(true);
  }

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const insideDropdown = dropdownRef.current?.contains(target);
      const insideButton = buttonRef.current?.contains(target);
      if (!insideDropdown && !insideButton) setMenuOpen(false);
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

  const dropdown = menuOpen ? createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: dropdownPos.top,
        right: dropdownPos.right,
        zIndex: 9999,
        width: 112,
        borderRadius: 16,
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
      }}
    >
      <button
        onClick={() => { setMenuOpen(false); onEdit?.(task.id); }}
        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-green-50 flex items-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.917 1.75a1.237 1.237 0 0 1 1.75 1.75L4.083 11.083l-2.333.584.583-2.334L9.917 1.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        编辑
      </button>
      <div className="h-px bg-gray-100 mx-2" />
      <button
        onClick={() => { setMenuOpen(false); onDelete?.(task.id); }}
        className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.75 3.5h10.5M5.25 3.5V2.333A.583.583 0 0 1 5.833 1.75h2.334a.583.583 0 0 1 .583.583V3.5M11.083 3.5l-.583 8.167A.583.583 0 0 1 9.917 12.25H4.083a.583.583 0 0 1-.583-.583L2.917 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.833 6.417v3.5M8.167 6.417v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        删除
      </button>
    </div>,
    document.body
  ) : null;

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
            <span className="flex items-center gap-px">
              {[1,2,3,4].map((i) => (
                <span
                  key={i}
                  className="text-xs leading-none select-none"
                  style={i <= task.priority ? {} : { filter: 'grayscale(0.6)', opacity: 0.45 }}
                >🐑</span>
              ))}
            </span>
            <Badge label={difficultyLabel[task.difficulty]} color={difficultyColor[task.difficulty]} />
            {task.type === 'shared' && <Badge label="共同" color="blue" />}
            {isDone && <Badge label="完成 ✓" color="green" />}
          </div>
          {task.type === 'shared' && <SharedProgress task={task} buddyName={buddyName} />}
        </div>

        {/* Three-dot menu button */}
        {canManage && (
          <>
            <button
              ref={buttonRef}
              onClick={openMenu}
              className="w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 transition-colors text-xs font-bold flex-shrink-0"
              style={{
                border: '1.5px solid rgba(120,120,120,0.35)',
                background: 'rgba(255,255,255,0.5)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              ···
            </button>
            {dropdown}
          </>
        )}
      </div>
    </div>
  );
}
