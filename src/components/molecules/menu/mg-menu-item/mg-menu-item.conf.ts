/**
 * Available menu-item positions
 */
export enum ElementPosition {
  FIRST = 'first',
  LAST = 'last',
}

/**
 * Available menu item status
 */
export enum Status {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DISABLED = 'disabled',
  ACTIVE = 'active',
}

/**
 * List of all possibles sizes
 */
export const sizes = ['regular', 'medium', 'large'] as const;

/**
 * item Size from sizes
 */
export type MenuItemSizeType = (typeof sizes)[number];
