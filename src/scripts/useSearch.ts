import { ref } from 'vue';
import { config } from '../../config';

const engines = {
  google: { url: 'https://www.google.com/search?q=', display: 'Google' },
  ddg: { url: 'https://duckduckgo.com/?q=', display: 'DuckDuckGo' },
} as const;

/**
 * Search bar state and submission. Shared by SearchBar and the editorial layout.
 */
export const useSearch = () => {
  const query = ref('');
  const placeholder = config.barPlaceholder || engines[config.searchEngine].display;

  const submit = () => {
    if (!query.value) return;
    const url = `${engines[config.searchEngine].url}${query.value}`;
    if (config.openInNewTab) window.open(url, '_blank', 'noopener');
    else window.location.href = url;
    query.value = '';
  };

  return { query, placeholder, submit };
};
