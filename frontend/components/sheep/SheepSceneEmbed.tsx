/**
 * 中文：透明 Canvas 嵌入场景，包含地面、栅栏、灯光、小羊和庆祝特效。
 * English: Transparent Canvas scene with ground, fence, lights, sheep, and celebration effects.
 */
'use client';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { sheepTheme } from '../../lib/sheepTheme';
import type { PlacedDecoration } from '../../types/economy';
import type { SheepMood } from './SheepModel';
import { SheepModel } from './SheepModel';
import { CelebrationEffects } from './CelebrationEffects';

function Stone() {
  return (
    <mesh castShadow scale={[1.1, 0.62, 0.85]}>
      <sphereGeometry args={[0.13, 14, 10]} />
      <meshStandardMaterial color={sheepTheme.colors.stone} roughness={0.8} />
    </mesh>
  );
}

function Flower() {
  return (
    <group>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
        <meshStandardMaterial color={sheepTheme.colors.grassDark} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.07, 12, 8]} />
        <meshStandardMaterial color={sheepTheme.colors.flowerPink} roughness={0.6} emissive={sheepTheme.colors.flowerPink} emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

function Log() {
  return (
    <mesh castShadow rotation-z={Math.PI / 2} position={[0, 0.07, 0]}>
      <cylinderGeometry args={[0.07, 0.09, 0.35, 10]} />
      <meshStandardMaterial color={sheepTheme.colors.fenceDark} roughness={0.9} />
    </mesh>
  );
}

const decoComponents: Record<string, () => React.ReactElement> = {
  '石头': Stone,
  '小花': Flower,
  '木桩': Log,
};

function PlacedItems({ items }: { items: PlacedDecoration[] }) {
  return (
    <>
      {items.map((item) => {
        const Component = decoComponents[item.itemName];
        if (!Component) return null;
        return (
          <group key={item.id} position={[item.x, 0, item.z]}>
            <Component />
          </group>
        );
      })}
    </>
  );
}

function Ground({ isDecorating, onGroundClick }: { isDecorating?: boolean; onGroundClick?: (x: number, z: number) => void }) {
  const flowers = [
    [-2.3, -1.15, 0.08],
    [2.1, -0.85, -0.05],
    [-1.5, 1.75, 0.0],
    [2.5, 1.35, 0.05],
  ] as const;

  return (
    <group>
      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, -0.02, 0]}
        onClick={isDecorating ? (e) => { e.stopPropagation(); onGroundClick?.(e.point.x, e.point.z); } : undefined}
        onPointerOver={isDecorating ? () => { document.body.style.cursor = 'crosshair'; } : undefined}
        onPointerOut={isDecorating ? () => { document.body.style.cursor = ''; } : undefined}
      >
        <circleGeometry args={[5.2, 72]} />
        <meshStandardMaterial color={sheepTheme.colors.grass} roughness={0.85} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.035, 0]}>
        <ringGeometry args={[4.55, 5.2, 72]} />
        <meshStandardMaterial color={sheepTheme.colors.grassDark} roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.004, 0.28]} scale={[1.28, 0.56, 1]}>
        <circleGeometry args={[0.72, 40]} />
        <meshBasicMaterial color="#45613d" transparent opacity={0.13} depthWrite={false} />
      </mesh>
      {flowers.map(([x, z, rotation], index) => (
        <group key={`${x}-${z}`} position={[x, 0.03, z]} rotation-y={rotation}>
          <mesh position={[0, 0.035, 0]}>
            <sphereGeometry args={[0.055, 12, 8]} />
            <meshStandardMaterial
              color={index % 2 ? sheepTheme.colors.flowerYellow : sheepTheme.colors.flowerPink}
            />
          </mesh>
          <mesh position={[0, 0.015, 0.05]}>
            <boxGeometry args={[0.025, 0.03, 0.1]} />
            <meshStandardMaterial color={sheepTheme.colors.grassDark} />
          </mesh>
        </group>
      ))}
      <mesh position={[-2.7, 0.04, 1.0]} castShadow>
        <sphereGeometry args={[0.12, 16, 10]} />
        <meshStandardMaterial color={sheepTheme.colors.stone} roughness={0.75} />
      </mesh>
    </group>
  );
}

function Fence() {
  const backPosts = [-3.1, -2.1, -1.1, -0.1, 0.9, 1.9, 2.9];
  return (
    <group position={[0, 0, -1.75]}>
      {backPosts.map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow position={[0, 0.45, 0]}>
            <boxGeometry args={[0.16, 0.9, 0.16]} />
            <meshStandardMaterial color={sheepTheme.colors.fenceDark} roughness={0.82} />
          </mesh>
          <mesh castShadow position={[0, 0.94, 0]} rotation-y={Math.PI / 4}>
            <coneGeometry args={[0.14, 0.22, 4]} />
            <meshStandardMaterial color={sheepTheme.colors.fence} roughness={0.82} />
          </mesh>
        </group>
      ))}
      <mesh castShadow position={[0, 0.42, 0]}>
        <boxGeometry args={[6.6, 0.11, 0.11]} />
        <meshStandardMaterial color={sheepTheme.colors.fence} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[6.6, 0.11, 0.11]} />
        <meshStandardMaterial color={sheepTheme.colors.fence} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.72} />
      <hemisphereLight args={['#dff5ff', '#95c26f', 1.1]} />
      <directionalLight
        castShadow
        color="#fff7df"
        intensity={1.55}
        position={[3.8, 5.2, 3.5]}
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
}

interface SheepSceneEmbedProps {
  mood: SheepMood;
  celebrationKey: number;
  onSheepClick: () => void;
  isDecorating?: boolean;
  placedDecorations?: PlacedDecoration[];
  onGroundClick?: (x: number, z: number) => void;
}

export function SheepSceneEmbed({
  mood, celebrationKey, onSheepClick,
  isDecorating = false, placedDecorations = [], onGroundClick,
}: SheepSceneEmbedProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2.2, 7.0], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Ground isDecorating={isDecorating} onGroundClick={onGroundClick} />
        <Fence />
        <PlacedItems items={placedDecorations} />
        <group scale={0.72}>
          <SheepModel mood={mood} celebrationKey={celebrationKey} onSheepClick={onSheepClick} />
          <CelebrationEffects activeKey={celebrationKey} />
        </group>
      </Suspense>
    </Canvas>
  );
}
