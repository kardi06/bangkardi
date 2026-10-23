import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import StaticGlobe from './StaticGlobe';

// three.js lives in its own chunk, fetched only when the 3D globe is switched on.
const GlobeScene = lazy(() => import('./GlobeScene'));

const STORAGE_KEY = 'globe-3d';

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function readPreference(): 'on' | 'off' | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'on' || value === 'off' ? value : null;
  } catch {
    return null;
  }
}

export default function HeroGlobe() {
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const stage = useRef<HTMLDivElement>(null);

  // Decide once on the client. The server always renders the static globe.
  useEffect(() => {
    const ok = hasWebGL();
    const preference = readPreference();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    setSupported(ok);
    setEnabled(ok && (preference === 'on' || (preference !== 'off' && !reducedMotion && !saveData)));
    setMounted(true);
  }, []);

  // Stop rendering frames while the globe is scrolled out of view.
  useEffect(() => {
    const el = stage.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    if (!next) setReady(false);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
    } catch {
      /* private mode: the choice just won't persist */
    }
  };

  return (
    <>
      <div className="globe-stage" ref={stage}>
        <StaticGlobe hidden={enabled && ready} />
        {enabled && (
          <Suspense fallback={null}>
            <GlobeScene active={visible} onReady={() => setReady(true)} />
          </Suspense>
        )}
      </div>
      {mounted && supported && (
        <button type="button" className="toggle" aria-pressed={enabled} onClick={toggle}>
          3D globe: {enabled ? 'on' : 'off'}
        </button>
      )}
    </>
  );
}
