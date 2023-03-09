import { MgIcon } from '../../atoms/mg-icon/mg-icon';

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
