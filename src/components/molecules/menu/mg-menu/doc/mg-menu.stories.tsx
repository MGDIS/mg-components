import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { MenuItemSizeType, Status } from '../../mg-menu-item/mg-menu-item.conf';
import { Direction } from '../mg-menu.conf';

export default {
  component: 'mg-menu',
  title: 'Beta/menus/mg-menu',
  argTypes: {
    direction: {
      options: [undefined, Direction.HORIZONTAL, Direction.VERTICAL],
      control: { type: 'select' },
    },
  },
};

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

interface IGetMenuArgs {
  ({}: ItemArgType): Pick<ItemArgType, 'size' | 'status'> & { slot: Pick<ItemArgType, 'label' | 'metadata' | 'icon' | 'badge' | 'content' | 'submenu'> };
}

const getItemArgs: IGetMenuArgs = ({ size, label, direction, status, metadata, icon, badge, content, submenu }) => ({
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

const getMenuArgs = (direction: Direction, level = 0, isSubmenu = false) => ({
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

const menu = args => <mg-menu {...filterArgs(args, { direction: Direction.HORIZONTAL })}>{args.slot.items.map(item => menuItem(item))}</mg-menu>;

const menuItem = args => (
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

const TemplateSmallContainer = (args: any): HTMLElement => {
  return <div style={{ width: '25rem', height: '20rem' }}>{menu(args)}</div>;
};

export const MgMenuVerticalSmallContainer = TemplateSmallContainer.bind({});

MgMenuVerticalSmallContainer.args = {
  ...MgMenuVertical.args,
};
