/**
 * Static stand-in for the 3D globe. Renders on the server, so the page is
 * complete without JavaScript, under reduced motion, or without WebGL.
 * Tilt matches GlobeScene (about 20 degrees, north pole toward the viewer).
 */
export default function StaticGlobe({ hidden = false }: { hidden?: boolean }) {
  return (
    <svg
      className={hidden ? 'static-globe is-hidden' : 'static-globe'}
      viewBox="-110 -110 220 220"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeWidth="1">
        <ellipse className="sg-line" rx="50" ry="100" />
        <ellipse className="sg-line" rx="86.6" ry="100" />
        <line className="sg-line" x1="0" y1="-100" x2="0" y2="100" />
        <ellipse className="sg-line" cy="-47" rx="86.6" ry="29.6" />
        <ellipse className="sg-line" cy="47" rx="86.6" ry="29.6" />
        <ellipse className="sg-line" cy="-81.4" rx="50" ry="17.1" />
        <ellipse className="sg-line" cy="81.4" rx="50" ry="17.1" />
        <circle className="sg-outline" r="100" strokeWidth="1.5" />
        <ellipse className="sg-eq" rx="100" ry="34.2" strokeWidth="3" />
      </g>
    </svg>
  );
}
