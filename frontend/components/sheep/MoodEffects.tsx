/**
 * 中文：小羊周围的心情特效：爱心/星星/火焰/雨滴/泡泡/床。
 * English: Mood effects around the sheep: hearts, stars, fire, rain, bubbles, bed.
 */
'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { ExtrudeGeometry, Shape } from 'three';
import type { Group } from 'three';
import { sheepTheme } from '../../lib/sheepTheme';
import type { SheepMood } from './SheepModel';

const floaters = [
  [-0.58, 2.02, 0.58, 0],
  [0.02,  2.3,  0.56, 1.2],
  [0.58,  2.02, 0.58, 2.4],
] as const;

const rainDrops = [
  [-0.48, 2.34, 0.58, 0],
  [-0.16, 2.18, 0.56, 0.32],
  [0.16,  2.42, 0.58, 0.64],
  [0.48,  2.22, 0.56, 0.96],
] as const;

function Heart() {
  const heartShape = new Shape();
  heartShape.moveTo(0, -0.38);
  heartShape.bezierCurveTo(-0.66, -0.02, -0.64, 0.45, -0.28, 0.45);
  heartShape.bezierCurveTo(-0.1, 0.45, 0, 0.3, 0, 0.18);
  heartShape.bezierCurveTo(0, 0.3, 0.1, 0.45, 0.28, 0.45);
  heartShape.bezierCurveTo(0.64, 0.45, 0.66, -0.02, 0, -0.38);
  const geometry = new ExtrudeGeometry(heartShape, { depth:0.05, bevelEnabled:true, bevelSize:0.025, bevelThickness:0.018, bevelSegments:5, curveSegments:24 });
  return (
    <group scale={0.34}>
      <mesh geometry={geometry} rotation-y={0.08} position={[0, 0.02, -0.025]}>
        <meshStandardMaterial color={sheepTheme.colors.heart} emissive={sheepTheme.colors.heart} emissiveIntensity={0.12} roughness={0.62} />
      </mesh>
    </group>
  );
}

function Star() {
  return (
    <group scale={0.3}>
      <mesh rotation-z={Math.PI / 4}>
        <boxGeometry args={[0.22, 0.95, 0.1]} />
        <meshStandardMaterial color={sheepTheme.colors.star} emissive={sheepTheme.colors.star} emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation-z={-Math.PI / 4}>
        <boxGeometry args={[0.22, 0.95, 0.1]} />
        <meshStandardMaterial color={sheepTheme.colors.star} emissive={sheepTheme.colors.star} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function Fire() {
  const outerShape = new Shape();
  outerShape.moveTo(0, -0.5);
  outerShape.bezierCurveTo(-0.14, -0.42, -0.3, -0.22, -0.28, 0.02);
  outerShape.bezierCurveTo(-0.25, 0.26, -0.18, 0.42, -0.08, 0.6);
  outerShape.bezierCurveTo(-0.04, 0.72, -0.03, 0.88, 0, 1.02);
  outerShape.bezierCurveTo(0.03, 0.88, 0.04, 0.72, 0.08, 0.6);
  outerShape.bezierCurveTo(0.18, 0.42, 0.25, 0.26, 0.28, 0.02);
  outerShape.bezierCurveTo(0.3, -0.22, 0.14, -0.42, 0, -0.5);
  const innerShape = new Shape();
  innerShape.moveTo(0, -0.28);
  innerShape.bezierCurveTo(-0.07, -0.22, -0.16, -0.08, -0.14, 0.08);
  innerShape.bezierCurveTo(-0.12, 0.22, -0.08, 0.34, -0.03, 0.48);
  innerShape.bezierCurveTo(-0.01, 0.6, -0.01, 0.72, 0, 0.82);
  innerShape.bezierCurveTo(0.01, 0.72, 0.01, 0.6, 0.03, 0.48);
  innerShape.bezierCurveTo(0.08, 0.34, 0.12, 0.22, 0.14, 0.08);
  innerShape.bezierCurveTo(0.16, -0.08, 0.07, -0.22, 0, -0.28);
  return (
    <group scale={0.44}>
      <mesh position={[0, 0.02, 0]} rotation-z={-0.04}>
        <extrudeGeometry args={[outerShape, { depth:0.08, bevelEnabled:true, bevelSize:0.04, bevelThickness:0.02, bevelSegments:4, curveSegments:18 }]} />
        <meshStandardMaterial color="#ff7a2f" emissive="#ff5e1a" emissiveIntensity={0.62} roughness={0.46} />
      </mesh>
      <mesh position={[0, 0.1, 0.03]} rotation-z={-0.02}>
        <extrudeGeometry args={[innerShape, { depth:0.06, bevelEnabled:true, bevelSize:0.022, bevelThickness:0.012, bevelSegments:3, curveSegments:14 }]} />
        <meshStandardMaterial color="#ffd05a" emissive="#ffb431" emissiveIntensity={0.58} roughness={0.38} />
      </mesh>
    </group>
  );
}

function RainDrop() {
  return (
    <group scale={0.42}>
      <mesh scale={[0.5, 0.9, 0.42]}>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial color="#75bde8" transparent opacity={0.82} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.14, 0]} rotation-z={Math.PI / 4} scale={[0.52, 0.52, 0.28]}>
        <boxGeometry args={[0.22, 0.22, 0.08]} />
        <meshStandardMaterial color="#75bde8" transparent opacity={0.82} roughness={0.4} />
      </mesh>
    </group>
  );
}

