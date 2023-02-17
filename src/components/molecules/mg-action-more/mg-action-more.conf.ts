import { MgBadge } from '../../atoms/mg-badge/mg-badge';
import { MgButton } from '../../atoms/mg-button/mg-button';
import { MgIcon } from '../../atoms/mg-icon/mg-icon';
import { MgMenuItem } from '../menu/mg-menu-item/mg-menu-item';

/**
 * prop icon type
 */
export type MgActionMoreIconType = {
  icon: MgIcon['icon'];
};

/**
 * prop button type
 */
export type MgActionMoreButtonType = {
  isIcon: MgButton['isIcon'];
  variant: MgButton['variant'];
  label?: MgButton['label'];
};

/**
 * locals message type
 */
export type MgActionMoreMessageType = { label: string };

/**
 * prop item type
 */
export type MgActionMoreItemType = {
  label: string;
  mouseEventHandler: IMouseEventHandler;
  status?: MgMenuItem['status'];
  icon?: MgIcon['icon'];
  href?: MgMenuItem['href'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
};

/**
 * MouseEvent callback interface
 */
interface IMouseEventHandler {
  (event: MouseEvent): void;
}
