/**
 * 中文：点击小羊时弹出的短暂庆祝特效（爱心和星星）。
 * English: Short-lived celebration particles (hearts and stars) that appear when the sheep is clicked.
 */
'use client';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { ExtrudeGeometry, Shape } from 'three';
import type { Group } from 'three';
import { sheepTheme } from '../../lib/sheepTheme';

const particles = [
  { kind: 'heart', x: -0.72, y: 1.75, z: 0.58, delay: 0.0 },
  { kind: 'star',  x:  0.72, y: 1.88, z: 0.52, delay: 0.08 },
  { kind: 'heart', x:  0.1,  y: 2.28, z: 0.42, delay: 0.16 },
] as const;

function Heart({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const s = new Shape();
    s.moveTo(0, -0.38);
    s.bezierCurveTo(-0.66, -0.02, -0.64, 0.45, -0.28, 0.45);
    s.bezierCurveTo(-0.1, 0.45, 0, 0.3, 0, 0.18);
    s.bezierCurveTo(0, 0.3, 0.1, 0.45, 0.28, 0.45);
    s.bezierCurveTo(0.64, 0.45, 0.66, -0.02, 0, -0.38);
    return new ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.018, bevelSegments: 5, curveSegments: 24 });
  }, []);
  return (
    <group scale={0.22}>
      <mesh geometry={geometry} rotation-y={0.08} position={[0, 0.02, -0.025]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.16} roughness={0.62} />
      </mesh>
    </group>
  );
}

function Star({ color }: { color: string }) {
  return (
    <group scale={0.18}>
      <mesh rotation-z={Math.PI / 4}>
        <boxGeometry args={[0.24, 1.05, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      <mesh rotation-z={-Math.PI / 4}>
        <boxGeometry args={[0.24, 1.05, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export function CelebrationEffects({ activeKey }: { activeKey: number }) {
  const groupRef = useRef<Group>(null);
  const startedAt = useRef(-10);
  const lastActiveKey = useRef(activeKey);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (activeKey !== lastActiveKey.current) {
      startedAt.current = clock.elapsedTime;
      lastActiveKey.current = activeKey;
    }
    const elapsed = clock.elapsedTime - startedAt.current;
    const visible = activeKey > 0 && elapsed >= 0 && elapsed < 1.2;
    groupRef.current.visible = visible;
    if (visible) {
      groupRef.current.children.forEach((child, index) => {
        const progress = Math.max(0, Math.min(1, elapsed - particles[index].delay));
        child.position.y = particles[index].y + progress * 0.55;
        child.scale.setScalar(0.7 + Math.sin(progress * Math.PI) * 0.5);
        child.rotation.z = Math.sin(elapsed * 5 + index) * 0.25;
      });
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {particles.map((p) => (
        <group key={`${p.kind}-${p.x}`} position={[p.x, p.y, p.z]}>
          {p.kind === 'heart' ? <Heart color={sheepTheme.colors.heart} /> : <Star color={sheepTheme.colors.star} />}
        </group>
      ))}
    </group>
  );
}
