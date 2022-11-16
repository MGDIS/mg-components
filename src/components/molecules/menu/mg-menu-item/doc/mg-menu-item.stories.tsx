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
  label: 'Batman',
};

export const MgMenuItemWhitIcon = Template.bind({});

MgMenuItemWhitIcon.args = {
  label: 'Batman',
  slot: <mg-icon icon="user" slot="illustration"></mg-icon>,
};

export const MgMenuItemWhitBadge = Template.bind({});

MgMenuItemWhitBadge.args = {
  label: 'Batman',
  slot: <mg-badge value="2" label="hello" slot="information"></mg-badge>,
};

export const MgMenuItemWhitBadgeAndIcon = Template.bind({});

MgMenuItemWhitBadgeAndIcon.args = {
  label: 'Batman',
  slot: [<mg-badge value="2" label="hello" slot="information"></mg-badge>, <mg-icon icon="user" slot="illustration"></mg-icon>],
};

const TemplateWhithSubmenu = (args: any): HTMLElement => (
  <mg-menu-item {...filterArgs(args)}>
    <mg-menu-vertical label="submenu">
      <mg-menu-item identifier="id-1-1" label="Batman begins"></mg-menu-item>
      <mg-menu-item identifier="id-1-2" label="The dark knight"></mg-menu-item>
      <mg-menu-item identifier="id-1-3" label="The dark knight rises"></mg-menu-item>
    </mg-menu-vertical>
  </mg-menu-item>
);

export const MgMenuItemWhithSubmenu = TemplateWhithSubmenu.bind({});

MgMenuItemWhithSubmenu.args = {
  label: 'Batman',
  icon: 'user',
  identifier: 'id-1',
  badge: { value: 2, label: 'hello' },
};
