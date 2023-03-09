import { MgIcon } from '../../atoms/mg-icon/mg-icon';
import { MgMenu } from '../menu/mg-menu/mg-menu';

/**
 * message type
 */
export type MessageType = { moreLabel: string; badgeLabel: string };

/**
 * SlotLabel prop type
 */
export type SlotLabelType = {
  label?: string;
  display?: boolean;
};

/**
 * icon prop type
 */
export type IconType = {
  icon: MgIcon['icon'];
};

/**
 * size type
 */
export type SizeType = MgMenu['size'];
