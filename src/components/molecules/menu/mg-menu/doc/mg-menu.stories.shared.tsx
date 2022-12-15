import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { MenuItemSizeType, Status } from '../../mg-menu-item/mg-menu-item.conf';
import { Direction } from '../mg-menu.conf';

/****************
 * mg-menu-item *
 ***************/

type ItemArgType = {
  size?: MenuItemSizeType;
  label: string;
  direction: Direction;
  status?: Status;
  metadata?: string;
  icon?: boolean;
  badge?: boolean;
  content?: boolean;
  submenu?: number;
};

type ItemFormatedArgs = Pick<ItemArgType, 'size' | 'status'> & { slot: Pick<ItemArgType, 'label' | 'metadata' | 'icon' | 'badge' | 'content' | 'submenu'> };

type MenuFormatedArgs = {
  label: string;
  direction: Direction;
  slot: {
    items: ItemFormatedArgs[];
  };
};

interface IGetMenuItemArgs {
  ({}: ItemArgType): ItemFormatedArgs;
}

/**
 * Format item args from given params
 *
 * @param {ItemArgType} itemArgs - item arguments
 * @returns {ItemFormatedArgs} items formated args object
 */
const getItemArgs: IGetMenuItemArgs = ({ size, label, direction, status, metadata, icon, badge, content, submenu }) => ({
  size: size !== undefined ? size : direction === Direction.VERTICAL ? 'medium' : undefined,
  status,
  slot: {
    label,
    metadata,
    icon,
    badge,
    content,
    submenu,
  },
});

/**
 * Render mg-menu-item
 *
 * @param {ItemFormatedArgs} args mg-menu-item args
 * @returns {HTMLMgMenuItemElement} rendered mg-menu-item
 */
const menuItem = (args: ItemFormatedArgs): HTMLMgMenuItemElement => (
  <mg-menu-item {...filterArgs(args)}>
    {args.slot?.label && <span slot="label">{args.slot?.label}</span>}
    {args.slot?.metadata && <span slot="metadata">{args.slot?.metadata}</span>}
    {args.slot?.icon && <mg-icon slot="illustration" icon="user"></mg-icon>}
    {args.slot?.badge && (
      <mg-badge slot="information" label="information" value="1">
        {args.slot?.icon}
      </mg-badge>
    )}
    {args.slot?.content && (
      <div>
        <h3>Demo title</h3>
        <p>some content</p>
      </div>
    )}
    {args.slot?.submenu && menu(getMenuArgs(Direction.VERTICAL, args.slot?.submenu - 1, true))}
  </mg-menu-item>
);

interface IGetMenuArgs {
  (direction: Direction, level?: number, isSubmenu?: boolean): MenuFormatedArgs;
}

/***********
 * mg-menu *
 **********/

/**
 * Format menu args from given params
 *
 * @param {Direction} direction menu direction
 * @param {number} level menu level. Default: 0.
 * @param {boolean} isSubmenu is menu a submenu. Default: false.
 * @returns {MenuFormatedArgs} menu formated args object
 */
export const getMenuArgs: IGetMenuArgs = (direction: Direction, level = 0, isSubmenu = false) => ({
  label: 'Batman menu',
  direction,
  slot: {
    items: [
      getItemArgs({
        label: 'label 1',
        direction,
      }),
      getItemArgs({
        label: 'label 2',
        direction,
        status: Status.DISABLED,
      }),
      getItemArgs({
        label: 'label 3 with long text',
        direction,
        badge: true,
        icon: true,
      }),
      getItemArgs({
        label: 'label 4',
        direction,
        badge: true,
        icon: true,
        status: Status.ACTIVE,
        submenu: level,
      }),
      getItemArgs({
        label: 'label 5',
        direction,
        icon: true,
        metadata: 'my metadata',
        content: true,
        size: !isSubmenu && direction === Direction.HORIZONTAL ? 'regular' : undefined,
      }),
    ],
  },
});

/**
 * Render mg-menu
 *
 * @param {MenuFormatedArgs} args mg-menu args
 * @returns {HTMLMgMenuElement} rendered mg-menu
 */
export const menu = (args: MenuFormatedArgs): HTMLMgMenuElement => (
  <mg-menu {...filterArgs(args, { direction: Direction.HORIZONTAL })}>{args.slot.items.map(item => menuItem(item))}</mg-menu>
);
