/**
 * Sets `html.consent-pending` before first paint, and only when the visitor
 * has not already answered the consent prompt.
 *
 * Why this exists rather than the banner just gating itself on a useEffect:
 * `ConsentBanner` used to render null on the server and appear only after
 * hydration plus a localStorage read. That made it the last thing to paint,
 * and because nothing else in the mobile viewport qualified as a Largest
 * Contentful Paint candidate, it *became* the LCP element — so mobile LCP was
 * measuring "time until the consent banner hydrates" (~3.3s of render delay)
 * rather than when the page became useful.
 *
 * The banner is now server-rendered and revealed by CSS, so it paints with
 * everything else. This is the same pre-paint gate pattern as MotionGate, and
 * it exists for the same reason: no flash of content that should not have been
 * shown to this visitor.
 *
 * Runs as a blocking inline script on purpose — it is a few hundred bytes and
 * must execute before the first paint.
 */
export function ConsentGate() {
  const script = `(function(){try{
if(window.localStorage.getItem('redemption-consent')===null)
document.documentElement.classList.add('consent-pending');
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
