/**
 * 中文：小羊预览组件，显示 Mochi 的状态、心情和数值。
 * English: Lamb preview component showing Mochi's status, mood, and stats.
 */

import type { PairLamb } from '../../types/lamb';

interface LambPreviewProps {
  lamb: PairLamb;
  onFeed: () => void;
}

const moodEmoji: Record<string, string> = {
  happy: '😊',
  normal: '😌',
  hungry: '😢',
  sad: '😔',
};

const moodLabel: Record<string, string> = {
  happy: 'Happy',
  normal: 'Normal',
  hungry: 'Hungry',
  sad: 'Sad',
};

function StatBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function LambPreview({ lamb, onFeed }: LambPreviewProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col items-center gap-4">
      {/* Lamb visual */}
      <div className="relative">
        <div className="text-7xl select-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
          {lamb.appearance === 'milktea' ? '🐏' : '🐑'}
        </div>
        <span className="absolute -top-1 -right-1 text-xl">
          {moodEmoji[lamb.moodState]}
        </span>
      </div>

      {/* Name and level */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-green-800">{lamb.name}</h2>
        <p className="text-xs text-gray-400">Lv.{lamb.level} Pair Lamb · {moodLabel[lamb.moodState]}</p>
      </div>

      {/* Stats */}
      <div className="w-full space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 w-14">饱腹 Full</span>
          <div className="flex-1">
            <StatBar value={lamb.fullness} color="bg-amber-300" />
          </div>
          <span className="text-amber-600 font-mono w-8 text-right">{lamb.fullness}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 w-14">心情 Mood</span>
          <div className="flex-1">
            <StatBar value={lamb.mood} color="bg-pink-300" />
          </div>
          <span className="text-pink-500 font-mono w-8 text-right">{lamb.mood}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 w-14">EXP</span>
          <div className="flex-1">
            <StatBar value={(lamb.exp / 120) * 100} color="bg-green-300" />
          </div>
          <span className="text-green-600 font-mono w-8 text-right">{lamb.exp}</span>
        </div>
      </div>

      {/* Feed button */}
      <button
        onClick={onFeed}
        className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-2xl py-2.5 text-sm transition-colors"
      >
        喂 Mochi 🌾
      </button>
    </div>
  );
}
