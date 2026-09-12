<script setup lang="ts">
/**
 * "Editorial" layout.
 * Left-aligned hero, a full-width search, and one unified labelled grid: six icon
 * tiles over list panels. Composes the shared composables and tile.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { config } from '../../config';
import { useConfigStore } from '../store/store';
import { useClock } from '../scripts/useClock';
import { useSearch } from '../scripts/useSearch';
import { useWeather } from '../scripts/useWeather';
import { useEditableName } from '../scripts/useEditableName';
import { prefixedIcon } from '../scripts/iconPrefix';
import ThemeButton from './ThemeButton.vue';
import LaunchTile from './LaunchTile.vue';
import ClockSeparator from './ClockSeparator.vue';
import contenteditable from 'vue-contenteditable';
import type { List } from '../types/config';

const store = useConfigStore();
const { hours, minutes, ampm, month, day, greeting } = useClock();
const { query, placeholder, submit } = useSearch();
const { weather, description } = useWeather();
const { name, nameBox, save } = useEditableName();

const buttons = config.buttons[0];
// The third list is optional; drop any unset entries so the grid can't dereference undefined.
const lists = config.lists[0].filter((list): list is List => Boolean(list));

const searchBox = ref<HTMLInputElement | null>(null);
const clockRef = ref<HTMLElement | null>(null);
const dateRef = ref<HTMLElement | null>(null);
const detailsRef = ref<HTMLElement | null>(null);

/** Distance from an element's box top to the top of its rendered glyphs. */
const glyphTop = (el: HTMLElement) => {
  const cs = getComputedStyle(el);
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return 0;
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const metrics = ctx.measureText(el.textContent?.trim() ?? '');
  const size = parseFloat(cs.fontSize);
  const lineHeight = cs.lineHeight === 'normal' ? size * 1.2 : parseFloat(cs.lineHeight);
  const halfLeading = (lineHeight - (metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent)) / 2;
  return halfLeading + metrics.fontBoundingBoxAscent - metrics.actualBoundingBoxAscent;
};

/** Align the date's cap top with the clock's — they use leading-none at different sizes/fonts. */
const alignDate = () => {
  const clock = clockRef.value;
  const date = dateRef.value;
  const details = detailsRef.value;
  if (!clock || !date || !details) return;
  details.style.marginTop = window.innerWidth >= 1024 ? `${Math.round(glyphTop(clock) - glyphTop(date))}px` : '';
};

onMounted(async () => {
  if (config.autoFocusBar && searchBox.value) searchBox.value.focus();
  await document.fonts.ready;
  alignDate();
  window.addEventListener('resize', alignDate);
});
onBeforeUnmount(() => window.removeEventListener('resize', alignDate));
</script>

<template>
  <div class="editorial min-h-screen w-full text-foreground dark:text-darkforeground">
    <div class="mx-auto max-w-[1500px] px-6 py-7 xl:px-10">
      <header class="p-fade flex items-center justify-end">
        <ThemeButton v-if="config.componentsEnabled.themeButton" />
      </header>

      <section class="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <h1
          v-if="config.componentsEnabled.clock"
          ref="clockRef"
          class="hero-clock p-rise flex items-end font-bold leading-none"
          style="--d: 40ms"
          role="timer"
          :aria-label="`${hours}:${minutes}${config.twelveHourFormat ? ' ' + ampm : ''}`"
        >
          <span class="tracking-[-0.04em]">{{ hours }}</span>
          <ClockSeparator :blink="config.flashSeparator" class="mx-[0.06em] opacity-40" />
          <span class="tracking-[-0.04em]">{{ minutes }}</span>
          <span v-if="config.twelveHourFormat" class="mb-2 ml-2 self-end text-[clamp(1.25rem,3.5vh,2.5rem)] lowercase">
            {{ ampm }}
          </span>
        </h1>

        <div ref="detailsRef" class="hero-details flex flex-col gap-1.5 lg:items-end">
          <p
            v-if="config.componentsEnabled.date"
            ref="dateRef"
            class="hero-date p-rise font-bold leading-none"
            style="--d: 120ms"
          >
            {{ month }} {{ day }}
          </p>
          <p v-if="config.componentsEnabled.greeter" class="p-rise text-base text-sforeground dark:text-darksforeground" style="--d: 160ms">
            {{ greeting
            }}<contenteditable
              ref="nameBox"
              tag="span"
              :contenteditable="true"
              v-model="name"
              :noNL="true"
              @returned="save()"
              class="outline-none hover:bg-cards dark:hover:bg-darkcards"
            />
          </p>
          <div
            v-if="config.componentsEnabled.weather"
            class="p-rise mt-1 flex items-center gap-2 text-sm text-sforeground dark:text-darksforeground"
            style="--d: 200ms"
          >
            <img :src="store.weatherIcon" class="h-6 w-6" alt="" />
            <span v-if="weather"
              ><span class="font-semibold">{{ weather.main.temp }}°</span> {{ description }}</span
            >
            <span v-else>—</span>
          </div>
        </div>
      </section>

      <form v-if="config.componentsEnabled.searchBar" class="p-rise mt-8" style="--d: 240ms" @submit.prevent="submit()">
        <div
          class="flex items-center gap-3 rounded-2xl border border-black/5 bg-cards px-5 py-4 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-accent dark:border-white/5 dark:bg-darkcards"
        >
          <fa-icon icon="magnifying-glass" class="h-4 w-4 opacity-50" />
          <input
            ref="searchBox"
            v-model="query"
            :placeholder="placeholder"
            class="w-full bg-transparent text-lg outline-none placeholder:opacity-40"
          />
          <kbd class="hidden rounded border border-black/10 px-2 py-0.5 text-xs opacity-50 dark:border-white/10 sm:block">↵</kbd>
        </div>
      </form>

      <section class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <LaunchTile
          v-for="(button, i) in buttons"
          :key="button.name"
          :button="button"
          class="p-pop aspect-square rounded-2xl hover:-translate-y-1"
          :style="{ '--d': `${280 + i * 45}ms` }"
        />

        <div
          v-for="(list, li) in lists"
          :key="list.icon"
          class="p-pop col-span-2 row-span-2 flex flex-col rounded-2xl bg-cards p-5 shadow-sm dark:bg-darkcards"
          :style="{ '--d': `${300 + li * 60}ms` }"
        >
          <fa-icon :icon="prefixedIcon(list.icon)" class="mb-3 h-4 w-4 opacity-60" />
          <div class="flex flex-1 flex-col justify-evenly">
            <a
              v-for="link in list.links"
              :key="link.name"
              :href="link.url"
              :target="config.openInNewTab ? '_blank' : ''"
              class="rounded-lg px-2 py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-sforeground dark:hover:bg-darkaccent dark:hover:text-darksforeground"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.editorial {
  --clock-size: clamp(4rem, 12vw, 10rem);
  --date-size: clamp(2.5rem, 4.5vw, 4.5rem);
}

.hero-clock {
  font-size: var(--clock-size);
}

.hero-date {
  font-size: var(--date-size);
}

@keyframes p-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes p-pop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes p-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Entrance choreography. `backwards` rather than `both` so the finished animation
   doesn't pin the element's transform and block the tile hover lift. */
.p-rise {
  animation: p-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--d, 0ms);
}

.p-pop {
  animation: p-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--d, 0ms);
}

.p-fade {
  animation: p-fade 0.6s ease backwards;
  animation-delay: var(--d, 0ms);
}

@media (prefers-reduced-motion: reduce) {
  .p-rise,
  .p-pop,
  .p-fade {
    animation: none;
  }
}
</style>
