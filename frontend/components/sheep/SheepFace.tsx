/**
 * 中文：小羊脸部：眼睛、眉毛、腮红、鼻子、嘴巴点阵，每种心情一套参数。
 * English: Sheep face: eyes, brows, blush, nose, mouth dots — per-mood settings.
 */
'use client';
import { sheepTheme } from '../../lib/sheepTheme';
import type { SheepMood } from './SheepModel';

interface SheepFaceProps { mood: SheepMood; }

type FacePoint = [number, number];
type MouthShapeKey = keyof typeof mouthShapes;

interface FaceSettings {
  mouth: MouthShapeKey;
  eyeScale: [number, number, number];
  eyeY: number;
  blushOpacity: number;
  brow?: 'soft' | 'angry' | 'tired' | 'dislike';
  noseScale: number;
}

const mouthShapes: Record<string, FacePoint[]> = {
  softW:     [[-0.044,0.009],[-0.032,-0.002],[-0.02,-0.006],[-0.01,0.001],[0,0.008],[0.01,0.001],[0.02,-0.006],[0.032,-0.002],[0.044,0.009]],
  tinySmile: [[-0.038,-0.002],[-0.024,-0.011],[-0.008,-0.014],[0.008,-0.014],[0.024,-0.011],[0.038,-0.002]],
  tired:     [[-0.034,0],[-0.018,-0.004],[0,-0.005],[0.018,-0.004],[0.034,0]],
  frown:     [[-0.036,-0.012],[-0.02,-0.003],[0,0],[0.02,-0.003],[0.036,-0.012]],
  smallO:    [[-0.012,0],[-0.006,-0.01],[0.006,-0.01],[0.012,0],[0.006,0.01],[-0.006,0.01]],
};

const faceByMood: Partial<Record<SheepMood, FaceSettings>> = {
  happy:   { mouth:'tinySmile', eyeScale:[1,1,0.22],    eyeY:0.075, blushOpacity:0.72, noseScale:1    },
  hungry:  { mouth:'smallO',    eyeScale:[1,1.08,0.22], eyeY:0.068, blushOpacity:0.3,  noseScale:0.9  },
  full:    { mouth:'tinySmile', eyeScale:[1,0.78,0.2],  eyeY:0.072, blushOpacity:0.58, noseScale:0.95 },
  tired:   { mouth:'tired',     eyeScale:[1.1,0.45,0.16],eyeY:0.055,blushOpacity:0.22, brow:'tired',  noseScale:0.85 },
  playful: { mouth:'softW',     eyeScale:[1.04,1.04,0.22],eyeY:0.078,blushOpacity:0.64,brow:'soft',   noseScale:1    },
  curious: { mouth:'smallO',   eyeScale:[1.08,1.08,0.22],eyeY:0.08, blushOpacity:0.38, noseScale:0.92 },
  tucked:  { mouth:'tired',    eyeScale:[1,0.58,0.18],  eyeY:0.055, blushOpacity:0.16, brow:'tired',  noseScale:0.8  },
  angry:   { mouth:'frown',    eyeScale:[1,0.75,0.18],  eyeY:0.065, blushOpacity:0.82, brow:'angry',  noseScale:0.95 },
  sad:     { mouth:'frown',    eyeScale:[1,0.7,0.18],   eyeY:0.055, blushOpacity:0.16, brow:'tired',  noseScale:0.85 },
  dislike: { mouth:'frown',    eyeScale:[1,0.72,0.18],  eyeY:0.06,  blushOpacity:0.12, brow:'dislike',noseScale:0.9  },
  like:    { mouth:'tinySmile',eyeScale:[1.05,1.05,0.22],eyeY:0.078,blushOpacity:0.86, brow:'soft',   noseScale:1    },
};

const defaultFace: FaceSettings = {
  mouth: 'softW', eyeScale:[1,1,0.22], eyeY:0.07, blushOpacity:0.44, noseScale:1,
};

