/**
 * Config object type
 * Ensures correctness in config.ts
 */
export interface Config {
  name: string;
  openInNewTab: boolean;
  title: string;
  /** Play the tile launch animation when opening a button (only when openInNewTab is true). */
  launchAnimation: boolean;

  twelveHourFormat: boolean;
  flashSeparator: boolean;

  theme: string;
  backgroundImage: string;
  themes: string[];

  font: {
    source: 'local' | 'google';
    name: string;
  };

  searchBar: boolean;
  searchEngine: 'google' | 'ddg';
  barPlaceholder: string;
  autoFocusBar: boolean;

  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  greetingNight: string;

  layout: 'bento' | 'lists' | 'buttons' | 'editorial';

  weatherKey: string;
  weatherIcons: 'OneDark' | 'Nord' | 'Dark' | 'White';
  weatherUnit: 'F' | 'C';
  language: string;

  trackLocation: boolean;
  defaultLatitude: string;
  defaultLongitude: string;

  autoTheme: 'system' | 'location' | 'preset' | 'none';
  darkModeOnTime: string;
  lightModeOnTime: string;

  // Two button arrays, with 6 buttons in each.
  buttons: [[Button, Button, Button, Button, Button, Button], [Button, Button, Button, Button, Button, Button]];
  // List groups. 'editorial' can show all three of the first group; 'bento' uses the
  // first two of group 0, and 'lists' uses both groups (two lists each).
  lists: [[List, List, List?], [List, List]];
  componentsEnabled: EnabledComponents;
}

export interface Button {
  name: string;
  icon: string;
  url: string;
}

export interface List {
  icon: string;
  links: [Link, Link, Link, Link];
}

export interface Link {
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
