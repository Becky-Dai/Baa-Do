/**
 * 中文：只渲染羊头零件（头部 + 耳朵 + 脸部），鼠标跟随转头，带轻微呼吸动画。
 * English: Renders only the sheep head parts (head + ears + face) with mouse tracking and idle animation.
 */
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import type { Group } from 'three';
import { SheepHead } from './SheepHead';
import { SheepEars } from './SheepEars';
import { SheepFace } from './SheepFace';

function SheepHeadOnly() {
  const groupRef = useRef<Group>(null);
  const earsRef  = useRef<Group>(null);
  const target   = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      target.current.yaw   = ((e.clientX / window.innerWidth)  - 0.5) * 1.1;
      target.current.pitch = ((e.clientY / window.innerHeight) - 0.5) * 0.5;
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += (target.current.yaw   - groupRef.current.rotation.y) * 0.12;
      groupRef.current.rotation.x += (target.current.pitch - groupRef.current.rotation.x) * 0.12;
      groupRef.current.position.y  = Math.sin(t * 2.1) * 0.022;
    }
    if (earsRef.current) {
      // slow envelope × fast flick = occasional subtle twitch
      const wiggle = Math.sin(t * 0.38) * Math.sin(t * 4.5) * 0.14;
      earsRef.current.children.forEach((ear, i) => {
        ear.rotation.z = (i === 0 ? 1 : -1) * (0.14 + wiggle);
      });
    }
  });

  return (
    <group ref={groupRef}>
      <SheepHead />
      <group ref={earsRef}>
        <SheepEars />
      </group>
      <SheepFace mood="calm" />
    </group>
  );
}

export function SheepHeadCanvas({ className }: { className?: string }) {
  return (
    <div className={className} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0.15, 2.3], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0.1, 0.35)}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 4]}  intensity={2.0} />
        <directionalLight position={[-2, 2, -1]} intensity={0.5} color="#d4eaff" />
        <pointLight position={[0, 2, 2]} intensity={0.4} color="#fff8f0" />
        <Suspense fallback={null}>
          <SheepHeadOnly />
        </Suspense>
      </Canvas>
    </div>
  );
}
