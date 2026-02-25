/**
 * zone-flags.ts — Loaded BEFORE zone.js to disable unnecessary event patching.
 * This reduces main-thread blocking time by preventing zone.js from wrapping
 * high-frequency browser events that Angular doesn't need to track for change detection.
 */

// Disable patching of high-frequency scroll/resize events
(window as any).__zone_symbol__UNPATCHED_EVENTS = [
  'scroll',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchend',
  'touchmove',
  'wheel',
  'resize',
];

// Disable patching requestAnimationFrame (not needed for CD cycle)
(window as any).__Zone_disable_requestAnimationFrame = true;
