import { nextTick, ref, shallowRef } from 'vue';
import { config } from '../../config';
import type { Button } from '../types/config';

/** Keep in sync with `--launch-duration` in LaunchOverlay (both read from here). */
export const LAUNCH_DURATION_MS = 620;

export interface LaunchState {
  button: Button;
  /** Rendered size of the source icon, so the overlay starts exactly where it left off. */
  iconSize: number;
  rect: { top: number; left: number; width: number; height: number };
}

/**
 * Launch state. This is deliberately module-level: there is exactly one
 * `<LaunchOverlay>` for the whole app, and any tile in any layout can start it.
 */
// shallowRef so the stored button stays the same object reference (`isLaunching` compares it).
const launching = shallowRef<LaunchState | null>(null);
const expanded = ref(false);

/** Open a link in a new tab without handing over `window.opener`. */
const openExternal = (url: string) => window.open(url, '_blank', 'noopener');

/**
 * Grow the clicked tile into a full-screen surface, then open its link. External
 * pages can't take part in a transition, so this is a local effect that plays out
 * before navigating. Tiles call this from their click handler.
 */
const launch = async (event: MouseEvent, button: Button) => {
  if (!config.openInNewTab) return; // let the browser navigate normally

  event.preventDefault();
  if (launching.value) return;

  if (!config.launchAnimation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    openExternal(button.url);
    return;
  }

  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const iconEl = el.querySelector('svg');
  launching.value = {
    button,
    iconSize: iconEl ? iconEl.getBoundingClientRect().width : 28,
    rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
  };
  expanded.value = false;

  await nextTick();
  // Two frames so the browser paints the tile-sized starting frame first.
  requestAnimationFrame(() => requestAnimationFrame(() => (expanded.value = true)));

  window.setTimeout(() => {
    openExternal(button.url);
    launching.value = null;
    expanded.value = false;
  }, LAUNCH_DURATION_MS);
};

/** True when the given tile is the one currently launching. */
const isLaunching = (button: Button) => launching.value?.button === button;

export const launchState = { launching, expanded, launch, isLaunching };
