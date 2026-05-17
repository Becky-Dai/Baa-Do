/**
 * 中文：Dashboard Meadow 面板，展示草地等级和待放置元素（场景已作为全页背景）。
 * English: Dashboard Meadow panel showing Home Level and unplaced elements (scene is now the page background).
 */

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

export default function MeadowPanel({ room, meadowElements, lamb, onFeed }: MeadowPanelProps) {
  const nextLevelExp = homeLevelExpNeeded[room.homeLevel] ?? 999;
  const prevLevelExp = homeLevelExpNeeded[room.homeLevel - 1] ?? 0;
  const progress = Math.min(100, ((room.homeExp - prevLevelExp) / (nextLevelExp - prevLevelExp)) * 100);

  const unplacedElements = meadowElements.filter((e) => !e.isPlaced);

  return (
    <div className="flex flex-col gap-4">
      {/* Home Level card */}
      <div className="rounded-3xl p-5" style={glassCard}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-green-700">Meadow Level</p>
            <h3 className="text-lg font-bold text-green-900">Lv.{room.homeLevel} {homeLevelLabel[room.homeLevel]}</h3>
          </div>
          <span className="text-3xl">🌿</span>
        </div>
        <div className="flex justify-between text-xs text-green-700 mb-1">
          <span>{room.homeExp} EXP</span>
          <span>→ {nextLevelExp} EXP</span>
        </div>
        <div className="w-full bg-white/40 rounded-full h-2">
          <div className="h-2 rounded-full bg-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Mochi stats + feed */}
      <div className="rounded-3xl p-4" style={glassCard}>
        <p className="text-xs font-semibold text-green-800 mb-2">{lamb.name} Lv.{lamb.level}</p>
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

    </div>
  );
}
