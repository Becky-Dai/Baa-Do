/**
 * 中文：SSR 安全的 3D 小羊场景包装器，将 LambMoodState 映射到 SheepMood。
 *       mood 覆盖和庆祝 key 由父组件传入，以便父层通过独立点击区触发交互。
 * English: SSR-safe 3D sheep scene wrapper that maps LambMoodState to SheepMood.
 *          Mood override and celebrationKey are injected by the parent for reliable click handling.
 */
'use client';
import dynamic from 'next/dynamic';
import type { LambMoodState } from '../../types/lamb';
import type { SheepMood } from './SheepModel';

const SheepSceneEmbed = dynamic(
  () => import('./SheepSceneEmbed').then((m) => m.SheepSceneEmbed),
  { ssr: false },
);

export const SHEEP_MOOD_MAP: Record<LambMoodState, SheepMood> = {
  happy:  'happy',
  normal: 'calm',
  hungry: 'hungry',
  sad:    'sad',
};

interface SheepSceneWrapperProps {
  displayMood: SheepMood;
  celebrationKey: number;
  lambName: string;
  lambLevel: number;
  onFeedClick: () => void;
}

export function SheepSceneWrapper({
  displayMood,
  celebrationKey,
  lambName,
  lambLevel,
  onFeedClick,
}: SheepSceneWrapperProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0"
      style={{ height: 460, pointerEvents: 'none' }}
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <SheepSceneEmbed
          mood={displayMood}
          celebrationKey={celebrationKey}
          onSheepClick={() => {}}
        />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
        <span className="text-sm font-bold text-white drop-shadow">{lambName}</span>
        <span className="text-xs text-white/80 drop-shadow">
          Lv.{lambLevel} ·{' '}
          <button
            className="pointer-events-auto underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity"
            onClick={onFeedClick}
          >
            喂食
          </button>
        </span>
      </div>
    </div>
  );
}
