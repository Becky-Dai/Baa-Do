/**
 * 中文：圆润羊头、柔软头顶羊毛和自然脸部。
 * English: Rounded sheep head, soft wool cap, and natural muzzle.
 */
'use client';
import { sheepTheme } from '../../lib/sheepTheme';

const capPuffs = [
  [-0.36, 0.34, 0, 0.19, 1.1, 0.9, 0.95],
  [-0.14, 0.47, 0.04, 0.23, 1, 0.88, 0.92],
  [0.14, 0.45, 0.02, 0.22, 1.08, 0.9, 0.95],
  [0.38, 0.32, 0, 0.18, 1, 0.9, 0.92],
  [-0.48, 0.12, 0.08, 0.16, 0.9, 1, 0.85],
  [0.48, 0.12, 0.08, 0.16, 0.9, 1, 0.85],
  [-0.4, -0.12, 0.1, 0.13, 0.86, 1, 0.78],
  [0.4, -0.12, 0.1, 0.13, 0.86, 1, 0.78],
] as const;

export function SheepHead() {
  return (
    <group>
      <mesh castShadow receiveShadow scale={[1.02, 0.96, 0.92]}>
        <sphereGeometry args={[0.58, 32, 22]} />
        <meshStandardMaterial color={sheepTheme.colors.wool} roughness={0.9} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.06, 0.34]} scale={[0.9, 0.72, 0.56]}>
        <sphereGeometry args={[0.48, 32, 20]} />
        <meshStandardMaterial color={sheepTheme.colors.face} roughness={0.86} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.28, 0.2]} scale={[1.05, 0.48, 0.58]}>
        <sphereGeometry args={[0.38, 24, 14]} />
        <meshStandardMaterial color={sheepTheme.colors.wool} roughness={0.94} />
      </mesh>
      {capPuffs.map(([x, y, z, radius, sx, sy, sz]) => (
        <mesh key={`${x}-${radius}`} castShadow position={[x, y, z]} scale={[sx, sy, sz]}>
          <sphereGeometry args={[radius, 18, 12]} />
          <meshStandardMaterial color={sheepTheme.colors.wool} roughness={0.93} />
        </mesh>
      ))}
    </group>
  );
}
