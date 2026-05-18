/**
 * 中文：Dashboard Meadow 面板，展示草地等级和待放置元素（场景已作为全页背景）。
 * English: Dashboard Meadow panel showing Home Level and unplaced elements (scene is now the page background).
 */

'use client';

import { useState } from 'react';
import type { PairRoom } from '../../types/room';
import type { MeadowElement } from '../../types/economy';
import type { PairLamb } from '../../types/lamb';

interface MeadowPanelProps {
  room: PairRoom;
  meadowElements: MeadowElement[];
  lamb: PairLamb;
  onFeed: () => void;
}

const homeLevelLabel: Record<number, string> = {
  1: '基础草地小窝',
  2: '温馨草地',
  3: '暖色草地',
  4: '小花园',
  5: '双人散步场景',
};

const homeLevelExpNeeded: Record<number, number> = {
  1: 30,
  2: 80,
  3: 150,
  4: 250,
  5: 999,
};

const glassCard: React.CSSProperties = {
  backdropFilter: 'blur(20px) saturate(160%)',
  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
  backgroundColor: 'rgba(255,255,255,0.35)',
  border: '1px solid rgba(255,255,255,0.55)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
};

function CollapseHeader({ title, open, onToggle }: { title: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left"
    >
      <span className="text-xs font-semibold text-green-800">{title}</span>
      <span className="text-green-700 text-xs">{open ? '▲' : '▼'}</span>
    </button>
  );
}

export default function MeadowPanel({ room, meadowElements, lamb, onFeed }: MeadowPanelProps) {
  const [meadowOpen, setMeadowOpen] = useState(true);
  const [mochiOpen, setMochiOpen] = useState(true);

  const nextLevelExp = homeLevelExpNeeded[room.homeLevel] ?? 999;
  const prevLevelExp = homeLevelExpNeeded[room.homeLevel - 1] ?? 0;
  const progress = Math.min(100, ((room.homeExp - prevLevelExp) / (nextLevelExp - prevLevelExp)) * 100);

  return (
    <div className="flex flex-col gap-3">

      {/* Meadow Level card */}
      <div className="rounded-3xl overflow-hidden" style={glassCard}>
        <div className="px-5 py-3">
          <CollapseHeader
            title={`🌿 Meadow Level · Lv.${room.homeLevel}`}
            open={meadowOpen}
            onToggle={() => setMeadowOpen((v) => !v)}
          />
        </div>
        {meadowOpen && (
          <div className="px-5 pb-4">
            <p className="text-sm font-bold text-green-900 mb-2">{homeLevelLabel[room.homeLevel]}</p>
            <div className="flex justify-between text-xs text-green-700 mb-1">
              <span>{room.homeExp} EXP</span>
              <span>→ {nextLevelExp} EXP</span>
            </div>
            <div className="w-full bg-white/40 rounded-full h-2">
              <div className="h-2 rounded-full bg-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Mochi stats + feed */}
      <div className="rounded-3xl overflow-hidden" style={glassCard}>
        <div className="px-4 py-3">
          <CollapseHeader
            title={`🐑 ${lamb.name} · Lv.${lamb.level}`}
            open={mochiOpen}
            onToggle={() => setMochiOpen((v) => !v)}
          />
        </div>
        {mochiOpen && (
          <div className="px-4 pb-4">
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-700 w-10">饱腹</span>
                <div className="flex-1 bg-white/40 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-amber-400 transition-all" style={{ width: `${lamb.fullness}%` }} />
                </div>
                <span className="text-amber-700 w-6 text-right">{lamb.fullness}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-700 w-10">心情</span>
                <div className="flex-1 bg-white/40 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-pink-400 transition-all" style={{ width: `${lamb.mood}%` }} />
                </div>
                <span className="text-pink-600 w-6 text-right">{lamb.mood}</span>
              </div>
            </div>
            <button
              onClick={onFeed}
              className="w-full bg-amber-400/80 hover:bg-amber-400 text-white font-semibold rounded-2xl py-2 text-sm transition-colors"
            >
              喂 {lamb.name} 🌾
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
