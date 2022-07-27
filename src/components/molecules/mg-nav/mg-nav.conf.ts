import { BadgeType } from '../../atoms/mg-badge/mg-badge.conf';

export enum Status {
  HIDDEN = 'hidden',
  ACTIVE = 'active',
  VISIBLE = 'visible',
  DISABLED = 'disabled',
}

/**
 * type TabItem
 * use to match tabs items
 */
export type NavItem = {
  label: string;
  icon?: string;
  badge?: BadgeType;
  status: Status;
};
