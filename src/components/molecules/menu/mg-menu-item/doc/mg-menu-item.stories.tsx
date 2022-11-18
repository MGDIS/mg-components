import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-menu-item',
  title: 'Molecules/menus/mg-menu-item',
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
  identifier: 'identifier',
  slot: <span slot="label">My label</span>,
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
    <mg-menu-vertical label="submenu">
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
    </mg-menu-vertical>,
  ],
};
