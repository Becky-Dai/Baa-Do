/**
 * 中文：组合所有小羊部件并控制吉祥物整体动画，导出 SheepMood 类型。
 * English: Combines all sheep parts, drives mascot-level animation, and exports the SheepMood type.
 */
'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { sheepTheme } from '../../lib/sheepTheme';
import { MoodEffects } from './MoodEffects';
import { SheepBody } from './SheepBody';
import { SheepEars } from './SheepEars';
import { SheepFace } from './SheepFace';
import { SheepHead } from './SheepHead';
import { SheepLegs } from './SheepLegs';

export type SheepMood =
  | 'calm' | 'happy' | 'hungry' | 'full' | 'tired'
  | 'playful' | 'curious' | 'tucked' | 'angry' | 'sad' | 'dislike' | 'like';

interface Posture {
  bodyScale: [number, number, number];
  headOffset: [number, number, number];
  headTilt: number;
  headPitch: number;
  headYaw?: number;
  bobFactor: number;
  rootOffset?: [number, number, number];
  rootRotation?: number;
  rootPitch?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitHeight?: number;
}

const postureByMood: Partial<Record<SheepMood, Posture>> = {
  hungry:  { bodyScale:[0.96,0.94,0.98],  headOffset:[0,-0.04,0.05],   headTilt:-0.05, headPitch:0.12,  bobFactor:0.7 },
  full:    { bodyScale:[1.12,1.03,1.12],  headOffset:[0,0.02,0.0],     headTilt:0.03,  headPitch:-0.03, bobFactor:0.55, rootOffset:[0,-0.04,0], rootPitch:0 },
  tired:   { bodyScale:[1.05,0.9,1.05],   headOffset:[0.58,-0.56,0.12],headTilt:-Math.PI/2.15,headPitch:0.08, bobFactor:0.18, rootOffset:[0,-0.46,0.02], rootPitch:0 },
  playful: { bodyScale:[1,1.02,1],        headOffset:[0.02,0.03,0.02], headTilt:0.08,  headPitch:-0.04, bobFactor:1.4, orbitRadius:2.45, orbitSpeed:1.1, orbitHeight:0.16 },
  curious: { bodyScale:[1,1,1],           headOffset:[0,0.02,0.14],    headTilt:-0.03, headPitch:-0.1,  bobFactor:0.9, rootOffset:[0,0,0.72] },
  tucked:  { bodyScale:[0.92,0.82,0.92],  headOffset:[0,-0.18,-0.05],  headTilt:0,     headPitch:0.18,  bobFactor:0.25, rootOffset:[1.12,-0.06,-1.02], rootRotation:-0.5 },
  angry:   { bodyScale:[1.02,0.96,1.02],  headOffset:[0,-0.02,0.08],   headTilt:-0.08, headPitch:-0.02, bobFactor:0.75 },
  sad:     { bodyScale:[0.96,0.9,0.98],   headOffset:[0,-0.12,0.02],   headTilt:-0.06, headPitch:0.2,   bobFactor:0.25 },
  dislike: { bodyScale:[0.98,0.96,1],     headOffset:[-0.04,-0.02,0.02],headTilt:-0.16,headPitch:0.04, headYaw:-0.62, bobFactor:0.55 },
  like:    { bodyScale:[1.02,1.01,1.02],  headOffset:[0.02,0.03,0.06], headTilt:0.12,  headPitch:-0.02, bobFactor:1 },
};

const defaultPosture: Posture = {
  bodyScale:[1,1,1], headOffset:[0,0,0], headTilt:0, headPitch:0, headYaw:0,
  bobFactor:1, rootOffset:[0,0,0], rootRotation:0, rootPitch:0,
  orbitRadius:0, orbitSpeed:0, orbitHeight:0,
};

interface SheepModelProps {
  mood: SheepMood;
  celebrationKey?: number;
  onSheepClick?: () => void;
}

