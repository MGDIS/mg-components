import { MgBadge } from '../../../atoms/mg-badge/mg-badge';
import { MgIcon } from '../../../atoms/mg-icon/mg-icon';
import { MenuItemSizeType, Status } from '../mg-menu-item/mg-menu-item.conf';

/**
 * message type
 */
export type MessageType = { moreLabel: string; badgeLabel: string };

/**
 * ItemType
 */
export type ItemType = {
  label: string;
  status?: Status;
  hidden?: boolean;
  size?: MenuItemSizeType;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
  proxyEvent?: IProxyEvent;
};

/**
 * Interface pour l'emission de l'event depuis l'element proxy
 */
export interface IProxyEvent {
  (event: { kind: string; payload: any }): void;
}

/**
 * MgActionMore type guard
 *
 * @param element
 */
export const isMgActionMore = (element: HTMLElement): element is HTMLMgActionMoreElement => element.nodeName === 'MG-ACTION-MORE';

/**
 * MgActionMore Item type guard
 *
 * @param element
 */
export const isMgActionMoreItem = (element: unknown): element is ItemType => {
  const item = element as ItemType;
  return typeof item === 'object' && item.label !== undefined;
};
