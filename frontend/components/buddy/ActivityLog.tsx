/**
 * 中文：活动记录时间轴组件，支持按天翻阅，不泄露私密任务内容。
 * English: Activity log timeline component with day navigation, without leaking private task content.
 */

'use client';

import { useState, useMemo } from 'react';
import type { ActivityLogEntry } from '../../types/economy';
import type { User } from '../../types/user';
import { useT } from '../../contexts/LangContext';

interface ActivityLogProps {
  logs: ActivityLogEntry[];
  users: User[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function toDateKey(dateStr: string): string {
  return dateStr.slice(0, 10);
}

function isToday(dateKey: string): boolean {
  return dateKey === new Date().toISOString().slice(0, 10);
}

function isYesterday(dateKey: string): boolean {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return dateKey === y.toISOString().slice(0, 10);
}

export default function ActivityLog({ logs, users }: ActivityLogProps) {
  const t = useT();
  const publicLogs = logs.filter((l) => l.isPublic);

  function dayLabel(dateKey: string): string {
    if (isToday(dateKey)) return t('log.today');
    if (isYesterday(dateKey)) return t('log.yesterday');
    return formatDate(dateKey + 'T00:00:00Z');
  }

  const days = useMemo(() => {
    const keys = [...new Set(publicLogs.map((l) => toDateKey(l.timestamp)))].sort().reverse();
    return keys;
  }, [publicLogs]);

  const [dayIndex, setDayIndex] = useState(0);

  const currentDay = days[dayIndex] ?? null;
  const dayLogs = currentDay
    ? [...publicLogs]
        .filter((l) => toDateKey(l.timestamp) === currentDay)
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    : [];

  if (publicLogs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        {t('log.empty')}<br />
        <span className="text-xs">{t('log.emptyHint')}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Day navigator */}
      <div className="flex items-center justify-between bg-white/30 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/40">
        <button
          onClick={() => setDayIndex((i) => Math.min(i + 1, days.length - 1))}
          disabled={dayIndex >= days.length - 1}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/50 disabled:opacity-30 transition-colors text-green-800 font-bold"
        >
          ‹
        </button>
        <div className="text-center">
          <p className="text-sm font-bold text-green-900">{currentDay ? dayLabel(currentDay) : '—'}</p>
          <p className="text-[10px] text-green-700">{dayIndex + 1} / {days.length}</p>
        </div>
        <button
          onClick={() => setDayIndex((i) => Math.max(i - 1, 0))}
          disabled={dayIndex <= 0}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/50 disabled:opacity-30 transition-colors text-green-800 font-bold"
        >
          ›
        </button>
      </div>

      {/* Timeline */}
      <div className="overflow-y-auto max-h-[480px] pr-1">
        {dayLogs.length === 0 ? (
          <p className="text-center text-xs text-gray-400 py-6">{t('log.noRecord')}</p>
        ) : (
          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-green-200 rounded-full" />
            <div className="flex flex-col gap-4">
              {dayLogs.map((log) => {
                const user = users.find((u) => u.id === log.actorId);
                return (
                  <div key={log.id} className="relative flex items-start gap-3">
                    <div
                      className="absolute -left-5 w-4 h-4 rounded-full border-2 border-white flex-shrink-0 mt-0.5 shadow-sm"
                      style={{ backgroundColor: user?.avatarColor ?? '#e5e7eb' }}
                    />
                    <div
                      className="flex-1 rounded-2xl p-3"
                      style={{
                        backdropFilter: 'blur(16px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                        backgroundColor: 'rgba(255,255,255,0.45)',
                        border: '1px solid rgba(255,255,255,0.6)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-green-800">{log.actorName}</span>
                        <span className="text-[10px] text-gray-400">{formatTime(log.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-snug">
                        {log.actionKey
                          ? (() => {
                              // Resolve nested translation keys (e.g. itemKey → translated item name)
                              const vars = log.actionVars ? { ...log.actionVars } : {};
                              if (vars.itemKey) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                vars.item = t(vars.itemKey as any);
                                delete vars.itemKey;
                              }
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              return t(log.actionKey as any, vars);
                            })()
                          : log.action}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
