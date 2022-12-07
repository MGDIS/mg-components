import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { Direction } from '../../mg-menu/mg-menu.conf';

export default {
  component: 'mg-menu-item',
  title: 'Beta/menus/mg-menu-item',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-menu-item {...filterArgs(args)}>{args.slot}</mg-menu-item>;

export const MgMenuItem = Template.bind({});

MgMenuItem.args = {
  slot: <span slot="label">My label</span>,
};
export const MgMenuItemAsLink = Template.bind({});

MgMenuItemAsLink.args = {
  href: './',
  ...MgMenuItem.args,
};

export const MgMenuItemWhitIcon = Template.bind({});

MgMenuItemWhitIcon.args = {
  ...MgMenuItem.args,
  slot: [<span slot="label">My label</span>, <mg-icon icon="user" slot="illustration"></mg-icon>],
};

export const MgMenuItemWhitBadge = Template.bind({});

MgMenuItemWhitBadge.args = {
  ...MgMenuItem.args,
  slot: [<span slot="label">My label</span>, <mg-badge value="2" label="hello" slot="information"></mg-badge>],
};

export const MgMenuItemWhitBadgeAndIcon = Template.bind({});

MgMenuItemWhitBadgeAndIcon.args = {
  ...MgMenuItem.args,
  slot: [<span slot="label">My label</span>, <mg-badge value="2" label="hello" slot="information"></mg-badge>, <mg-icon icon="user" slot="illustration"></mg-icon>],
};

export const MgMenuItemWhitMetadata = Template.bind({});

MgMenuItemWhitMetadata.args = {
  ...MgMenuItem.args,
  slot: [<span slot="label">My label</span>, <span slot="metadata">My metadata</span>],
};

export const MgMenuItemWhithSubmenu = Template.bind({});

MgMenuItemWhithSubmenu.args = {
  ...MgMenuItem.args,
  slot: [
    <span slot="label">My label</span>,
    <mg-menu direction={Direction.VERTICAL} label="submenu">
      <mg-menu-item>
        <span slot="label">Subitem 1</span>
      </mg-menu-item>
      <mg-menu-item>
        <mg-icon icon="user" slot="illustration"></mg-icon>
        <span slot="label">Subitem 2</span>
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">Subitem 3</span>
        <mg-icon icon="user" slot="illustration"></mg-icon>
        <mg-badge value="2" label="hello" slot="information"></mg-badge>
      </mg-menu-item>
    </mg-menu>,
  ],
};
