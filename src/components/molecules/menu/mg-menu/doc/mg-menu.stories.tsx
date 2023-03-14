import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { Direction, MenuSizeType } from '../mg-menu.conf';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';

export default {
  component: 'mg-menu',
  title: 'Beta/Menus/mg-menu',
  argTypes: {
    direction: {
      options: [undefined, Direction.HORIZONTAL, Direction.VERTICAL],
      control: { type: 'select' },
    },
    itemMore: {
      control: { type: 'object' },
    },
  },
};

/****************
 * mg-menu-item *
 ***************/

type ItemArgType = {
  label: string;
  direction: Direction;
  status?: Status;
  metadata?: string;
  icon?: boolean;
  badge?: boolean;
  content?: boolean;
  submenu?: number;
  href?: MgMenuItem['href'];
};

type ItemFormatedArgs = Pick<ItemArgType, 'status'> & { slot: Pick<ItemArgType, 'label' | 'metadata' | 'icon' | 'badge' | 'content' | 'submenu'> };

type MenuFormatedArgs = {
  label: string;
  size?: MenuSizeType;
  direction: Direction;
  itemMore: unknown;
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
const getItemArgs: IGetMenuItemArgs = ({ label, status, metadata, icon, badge, content, submenu, href }) => ({
  status,
  href,
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
 * @returns {HTMLElement} rendered mg-menu-item
 */
const menuItem = (args: ItemFormatedArgs): HTMLMgMenuItemElement => (
  <mg-menu-item {...filterArgs(args)}>
    {args.slot?.label && <span slot="label">{args.slot?.label}</span>}
    {args.slot?.metadata && <span slot="metadata">{args.slot?.metadata}</span>}
    {args.slot?.icon && <mg-icon slot="image" icon="user"></mg-icon>}
    {args.slot?.badge && (
      <mg-badge slot="information" label="information" value="1" variant="text-color">
        {args.slot?.icon}
      </mg-badge>
    )}
    {args.slot?.content && (
      <div>
        <h3>Demo title</h3>
        <p>some content</p>
      </div>
    )}
    {args.slot?.submenu > 0 && menu(getMenuArgs(Direction.VERTICAL, args.slot?.submenu - 1, 'medium'))}
  </mg-menu-item>
);

interface IGetMenuArgs {
  (direction: Direction, level?: number, size?: MenuSizeType): MenuFormatedArgs;
}

/***********
 * mg-menu *
 **********/

/**
 * Format menu args from given params
 *
 * @param {Direction} direction menu direction
 * @param {number} level menu level. Default: 0.
 * @param {MenuSizeType} size menu size. Default: 'regular'
 * @returns {MenuFormatedArgs} menu formated args object
 */
const getMenuArgs: IGetMenuArgs = (direction, level = 0, size = 'regular') => ({
  label: 'Batman menu',
  direction,
  size,
  itemMore: undefined,
  slot: {
    items: [
      getItemArgs({
        label: 'label 1',
        direction,
        href: '#',
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
      }),
    ],
  },
});

/**
 * Render mg-menu
 *
 * @param {MenuFormatedArgs} args mg-menu args
 * @returns {HTMLElement} rendered mg-menu
 */
const menu = (args: MenuFormatedArgs): HTMLMgMenuElement => (
  <mg-menu {...filterArgs(args, { direction: Direction.HORIZONTAL })}>{args.slot.items.map(item => menuItem(item))}</mg-menu>
);

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <div>{menu(args)}</div>;

export const MgMenuHorizontal = Template.bind({});

MgMenuHorizontal.args = getMenuArgs(Direction.HORIZONTAL, 2);

export const MgMenuVertical = Template.bind({});

MgMenuVertical.args = getMenuArgs(Direction.VERTICAL, 2);

const TemplateSmallContainer = (args: MenuFormatedArgs): HTMLElement => {
  return <div style={{ width: '25rem', height: '20rem' }}>{menu(args)}</div>;
};

export const MgMenuVerticalSmallContainer = TemplateSmallContainer.bind({});

MgMenuVerticalSmallContainer.args = {
  ...MgMenuVertical.args,
};
