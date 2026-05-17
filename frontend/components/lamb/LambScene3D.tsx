/**
 * 中文：3D 卡通小羊场景，使用 MeshToonMaterial 实现可爱卡通渲染风格。
 * English: 3D cartoon lamb scene using MeshToonMaterial for a cute cel-shaded look.
 */

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function useToon(color: string) {
  return useMemo(() => {
    const gradientMap = new THREE.DataTexture(
      new Uint8Array([80, 180, 255]),
      3, 1,
      THREE.RedFormat
    );
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.needsUpdate = true;
    return new THREE.MeshToonMaterial({ color, gradientMap });
  }, [color]);
}

function Lamb({ woolColor }: { woolColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const woolMat  = useToon(woolColor);
  const skinMat  = useToon('#f2c98a');
  const darkMat  = useToon('#1a0f08');
  const pinkMat  = useToon('#f4a0b0');
  const hoofMat  = useToon('#3b2510');

  // Wool dome — arranged in concentric rings for fluffy look
  const woolBumps: [number, number, number][] = [
    [0, 0.82, 0],
    [0.32, 0.74, 0.18], [-0.32, 0.74, 0.18],
    [0.32, 0.74, -0.18], [-0.32, 0.74, -0.18],
    [0, 0.7, 0.38], [0, 0.7, -0.38],
    [0.55, 0.55, 0], [-0.55, 0.55, 0],
    [0.45, 0.58, 0.3], [-0.45, 0.58, 0.3],
    [0.45, 0.58, -0.3], [-0.45, 0.58, -0.3],
    [0, 0.5, 0.6], [0, 0.5, -0.6],
  ];

  const legPositions: [number, number, number][] = [
    [0.3, -0.72, 0.28],
    [-0.3, -0.72, 0.28],
    [0.3, -0.72, -0.28],
    [-0.3, -0.72, -0.28],
  ];

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh material={woolMat} scale={[1.3, 1.05, 1.15]} castShadow>
        <sphereGeometry args={[0.72, 20, 20]} />
      </mesh>

      {/* Wool bumps */}
      {woolBumps.map((pos, i) => (
        <mesh key={i} position={pos} material={woolMat} castShadow>
          <sphereGeometry args={[0.22, 10, 10]} />
        </mesh>
      ))}

      {/* Neck */}
      <mesh position={[0, 0.62, 0.65]} material={skinMat}>
        <sphereGeometry args={[0.26, 10, 10]} />
      </mesh>

      {/* Head — large for cute proportion */}
      <mesh position={[0, 0.72, 1.05]} material={skinMat} castShadow>
        <sphereGeometry args={[0.44, 20, 20]} />
      </mesh>

      {/* Snout */}
      <mesh position={[0, 0.58, 1.42]} scale={[0.75, 0.6, 0.55]} material={skinMat}>
        <sphereGeometry args={[0.26, 14, 14]} />
      </mesh>

      {/* Nose (pink) */}
      <mesh position={[0, 0.62, 1.66]} material={pinkMat}>
        <sphereGeometry args={[0.08, 10, 10]} />
      </mesh>

      {/* Eyes — big */}
      <mesh position={[0.22, 0.82, 1.4]} material={darkMat}>
        <sphereGeometry args={[0.09, 12, 12]} />
      </mesh>
      <mesh position={[-0.22, 0.82, 1.4]} material={darkMat}>
        <sphereGeometry args={[0.09, 12, 12]} />
      </mesh>
      {/* Eye whites / shine */}
      <mesh position={[0.25, 0.85, 1.48]}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position={[-0.19, 0.85, 1.48]}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Ears — floppy */}
      <mesh position={[0.48, 0.98, 0.88]} rotation={[0.3, 0.1, 0.7]} scale={[0.42, 0.85, 0.25]} material={skinMat}>
        <sphereGeometry args={[0.26, 10, 10]} />
      </mesh>
      <mesh position={[-0.48, 0.98, 0.88]} rotation={[0.3, -0.1, -0.7]} scale={[0.42, 0.85, 0.25]} material={skinMat}>
        <sphereGeometry args={[0.26, 10, 10]} />
      </mesh>
      {/* Ear inner pink */}
      <mesh position={[0.47, 0.97, 0.92]} rotation={[0.3, 0.1, 0.7]} scale={[0.22, 0.55, 0.15]} material={pinkMat}>
        <sphereGeometry args={[0.22, 8, 8]} />
      </mesh>
      <mesh position={[-0.47, 0.97, 0.92]} rotation={[0.3, -0.1, -0.7]} scale={[0.22, 0.55, 0.15]} material={pinkMat}>
        <sphereGeometry args={[0.22, 8, 8]} />
      </mesh>

      {/* Legs — short and stubby */}
      {legPositions.map((pos, i) => (
        <mesh key={i} position={pos} material={skinMat} castShadow>
          <cylinderGeometry args={[0.11, 0.1, 0.5, 10]} />
        </mesh>
      ))}
      {/* Hooves */}
      {legPositions.map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1] - 0.3, pos[2]]} material={hoofMat}>
          <cylinderGeometry args={[0.11, 0.11, 0.12, 10]} />
        </mesh>
      ))}

      {/* Tail */}
      <mesh position={[0, 0.1, -0.9]} material={woolMat}>
        <sphereGeometry args={[0.18, 10, 10]} />
      </mesh>
    </group>
  );
}

interface LambScene3DProps {
  appearance?: 'white' | 'milktea' | 'curly';
  onClick?: () => void;
}

export default function LambScene3D({ appearance = 'milktea', onClick }: LambScene3DProps) {
  const woolColor = appearance === 'milktea' ? '#c9a068' : '#f0ece4';

  return (
    <div
      style={{ width: 340, height: 340, cursor: 'pointer' }}
      onClick={onClick}
      title="点击喂食"
    >
      <Canvas camera={{ position: [0, 1.4, 4.5], fov: 40 }} shadows>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 8, 6]} intensity={2} castShadow />
        <directionalLight position={[-3, 4, -2]} intensity={0.6} color="#ffe8d0" />
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <Lamb woolColor={woolColor} />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
