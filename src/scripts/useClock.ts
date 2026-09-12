import { computed, ref } from 'vue';
import { config } from '../../config';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// One shared tick for every consumer, so the clock/date/greeter/hero don't each
// run their own interval and ref.
const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | undefined;
const tick = () => {
  timer ??= setInterval(() => (now.value = new Date()), 1000);
};

/**
 * Reactive clock, date and greeting values. Shared by the clock, date and greeter
 * components and by the editorial layout's hero, so the logic lives in one place.
 */
export const useClock = () => {
  tick();

  const hours = computed(() => {
    const h = now.value.getHours();
    if (!config.twelveHourFormat) return String(h);
    return String(h % 12 || 12);
  });
  const minutes = computed(() => String(now.value.getMinutes()).padStart(2, '0'));
  const ampm = computed(() => (now.value.getHours() >= 12 ? 'pm' : 'am'));
  const month = computed(() => MONTHS[now.value.getMonth()]);
  const day = computed(() => String(now.value.getDate()));
  const greeting = computed(() => {
    const h = now.value.getHours();
    if (h >= 23 || h < 6) return `${config.greetingNight} `;
    if (h < 12) return `${config.greetingMorning} `;
    if (h < 17) return `${config.greetingAfternoon} `;
    return `${config.greetingEvening} `;
  });

  return { hours, minutes, ampm, month, day, greeting };
};
