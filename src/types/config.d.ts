
/**
 * Config object type
 * Ensures correctness in config.ts
 */
export interface Config {
  name: string;
  openInNewTab: boolean;
  title: string;

  twelveHourFormat: boolean;
  flashSeparator: boolean;

  theme: string;
  backgroundImage: string;
  themes: string[];

  searchBar: boolean;
  searchEngine: "google" | "ddg";
  barPlaceholder: string;
  autoFocusBar: boolean;

  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  greetingNight: string;

  layout: "bento" | "lists" | "buttons";

  weatherKey: string;
  weatherIcons: "OneDark" | "Nord" | "Dark" | "White";
  weatherUnit: "F" | "C";
  language: string;

  trackLocation: boolean;
  defaultLatitude: string;
  defaultLongitude: string;

  autoTheme: "system" | "location" | "preset" | "none";
  darkModeOnTime: string;
  lightModeOnTime: string;

  // Two button arrays, with 6 buttons in each.
  buttons: [[Button, Button, Button, Button, Button, Button], [Button, Button, Button, Button, Button, Button]];
  lists: [[List, List], [List, List]];
  componentsEnabled: EnabledComponents;
}

interface Button {
  name: string;
  icon: string;
  url: string;
}

interface List {
  icon: string;
  links: [Link, Link, Link, Link];
}

interface Link {
  name: string;
  url: string;
}

interface EnabledComponents {
  searchBar: boolean;
  themeButton: boolean;
  clock: boolean;
  greeter: boolean;
  date: boolean;
  weather: boolean;
}
