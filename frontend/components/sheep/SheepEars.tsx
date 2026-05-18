/**
 * 中文：藏在头部羊毛里的温柔小耳朵。
 * English: Small gentle ears tucked into the head wool.
 */
'use client';
import { sheepTheme } from '../../lib/sheepTheme';

export function SheepEars() {
  return (
    <>
      <group position={[-0.55, 0.05, -0.02]} rotation-z={0.1} rotation-y={0.28}>
        <mesh castShadow scale={[1.14, 0.52, 0.24]}>
          <sphereGeometry args={[0.21, 20, 12]} />
          <meshStandardMaterial color={sheepTheme.colors.faceWarm} roughness={0.86} />
        </mesh>
        <mesh position={[0, -0.005, 0.03]} scale={[0.7, 0.28, 0.1]}>
          <sphereGeometry args={[0.17, 16, 10]} />
          <meshStandardMaterial color={sheepTheme.colors.innerEar} roughness={0.82} />
        </mesh>
      </group>
      <group position={[0.55, 0.05, -0.02]} rotation-z={-0.1} rotation-y={-0.28}>
        <mesh castShadow scale={[1.14, 0.52, 0.24]}>
          <sphereGeometry args={[0.21, 20, 12]} />
          <meshStandardMaterial color={sheepTheme.colors.faceWarm} roughness={0.86} />
        </mesh>
        <mesh position={[0, -0.005, 0.03]} scale={[0.7, 0.28, 0.1]}>
          <sphereGeometry args={[0.17, 16, 10]} />
          <meshStandardMaterial color={sheepTheme.colors.innerEar} roughness={0.82} />
        </mesh>
      </group>
    </>
  );
}
