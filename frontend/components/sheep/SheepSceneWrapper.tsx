/**
 * 中文：SSR 安全的 3D 小羊场景包装器，将 LambMoodState 映射到 SheepMood。
 * English: SSR-safe 3D sheep scene wrapper that maps LambMoodState to SheepMood.
 */
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { LambMoodState } from '../../types/lamb';
import type { SheepMood } from './SheepModel';

const SheepSceneEmbed = dynamic(
  () => import('./SheepSceneEmbed').then((m) => m.SheepSceneEmbed),
  { ssr: false },
);

const moodMap: Record<LambMoodState, SheepMood> = {
  happy:  'happy',
  normal: 'calm',
  hungry: 'hungry',
  sad:    'sad',
};

interface SheepSceneWrapperProps {
  lambMood: LambMoodState;
  lambName: string;
  lambLevel: number;
  onFeedClick: () => void;
}

export function SheepSceneWrapper({ lambMood, lambName, lambLevel, onFeedClick }: SheepSceneWrapperProps) {
  const [celebrationKey, setCelebrationKey] = useState(0);

  function handleSheepClick() {
    setCelebrationKey((k) => k + 1);
    onFeedClick();
  }

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ width: 520, height: 420 }}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <SheepSceneEmbed
          mood={moodMap[lambMood]}
          celebrationKey={celebrationKey}
          onSheepClick={handleSheepClick}
        />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none">
        <span className="text-sm font-bold text-white drop-shadow">{lambName}</span>
        <span className="text-xs text-white/80 drop-shadow">Lv.{lambLevel} · 点击喂食</span>
      </div>
    </div>
  );
}
