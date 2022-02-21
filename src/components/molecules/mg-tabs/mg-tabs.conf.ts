import { BadgeType } from '../../atoms/mg-badge/mg-badge.conf';

/**
 * type TabItem
 * use to match tabs items
 */
export type TabItem = {
  label: string;
  icon?: string;
  badge?: BadgeType;
};
