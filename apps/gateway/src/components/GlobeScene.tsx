import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CanvasTexture, MathUtils, type Group } from 'three';

/**
 * The 3D hero: a globe of points with the equator as a fixed red ring.
 * Loaded lazily by HeroGlobe, so three.js never blocks first paint.
 */

const TILT = 0.35; // radians, keep in sync with StaticGlobe

interface Palette {
  ink: string;
  sambal: string;
}

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  return {
    ink: css.getPropertyValue('--ink').trim() || '#0F2A3D',
    sambal: css.getPropertyValue('--sambal').trim() || '#D9301F',
  };
}

function usePalette(): Palette {
  const [palette, setPalette] = useState<Palette>(readPalette);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setPalette(readPalette());
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return palette;
}

/** Evenly spread points on a unit sphere (Fibonacci lattice). */
function spherePoints(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(theta) * r;
  }
  return out;
}

function makeDotTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
  return new CanvasTexture(canvas);
}

function Globe({ palette }: { palette: Palette }) {
  const group = useRef<Group>(null);
  const spin = useRef(0);

  const positions = useMemo(
    () => spherePoints(window.innerWidth < 640 ? 900 : 1800),
    [],
  );
  const dot = useMemo(makeDotTexture, []);
  useEffect(() => () => dot.dispose(), [dot]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    spin.current += delta * 0.12;
    const targetX = TILT - state.pointer.y * 0.25;
    const targetY = spin.current + state.pointer.x * 0.5;
    g.rotation.x = MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, targetY, 3, delta);
  });

  return (
    <group ref={group} rotation-x={TILT}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          alphaTest={0.5}
          transparent
          depthWrite={false}
          color={palette.ink}
          size={0.03}
          sizeAttenuation
        />
      </points>
      {/* The equator. It is a circle around the spin axis, so it stays put while the dots drift. */}
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.004, 0.007, 8, 160]} />
        <meshBasicMaterial color={palette.sambal} />
      </mesh>
    </group>
  );
}

interface Props {
  active: boolean;
  onReady: () => void;
}

export default function GlobeScene({ active, onReady }: Props) {
  const palette = usePalette();
  return (
    <Canvas
      className="globe-canvas"
      camera={{ position: [0, 0, 3.4], fov: 38 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      onCreated={onReady}
    >
      <Globe palette={palette} />
    </Canvas>
  );
}
