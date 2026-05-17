/**
 * 中文：任务卡片组件，展示单条任务及其状态和完成按钮。
 * English: Task card component showing a single task with its status and complete button.
 */

import { useState } from 'react';
import Badge from '../ui/Badge';
import type { Task } from '../../types/task';

type BadgeColor = React.ComponentProps<typeof Badge>['color'];

interface TaskCardProps {
  task: Task;
  currentUserId: string;
  buddyName?: string;
  onComplete: (taskId: string) => void;
  onUncomplete: (taskId: string) => void;
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
        {count === 1 && (task.completedByIds.length > 0 ? `等待 ${buddyName ?? '搭子'} 完成` : '')}
        {count >= 2 && '双方都完成了！'}
      </span>
    </div>
  );
}

export default function TaskCard({ task, currentUserId, buddyName, onComplete, onUncomplete }: TaskCardProps) {
  const [confirming, setConfirming] = useState(false);
  const isDone = task.status === 'completed';
  const alreadyCompleted = task.completedByIds.includes(currentUserId);
  const isPrivate = task.visibility === 'private';
  const isOwnTask = task.ownerId === currentUserId;

  const outerStyle: React.CSSProperties = {
    position: 'relative',
    backdropFilter: 'blur(40px) saturate(200%) brightness(108%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(108%)',
    backgroundColor: isDone ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.28)',
    border: '1px solid rgba(255,255,255,0.55)',
    boxShadow: isDone
      ? '0 2px 8px rgba(0,0,0,0.06)'
      : '0 8px 32px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.4)',
    overflow: 'hidden',
  };

  // Specular highlight layer — simulates curved glass surface catching light
  const specularStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '52%',
    background: 'linear-gradient(175deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)',
    borderRadius: '16px 16px 40% 40% / 12px 12px 20px 20px',
    pointerEvents: 'none',
  };

  // Subtle rim light on bottom edge
  const rimStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
    pointerEvents: 'none',
  };

  return (
    <div
      className={`rounded-2xl p-4 transition-all ${isDone ? 'opacity-55' : ''}`}
      style={outerStyle}
    >
      {/* Liquid glass specular highlight */}
      <div style={specularStyle} />
      <div style={rimStyle} />

      <div className="relative flex items-start gap-3">
        {confirming ? (
          <div className="flex items-center gap-1 mt-0.5 flex-shrink-0">
            <button
              onClick={() => { onUncomplete(task.id); setConfirming(false); }}
              className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200 hover:bg-red-200 transition-colors"
            >
              撤销
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
          </div>
        ) : (
          <button
            onClick={() => alreadyCompleted ? setConfirming(true) : onComplete(task.id)}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              alreadyCompleted
                ? 'bg-green-200 border-green-300 text-green-600 hover:bg-red-100 hover:border-red-300 hover:text-red-400'
                : 'border-green-300 hover:bg-green-50'
            }`}
          >
            {alreadyCompleted && <span className="text-xs">✓</span>}
          </button>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-sm font-medium ${isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {isPrivate && !isOwnTask ? '私密任务' : task.title}
            </p>
            {isPrivate && <span className="text-xs text-gray-300">🔒</span>}
          </div>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge label={difficultyLabel[task.difficulty]} color={difficultyColor[task.difficulty]} />
            {task.type === 'shared' && <Badge label="共同" color="blue" />}
            {isDone && <Badge label="完成 ✓" color="green" />}
          </div>

          {task.type === 'shared' && (
            <SharedProgress task={task} buddyName={buddyName} />
          )}
        </div>
      </div>
    </div>
  );
}
