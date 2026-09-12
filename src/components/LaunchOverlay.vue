<script setup lang="ts">
import { computed } from 'vue';
import { launchState, LAUNCH_DURATION_MS } from '../scripts/launch';
import { prefixedIcon } from '../scripts/iconPrefix';

const { launching, expanded } = launchState;

/**
 * Circle geometry. The wash starts centred on the tile and ends centred on the
 * viewport, travelling with the icon, so the icon stays at the ring's centre.
 */
const geom = computed(() => {
  const l = launching.value;
  if (!l) return null;
  return {
    startCx: l.rect.left + l.rect.width / 2,
    startCy: l.rect.top + l.rect.height / 2,
    endCx: window.innerWidth / 2,
    endCy: window.innerHeight / 2,
    r: Math.hypot(window.innerWidth / 2, window.innerHeight / 2) + 8,
  };
});

const washStyle = computed(() => {
  const g = geom.value;
  if (!g) return {};
  return {
    clipPath: expanded.value ? `circle(${g.r}px at ${g.endCx}px ${g.endCy}px)` : `circle(0px at ${g.startCx}px ${g.startCy}px)`,
  };
});

const rimStyle = computed(() => {
  const g = geom.value;
  if (!g) return {};
  return {
    clipPath: expanded.value ? `circle(${g.r + 14}px at ${g.endCx}px ${g.endCy}px)` : `circle(0px at ${g.startCx}px ${g.startCy}px)`,
  };
});

/** The content box grows from the tile box to the viewport so the icon glides. */
const contentStyle = computed(() => {
  const l = launching.value;
  if (!l) return {};
  return expanded.value
    ? { top: '0px', left: '0px', width: '100%', height: '100%' }
    : { top: `${l.rect.top}px`, left: `${l.rect.left}px`, width: `${l.rect.width}px`, height: `${l.rect.height}px` };
});

/** Start at the source icon's own size so it doesn't jump on click, always growing. */
const iconStyle = computed(() => {
  const l = launching.value;
  if (!l) return {};
  const endSize = Math.max(96, l.iconSize * 1.5);
  const size = expanded.value ? `${endSize}px` : `${l.iconSize}px`;
  return { width: size, height: size };
});
</script>

<template>
  <div
    v-if="launching"
    class="launch-root pointer-events-none fixed inset-0 z-[60] overflow-hidden text-foreground dark:text-darkforeground"
    :style="{ '--launch-duration': `${LAUNCH_DURATION_MS}ms` }"
  >
    <div class="launch-rim absolute inset-0" :class="{ 'is-expanded': expanded }" :style="rimStyle" />
    <div class="launch-wash absolute inset-0 bg-cards dark:bg-darkcards" :class="{ 'is-expanded': expanded }" :style="washStyle" />
    <div class="launch-stage absolute flex flex-col items-center justify-center" :class="{ 'is-expanded': expanded }" :style="contentStyle">
      <span class="launch-halo" />
      <fa-icon :icon="prefixedIcon(launching.button.icon)" class="launch-icon relative" :style="iconStyle" />
    </div>
  </div>
</template>

<style scoped>
/* --launch-duration is injected from LAUNCH_DURATION_MS so TS and CSS share one source. */
.launch-root {
  --launch-ease: cubic-bezier(0.65, 0, 0.35, 1);
}

/* The rim starts as the card colour — invisible over the tile and its neighbours — then
   becomes the accent edge once it has cleared the tile. */
.launch-rim {
  background-color: var(--cards);
  will-change: clip-path, background-color;
  transition: clip-path var(--launch-duration) var(--launch-ease), background-color 0.3s ease 0.22s;
}
.launch-rim.is-expanded {
  background-color: var(--sfg);
}
.dark .launch-rim {
  background-color: var(--darkcards);
}
.dark .launch-rim.is-expanded {
  background-color: var(--darksfg);
}

.launch-wash {
  will-change: clip-path;
  transition: clip-path var(--launch-duration) var(--launch-ease);
}

.launch-stage {
  will-change: top, left, width, height;
  transition: top var(--launch-duration) var(--launch-ease), left var(--launch-duration) var(--launch-ease),
    width var(--launch-duration) var(--launch-ease), height var(--launch-duration) var(--launch-ease);
}

.launch-halo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16rem;
  height: 16rem;
  margin: -8rem 0 0 -8rem;
  border-radius: 9999px;
  background: radial-gradient(circle, var(--sfg), transparent 70%);
  opacity: 0;
  transform: scale(0.4);
  filter: blur(24px);
  transition: opacity 0.3s ease 0.22s, transform var(--launch-duration) var(--launch-ease);
}

.launch-stage.is-expanded .launch-halo {
  opacity: 0.3;
  transform: scale(1.25);
}

.launch-icon {
  transition: width var(--launch-duration) var(--launch-ease), height var(--launch-duration) var(--launch-ease);
}
</style>
