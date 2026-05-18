/**
 * 中文：四条短腿，根据心情有不同的前爪动作。
 * English: Four short legs with mood-specific paw motions.
 */
'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { sheepTheme } from '../../lib/sheepTheme';
import type { SheepMood } from './SheepModel';

const legs = [
  [-0.42, 0.3, 0.03],
  [0.42, 0.3, -0.03],
  [-0.36, -0.3, -0.02],
  [0.36, -0.3, 0.02],
] as const;

export function SheepLegs({ mood }: { mood: SheepMood }) {
  const legRefs = useRef<Array<Group | null>>([]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    legRefs.current.forEach((leg, index) => {
      if (!leg) return;
      const [x, z, lean] = legs[index];
      const isFrontLeg = index < 2;
      leg.position.set(x, 0.2, z);
      leg.rotation.set(0, 0, lean);

      if (mood === 'hungry' && isFrontLeg) {
        const phase = index === 0 ? 0 : Math.PI;
        const scratch = Math.max(0, Math.sin(time * 8 + phase));
        leg.position.z = z - scratch * 0.16;
        leg.rotation.x = -0.65 * scratch;
        leg.position.y = 0.19 - scratch * 0.035;
      }
      if (mood === 'full' && isFrontLeg) {
        const pat = Math.sin(time * 5 + index * Math.PI) * 0.035;
        leg.position.x = x * 0.86;
        leg.position.y = 0.29 + pat;
        leg.position.z = 0.4;
        leg.rotation.x = -0.38;
        leg.rotation.z = lean * 0.6;
      }
      if (mood === 'tucked' && isFrontLeg) {
        leg.position.x = x * 0.72;
        leg.position.y = 0.16;
        leg.position.z = z - 0.05;
        leg.rotation.x = 0.18;
      }
      if (mood === 'playful') {
        const diagonalPhase = (index === 0 || index === 3) ? 0 : Math.PI;
        const stride = Math.sin(time * 9.4 + diagonalPhase);
        const lift = Math.max(0, Math.sin(time * 9.4 + diagonalPhase + Math.PI / 2));
        const forward = isFrontLeg ? 1 : -1;
        leg.position.x = x + forward * 0.1 * stride;
        leg.position.y = 0.2 + lift * 0.14;
        leg.position.z = z + forward * 0.12 * stride;
        leg.rotation.x = -0.72 * stride;
        leg.rotation.z = lean + (isFrontLeg ? -0.1 : 0.1) * stride;
      }
      if (mood === 'tired') {
        const tiredFeet = [
          [-0.14, 0.34, 0.34, 1.08],
          [-0.2, 0.28, 0.16, 1.0],
          [-0.12, 0.3, -0.18, 1.04],
          [-0.18, 0.24, -0.36, 0.96],
        ] as const;
        const [tx, ty, tz, rz] = tiredFeet[index];
        leg.position.x = tx; leg.position.y = ty; leg.position.z = tz;
        leg.rotation.x = 0.78; leg.rotation.y = Math.PI; leg.rotation.z = rz;
      }
    });
  });

  return (
    <group>
      {legs.map(([x, z, lean], index) => (
        <group
          key={`${x}-${z}`}
          ref={(node) => { legRefs.current[index] = node; }}
          position={[x, 0.2, z]}
          rotation-z={lean}
        >
          <mesh castShadow position={[0, 0.24, 0]} scale={[1.12, 0.52, 1.05]}>
            <sphereGeometry args={[0.18, 18, 10]} />
            <meshStandardMaterial color={sheepTheme.colors.woolShadow} roughness={0.92} />
          </mesh>
          <mesh castShadow position={[0, 0.11, 0]} scale={[0.9, 1, 0.86]}>
            <cylinderGeometry args={[0.12, 0.14, 0.28, 18]} />
            <meshStandardMaterial color={sheepTheme.colors.faceWarm} roughness={0.86} />
          </mesh>
          <mesh castShadow position={[0, -0.04, 0.04]} scale={[1.08, 0.46, 1.08]}>
            <sphereGeometry args={[0.145, 16, 10]} />
            <meshStandardMaterial color={sheepTheme.colors.hoof} roughness={0.78} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
