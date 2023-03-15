import { MgItemMore } from '../../mg-item-more/mg-item-more';

/**
 * Menu direction type
 */
export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * ItemMore prop type
 */
export type ItemMoreType = Pick<MgItemMore, 'icon' | 'slotlabel' | 'size'>;

/**
 * List of all possibles sizes
 */
export const sizes = ['regular', 'medium', 'large'] as const;

/**
 * item Size from sizes
 */
export type MenuSizeType = (typeof sizes)[number];
