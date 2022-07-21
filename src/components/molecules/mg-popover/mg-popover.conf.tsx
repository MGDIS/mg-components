/**
 * List of all possibles placements
 */
export const placements = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
] as const;

/**
 * Placement type from placements
 */
export type Placement = typeof placements[number];