function GrassBundle() {
  const blades = [[-0.11,0.02,0.42,-0.42],[-0.06,0.04,0.5,-0.24],[0,0.06,0.56,0],[0.06,0.04,0.5,0.24],[0.11,0.02,0.42,0.42],[-0.03,0.03,0.46,-0.1],[0.03,0.03,0.46,0.12]] as const;
  return (
    <group position={[0, -0.1, 0.035]} scale={0.74}>
      {blades.map(([x, y, height, rotation], index) => (
        <group key={`${x}-${rotation}`} position={[0, -0.12, 0]} rotation-z={rotation}>
          <mesh position={[x * 0.25, y + height * 0.5, 0]}>
            <coneGeometry args={[0.035, height, 5]} />
            <meshStandardMaterial color={index % 2 ? sheepTheme.colors.grassDark : sheepTheme.colors.grass} roughness={0.72} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.12, 0.004]} scale={[1.3, 0.34, 0.48]}>
        <sphereGeometry args={[0.12, 14, 8]} />
        <meshStandardMaterial color={sheepTheme.colors.grassDark} roughness={0.74} />
      </mesh>
    </group>
  );
}

function HungryBubble() {
  return (
    <group>
      <mesh scale={[1.25, 0.7, 0.08]}><sphereGeometry args={[0.42, 32, 16]} /><meshStandardMaterial color="#fffdf6" roughness={0.78} /></mesh>
      <mesh position={[-0.18, -0.37, 0]} rotation-z={-0.38} scale={[0.5, 0.24, 0.08]}><sphereGeometry args={[0.18, 18, 10]} /><meshStandardMaterial color="#fffdf6" roughness={0.78} /></mesh>
      <GrassBundle />
    </group>
  );
}

function FullBubble() {
  return (
    <group>
      <mesh scale={[1.0, 0.58, 0.08]}><sphereGeometry args={[0.34, 28, 14]} /><meshStandardMaterial color="#fffdf6" roughness={0.78} /></mesh>
      <mesh position={[0, 0.02, 0.04]} rotation-z={Math.PI / 2}><torusGeometry args={[0.13, 0.018, 8, 24]} /><meshStandardMaterial color={sheepTheme.colors.accentDark} roughness={0.65} /></mesh>
      <mesh position={[0.18, -0.02, 0.04]}><sphereGeometry args={[0.032, 10, 8]} /><meshStandardMaterial color={sheepTheme.colors.accentDark} roughness={0.65} /></mesh>
    </group>
  );
}

function TopDownBed() {
  return (
    <group>
      <mesh position={[0,0,0]} rotation-z={0.02}><boxGeometry args={[0.88,0.56,0.08]} /><meshStandardMaterial color="#e4c8a4" roughness={0.84} /></mesh>
      <mesh position={[0,0,0.03]} rotation-z={0.02}><boxGeometry args={[0.76,0.44,0.06]} /><meshStandardMaterial color="#fbf7ef" roughness={0.94} /></mesh>
      <mesh position={[0,0.17,0.05]} rotation-z={0.02}><boxGeometry args={[0.42,0.14,0.05]} /><meshStandardMaterial color="#ffffff" roughness={0.96} /></mesh>
      <mesh position={[0.34,0.08,0.04]}><boxGeometry args={[0.08,0.4,0.05]} /><meshStandardMaterial color="#caa47d" roughness={0.84} /></mesh>
      <mesh position={[-0.34,0.08,0.04]}><boxGeometry args={[0.08,0.4,0.05]} /><meshStandardMaterial color="#caa47d" roughness={0.84} /></mesh>
    </group>
  );
}

export function MoodEffects({ mood }: { mood: SheepMood }) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.elapsedTime;
    groupRef.current.children.forEach((child, index) => {
      if (mood === 'hungry') { child.position.y = 2.32 + Math.sin(time * 2.1) * 0.06; child.rotation.z = Math.sin(time * 1.8) * 0.04; child.scale.setScalar(1); return; }
      if (mood === 'full')   { child.position.y = 2.18 + Math.sin(time * 1.4) * 0.04; child.rotation.z = Math.sin(time * 1.3) * 0.03; child.scale.setScalar(1); return; }
      if (mood === 'tired')  { child.position.y = 2.18 + Math.sin(time * 1.1) * 0.04; child.rotation.z = Math.sin(time * 1.2) * 0.02; child.scale.setScalar(1); return; }
      if (mood === 'sad') {
        const [, baseY, , phase] = rainDrops[index];
        child.position.y = baseY - ((time * 0.85 + phase) % 1) * 0.6;
        child.rotation.z = -0.18; child.scale.setScalar(1.18); return;
      }
      const [, baseY, , phase] = floaters[index];
      child.position.y = baseY + Math.sin(time * 2.2 + phase) * 0.08;
      child.rotation.z = Math.sin(time * 2.5 + phase) * 0.16;
      child.scale.setScalar(1.25 + Math.sin(time * 3 + phase) * 0.18);
    });
  });

  if (!['happy','like','angry','tired','sad','hungry','full'].includes(mood)) return null;

  if (mood === 'tired')  return <group ref={groupRef}><group position={[0.18,2.18,0.68]}><TopDownBed /></group></group>;
  if (mood === 'full')   return <group ref={groupRef}><group position={[0.26,2.18,0.7]}><FullBubble /></group></group>;
  if (mood === 'hungry') return <group ref={groupRef}><group position={[0.16,2.32,0.72]}><HungryBubble /></group></group>;
  if (mood === 'sad') return (
    <group ref={groupRef}>
      {rainDrops.map(([x,y,z,phase]) => <group key={`rain-${phase}`} position={[x,y,z]}><RainDrop /></group>)}
    </group>
  );

  return (
    <group ref={groupRef}>
      {floaters.map(([x,y,z,phase]) => (
        <group key={`${mood}-${phase}`} position={[x,y,z]}>
          {mood === 'angry' ? <Fire /> : mood === 'like' ? <Heart /> : <Star />}
        </group>
      ))}
    </group>
  );
}