export function SheepModel({ mood, celebrationKey = 0, onSheepClick }: SheepModelProps) {
  const rootRef  = useRef<Group>(null);
  const bodyRef  = useRef<Group>(null);
  const headRef  = useRef<Group>(null);
  const earsRef  = useRef<Group>(null);
  const jumpStartedAt     = useRef(-10);
  const lastCelebration   = useRef(celebrationKey);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const posture = postureByMood[mood] ?? defaultPosture;

    if (celebrationKey !== lastCelebration.current) {
      jumpStartedAt.current = time;
      lastCelebration.current = celebrationKey;
    }

    const happyBoost     = mood === 'happy' || mood === 'playful' ? 1.35 : 1;
    const jumpElapsed    = time - jumpStartedAt.current;
    const clickJump      = celebrationKey > 0 && jumpElapsed >= 0 && jumpElapsed < 0.62
      ? Math.sin((jumpElapsed / 0.62) * Math.PI) * sheepTheme.animation.jumpHeight : 0;
    const moodJump       = mood === 'happy'   ? Math.max(0, Math.sin(time * 5.2)) * 0.22 : 0;
    const playfulHop     = mood === 'playful' ? Math.max(0, Math.sin(time * 3.8)) * 0.08 : 0;
    const orbitAngle     = mood === 'playful' ? time * (posture.orbitSpeed ?? 0) : 0;
    const orbitRadius    = posture.orbitRadius ?? 0;
    const orbitHeight    = posture.orbitHeight ?? 0;
    const playfulStride  = mood === 'playful' ? Math.sin(time * 9.4) : 0;
    const playfulLift    = mood === 'playful' ? Math.max(0, Math.sin(time * 9.4 + Math.PI / 2)) : 0;
    const orbitX         = mood === 'playful' ? Math.cos(orbitAngle) * orbitRadius : 0;
    const orbitZ         = mood === 'playful' ? Math.sin(orbitAngle) * orbitRadius : 0;
    const orbitY         = mood === 'playful' ? Math.sin(orbitAngle * 2) * orbitHeight : 0;

    if (rootRef.current) {
      const ro = (posture.rootOffset ?? [0, 0, 0]) as [number, number, number];
      rootRef.current.position.y = 0.03 + ro[1] + orbitY +
        Math.sin(time * 2.1) * sheepTheme.animation.idleBob * posture.bobFactor +
        clickJump + moodJump + playfulHop;
      rootRef.current.position.x = ro[0] + orbitX;
      rootRef.current.position.z = 0.2 + ro[2] + orbitZ;
      rootRef.current.rotation.x = posture.rootPitch ?? 0;
      rootRef.current.rotation.y =
        (posture.rootRotation ?? 0) +
        (mood === 'playful' ? orbitAngle + Math.PI / 2 : 0) +
        Math.sin(time * 0.65) * 0.035;
      rootRef.current.rotation.z = mood === 'playful' ? 0.08 * playfulStride : 0;
    }

    if (bodyRef.current) {
      const breath = 1 + Math.sin(time * 2.6) * sheepTheme.animation.breathScale * happyBoost;
      bodyRef.current.position.set(mood === 'tired' ? -0.24 : 0, mood === 'tired' ? 0.72 : 0, 0);
      if (mood === 'playful') bodyRef.current.position.y = 0.03 + orbitY * 0.35 + playfulLift * 0.06;
      bodyRef.current.scale.set(
        posture.bodyScale[0] * breath,
        posture.bodyScale[1] * (1 + (breath - 1) * 0.45),
        posture.bodyScale[2] * breath,
      );
      bodyRef.current.rotation.z = mood === 'tired' ? -Math.PI / 2 : mood === 'playful' ? 0.08 * playfulStride : 0;
      bodyRef.current.rotation.x = mood === 'playful' ? -0.12 * playfulLift : 0;
    }

    if (headRef.current) {
      headRef.current.position.set(
        posture.headOffset[0],
        sheepTheme.sheep.headY + posture.headOffset[1],
        sheepTheme.sheep.headZ + posture.headOffset[2],
      );
      headRef.current.rotation.z =
        posture.headTilt + Math.sin(time * 1.6) * sheepTheme.animation.headSway * posture.bobFactor;
      headRef.current.rotation.x =
        posture.headPitch + Math.sin(time * 1.15) * 0.035 + (mood === 'playful' ? -0.08 * playfulLift : 0);
      headRef.current.rotation.y =
        (posture.headYaw ?? 0) + (mood === 'dislike' ? Math.sin(time * 1.05) * 0.06 : 0);
      headRef.current.position.z =
        sheepTheme.sheep.headZ + posture.headOffset[2] + (mood === 'playful' ? -0.04 * playfulStride : 0);
    }

    if (earsRef.current) {
      earsRef.current.children.forEach((ear, index) => {
        const tiredDrop = mood === 'tired' || mood === 'tucked' ? 0.12 : 0;
        ear.rotation.z = (index === 0 ? 1 : -1) * (0.14 + tiredDrop + Math.sin(time * 2.8) * 0.06);
      });
    }
  });

  return (
    <group
      ref={rootRef}
      position={[0, 0.03, 0.2]}
      scale={sheepTheme.sheep.scale}
      onClick={(e) => { e.stopPropagation(); onSheepClick?.(); }}
    >
      <SheepLegs mood={mood} />
      <group ref={bodyRef}>
        <SheepBody />
      </group>
      <group ref={headRef} position={[0, sheepTheme.sheep.headY, sheepTheme.sheep.headZ]}>
        <SheepHead />
        <group ref={earsRef}>
          <SheepEars />
        </group>
        <SheepFace mood={mood} />
      </group>
      <MoodEffects mood={mood} />
    </group>
  );
}
