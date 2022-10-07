import { BadgeType } from '../../../atoms/mg-badge/mg-badge.conf';
import { IconType } from '../../../atoms/mg-icon/mg-icon.conf';

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
 * Icon Size from sizes
 */
export type SizeType = typeof sizes[number];

/**
 * Component type
 */
export type MenuItemType = {
  label: string;
  status?: Status;
  href?: string;
  size?: SizeType;
  identifier?: string;
  badge?: BadgeType;
  icon?: Omit<IconType, 'size' | 'spin'>;
  menuIndex?: number;
  expanded?: boolean;
};
