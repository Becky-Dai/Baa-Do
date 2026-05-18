/**
 * 中文：任务卡片组件，展示单条任务及完成/编辑/删除操作。
 * English: Task card component showing a single task with complete, edit, and delete actions.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  currentUserId: string;
  buddyName?: string;
  onComplete: (taskId: string) => void;
  onUncomplete: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
}

const categoryEmoji: Record<string, string> = {
  life: '🏠', study: '📚', work: '💼', fitness: '💪',
  leisure: '🎮', diet: '🍎', social: '💬', other: '✨',
};

const difficultyDot: Record<string, string> = {
  easy: '#4ade80', medium: '#fbbf24', hard: '#f87171',
};

const difficultyLabel: Record<string, string> = {
  easy: '轻松', medium: '适中', hard: '挑战',
};

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
      setDropdownPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
    }
    setMenuOpen(true);
  }

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!dropdownRef.current?.contains(t) && !buttonRef.current?.contains(t)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    backdropFilter: 'blur(40px) saturate(200%) brightness(108%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(108%)',
    backgroundColor: isDone ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.28)',
    border: '1px solid rgba(255,255,255,0.55)',
    boxShadow: isDone
      ? '0 2px 8px rgba(0,0,0,0.05)'
      : '0 8px 32px rgba(0,0,0,0.10), inset 0 0 0 0.5px rgba(255,255,255,0.4)',
  };

  const shared = task.type === 'shared';
  const completedCount = task.completedByIds.length;

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
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
      }}
    >
      <button
        onClick={() => { setMenuOpen(false); onEdit?.(task.id); }}
        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-green-50 flex items-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9.917 1.75a1.237 1.237 0 0 1 1.75 1.75L4.083 11.083l-2.333.584.583-2.334L9.917 1.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        编辑
      </button>
      <div className="h-px bg-gray-100 mx-2" />
      <button
        onClick={() => { setMenuOpen(false); onDelete?.(task.id); }}
        className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1.75 3.5h10.5M5.25 3.5V2.333A.583.583 0 0 1 5.833 1.75h2.334a.583.583 0 0 1 .583.583V3.5M11.083 3.5l-.583 8.167A.583.583 0 0 1 9.917 12.25H4.083a.583.583 0 0 1-.583-.583L2.917 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.833 6.417v3.5M8.167 6.417v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        删除
      </button>
    </div>,
    document.body
  ) : null;

  return (
    <div className={`rounded-2xl px-4 py-3 transition-all ${isDone ? 'opacity-50' : ''}`} style={cardStyle}>
      {/* Specular highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.5) 0%, transparent 100%)' }} />

      {/* Row 1: complete button · title · menu */}
      <div className="relative flex items-center gap-2.5">
        <button
          onClick={() => alreadyCompleted ? onUncomplete(task.id) : onComplete(task.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            alreadyCompleted
              ? 'bg-green-200 border-green-300 text-green-600 hover:bg-red-100 hover:border-red-300 hover:text-red-400'
              : 'border-green-300 hover:bg-green-50'
          }`}
        >
          {alreadyCompleted && <span className="text-[10px]">✓</span>}
        </button>

        <p className={`flex-1 text-sm font-medium leading-snug ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {isPrivate && !isOwnTask ? '私密任务' : task.title}
          {isPrivate && <span className="ml-1 text-gray-300 text-xs">🔒</span>}
        </p>

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

      {/* Row 2: meta info */}
      <div className="relative flex items-center gap-2 mt-1.5 pl-7">
        {/* Category */}
        <span className="text-xs">{categoryEmoji[task.category] ?? '✨'}</span>

        <span className="text-gray-300 text-xs">·</span>

        {/* Difficulty dot + label */}
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block flex-shrink-0"
            style={{ backgroundColor: difficultyDot[task.difficulty] }} />
          <span className="text-xs text-gray-500">{difficultyLabel[task.difficulty]}</span>
        </span>

        {/* Shared badge */}
        {shared && (
          <>
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-xs text-blue-500 font-medium">共同</span>
          </>
        )}

        {/* Priority sheep */}
        <span className="ml-auto flex items-center gap-0.5">
          {[1,2,3,4].map((i) => (
            <span key={i} className="text-base leading-none select-none"
              style={i <= task.priority
                ? { filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.15))' }
                : { filter: 'grayscale(1)', opacity: 0.28 }}>
              🐑
            </span>
          ))}
        </span>
      </div>

      {/* Row 3: shared progress (only for shared tasks) */}
      {shared && (
        <div className="relative flex items-center gap-2 mt-2 pl-7">
          <div className="flex-1 h-1.5 rounded-full bg-white/40">
            <div
              className="h-1.5 rounded-full bg-green-400 transition-all duration-300"
              style={{ width: `${(completedCount / 2) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {completedCount === 0 && '等待双方'}
            {completedCount === 1 && `等待 ${buddyName ?? '搭子'}`}
            {completedCount >= 2 && '双方完成 ✓'}
          </span>
        </div>
      )}
    </div>
  );
}
