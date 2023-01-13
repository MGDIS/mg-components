import { MgIcon } from '../../../atoms/mg-icon/mg-icon';
import { MgMenu } from './mg-menu';

/**
 * Menu direction type
 */
export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * message type
 */
export type MessageType = { moreLabel: string; badgeLabel: string };

/**
 * more item type
 */
export type MoreItemType = {
  mgIcon?: {
    icon: MgIcon['icon'];
  };
  slotLabel?: {
    label?: string;
    display?: boolean;
  };
  size?: MgMenu['size'];
};

/**
 * More item type guard
 *
 * @param {unknown} element element to control
 * @returns {boolean} truthy if element is more-item
 */
export const isMoreItem = (element: unknown): element is MoreItemType => {
  const item = element as MoreItemType;
  return (
    item === undefined ||
    (typeof item === 'object' &&
      (typeof item.size === 'string' || typeof item.mgIcon?.icon === 'string' || typeof item.slotLabel?.label === 'string' || typeof item.slotLabel?.display === 'boolean'))
  );
};

/**
 * List of all possibles sizes
 */
export const sizes = ['regular', 'medium', 'large'] as const;

/**
 * item Size from sizes
 */
export type MenuSizeType = typeof sizes[number];
