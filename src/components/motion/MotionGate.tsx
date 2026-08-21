/**
 * Sets `html.motion-ready` before first paint, and only when JS is running
 * and the visitor has not requested reduced motion. Everything in the motion
 * layer is scoped to that class, so:
 *
 *   - JS disabled      -> class never set -> all content renders visible
 *   - reduced motion   -> class never set -> all content renders visible
 *   - otherwise        -> class set pre-paint, so there is no flash of
 *                         already-visible content before it animates in
 *
 * Runs as a blocking inline script on purpose: it is a few hundred bytes and
 * must execute before the first paint to avoid a flash.
 */
export function MotionGate() {
  const script = `(function(){try{
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.classList.add('motion-ready');
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
