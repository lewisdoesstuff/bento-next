import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

/** Icons used by the app shell itself, independent of the user's config. */
const SHELL_ICONS = ['magnifying-glass', 'moon', 'sun', 'chevron-down', 'check'];

const pascal = (name: string) =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

/**
 * Reads the icons referenced by `config.ts` (plus the shell icons), then writes
 * `src/icons.generated.ts` with static named imports so the bundler can tree-shake
 * every unused icon. Runs from the Vite config, so `npm run dev`, `npm run build`
 * and the Docker rebuild all regenerate it.
 */
export const generateIcons = () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const source = readFileSync(`${root}config.ts`, 'utf8');

  const names = new Set<string>(SHELL_ICONS);
  for (const match of source.matchAll(/icon:\s*['"]([^'"]+)['"]/g)) {
    names.add(match[1]);
  }

  const brands: string[] = [];
  const solid: string[] = [];
  for (const name of names) {
    if (name.startsWith('fab-')) brands.push(`fa${pascal(name.slice(4))}`);
    else solid.push(`fa${pascal(name)}`);
  }
  brands.sort();
  solid.sort();

  const lines = [
    '// AUTO-GENERATED from config.ts by scripts/generate-icons.ts — do not edit.',
    "import { library } from '@fortawesome/fontawesome-svg-core';",
  ];
  if (brands.length) lines.push(`import { ${brands.join(', ')} } from '@fortawesome/free-brands-svg-icons';`);
  if (solid.length) lines.push(`import { ${solid.join(', ')} } from '@fortawesome/free-solid-svg-icons';`);
  lines.push('', `library.add(${[...brands, ...solid].join(', ')});`, '');

  writeFileSync(`${root}src/icons.generated.ts`, lines.join('\n'));
};
