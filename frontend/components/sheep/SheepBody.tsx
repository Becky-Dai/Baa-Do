/**
 * 中文：小羊羊毛身体和小尾巴。
 * English: Sheep wool body and fluffy tail.
 */
'use client';
import { sheepTheme } from '../../lib/sheepTheme';

const bodyClouds = [
  [0, 0.02, 0, 0.68, 1.02, 0.78, 1.34],
  [-0.18, 0.06, 0.34, 0.56, 1.04, 0.76, 0.9],
  [0.16, 0.03, -0.36, 0.58, 1.08, 0.78, 0.96],
] as const;

export function SheepBody() {
  return (
    <group position={[0, sheepTheme.sheep.bodyY, 0]}>
      {bodyClouds.map(([x, y, z, radius, sx, sy, sz]) => (
        <mesh key={`cloud-${x}-${z}`} castShadow receiveShadow position={[x, y, z]} scale={[sx, sy, sz]}>
          <sphereGeometry args={[radius, 40, 24]} />
          <meshStandardMaterial color={sheepTheme.colors.wool} roughness={0.96} />
        </mesh>
      ))}
      <mesh castShadow receiveShadow position={[0.02, -0.03, 0]} scale={[1.05, 0.52, 1.14]}>
        <sphereGeometry args={[0.62, 36, 20]} />
        <meshStandardMaterial color={sheepTheme.colors.woolShadow} roughness={0.98} />
      </mesh>
      <mesh castShadow position={[0, 0.02, -0.84]} scale={[1.12, 0.86, 1]}>
        <sphereGeometry args={[0.15, 18, 12]} />
        <meshStandardMaterial color={sheepTheme.colors.wool} roughness={0.96} />
      </mesh>
    </group>
  );
}
