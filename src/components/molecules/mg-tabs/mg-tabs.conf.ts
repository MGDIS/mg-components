import { MgBadge } from '../../atoms/mg-badge/mg-badge';
import { MgIcon } from '../../atoms/mg-icon/mg-icon';

/**
 * Available tabs items status
 */
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
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'variant' | 'label'>;
  status: Status;
};

/**
 * List of all possibles sizes
 */
export const sizes = ['regular', 'large'] as const;

/**
 * Variant type from variants
 */
export type SizeType = typeof sizes[number];
