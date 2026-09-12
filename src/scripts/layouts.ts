import type { Config } from '../types/config';

export interface LayoutComposition {
  /** How many button groups the layout renders (0 = none). */
  buttonGroups: number;
  /** How many list groups the layout renders (0 = none). */
  listGroups: number;
}

/**
 * The single source of truth for how each layout composes the shared containers.
 * Editorial is composed entirely by its own component (hence 0/0 here).
 */
export const layoutComposition: Record<Config['layout'], LayoutComposition> = {
  bento: { buttonGroups: 1, listGroups: 1 },
  lists: { buttonGroups: 0, listGroups: 2 },
  buttons: { buttonGroups: 2, listGroups: 0 },
  editorial: { buttonGroups: 0, listGroups: 0 },
};