function MouthDot({ position }: { position: FacePoint }) {
  return (
    <mesh position={[position[0], position[1], 0]}>
      <sphereGeometry args={[0.006, 10, 8]} />
      <meshStandardMaterial color={sheepTheme.colors.mouth} roughness={0.72} />
    </mesh>
  );
}

function Brow({ type }: { type: FaceSettings['brow'] }) {
  if (!type) return null;
  const rotation = type === 'angry' ? 0.28 : type === 'dislike' ? -0.18 : type === 'tired' ? 0.06 : -0.06;
  const y = type === 'tired' ? 0.16 : 0.17;
  return (
    <>
      <mesh position={[-0.17, y, 0.02]} rotation-z={rotation}>
        <boxGeometry args={[0.07, 0.008, 0.008]} />
        <meshStandardMaterial color={sheepTheme.colors.mouth} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0.17, y, 0.02]} rotation-z={-rotation}>
        <boxGeometry args={[0.07, 0.008, 0.008]} />
        <meshStandardMaterial color={sheepTheme.colors.mouth} transparent opacity={0.72} />
      </mesh>
    </>
  );
}

export function SheepFace({ mood }: SheepFaceProps) {
  const face = faceByMood[mood] ?? defaultFace;
  const mouthY = mood === 'happy' || mood === 'like' ? -0.13 : -0.142;
  const mouthScale = mood === 'playful' || mood === 'like' ? 1.04 : 1;
  const mouthDots = mouthShapes[face.mouth];
  const blushMaterial = (
    <meshStandardMaterial color={sheepTheme.colors.blush} roughness={0.65} transparent opacity={face.blushOpacity} />
  );
  return (
    <group position={[0, 0, 0.64]}>
      <mesh position={[-0.17, face.eyeY, 0.015]} scale={face.eyeScale}>
        <sphereGeometry args={[0.064, 20, 14]} />
        <meshStandardMaterial color={sheepTheme.colors.eye} roughness={0.38} metalness={0.04} />
      </mesh>
      <mesh position={[-0.19, face.eyeY + 0.025, 0.038]} scale={[1, 1, 0.18]}>
        <sphereGeometry args={[0.012, 8, 6]} />
        <meshBasicMaterial color={sheepTheme.colors.eyeShine} />
      </mesh>
      <mesh position={[0.17, face.eyeY, 0.015]} scale={face.eyeScale}>
        <sphereGeometry args={[0.064, 20, 14]} />
        <meshStandardMaterial color={sheepTheme.colors.eye} roughness={0.38} metalness={0.04} />
      </mesh>
      <mesh position={[0.15, face.eyeY + 0.025, 0.038]} scale={[1, 1, 0.18]}>
        <sphereGeometry args={[0.012, 8, 6]} />
        <meshBasicMaterial color={sheepTheme.colors.eyeShine} />
      </mesh>
      <Brow type={face.brow} />
      <mesh position={[-0.29, -0.075, 0.01]} scale={[1.08, 0.64, 0.08]}>
        <sphereGeometry args={[0.048, 14, 8]} />{blushMaterial}
      </mesh>
      <mesh position={[0.29, -0.075, 0.01]} scale={[1.08, 0.64, 0.08]}>
        <sphereGeometry args={[0.048, 14, 8]} />{blushMaterial}
      </mesh>
      <mesh position={[0, -0.058, 0.02]} scale={[face.noseScale, 0.7 * face.noseScale, 0.1]}>
        <sphereGeometry args={[0.018, 12, 8]} />
        <meshStandardMaterial color={sheepTheme.colors.mouth} roughness={0.65} />
      </mesh>
      <group position={[0, mouthY, 0.026]} scale={mouthScale}>
        {mouthDots.map((point) => (
          <MouthDot key={`${face.mouth}-${point[0]}-${point[1]}`} position={point} />
        ))}
      </group>
    </group>
  );
}
