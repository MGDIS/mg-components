import { MgBadge } from '../../atoms/mg-badge/mg-badge';
import { MgButton } from '../../atoms/mg-button/mg-button';
import { MgIcon } from '../../atoms/mg-icon/mg-icon';
import { Status } from '../menu/mg-menu-item/mg-menu-item.conf';
import { MenuSizeType } from '../menu/mg-menu/mg-menu.conf';

/**
 * prop icon type
 */
export type MgActionMoreIconType = {
  icon?: MgIcon['icon'];
};

/**
 * prop button type
 */
export type MgActionMoreButtonType = {
  isIcon: MgButton['isIcon'];
  variant: MgButton['variant'];
  label?: MgButton['label'];
  identifier?: MgButton['identifier'];
};

/**
 * prop message type
 */
export type MgActionMoreMessageType = { label: string };

/**
 * prop item type
 */
export type MgActionMoreItemType = {
  label: string;
  mouseEventHandler: IMouseEventHandler;
  status?: Status;
  hidden?: boolean;
  size?: MenuSizeType;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
};

/**
 * MouseEvent callback interface
 */
interface IMouseEventHandler {
  (event: MouseEvent): void;
}
