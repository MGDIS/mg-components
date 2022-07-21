import { BadgeType } from '../../atoms/mg-badge/mg-badge.conf';

export enum Status {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DISABLED = 'disabled',
  ACTIVE = 'active',
}

/**
 * type TabItem
 * use to match tabs items
 */
export type TabItem = {
  label: string;
  icon?: string;
  badge?: BadgeType;
  status: Status;
};

/**
 * List of all possibles sizes
 */
export const sizes: string[] = ['regular', 'large'];
