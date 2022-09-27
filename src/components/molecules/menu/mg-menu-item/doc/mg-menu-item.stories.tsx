import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-menu-item',
  title: 'Molecules/menus/mg-item',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-menu-item {...filterArgs(args)}></mg-menu-item>;

export const MgMenuItem = Template.bind({});

MgMenuItem.args = {
  label: 'Batman',
};

export const MgMenuItemWhitIcon = Template.bind({});

MgMenuItemWhitIcon.args = {
  label: 'Batman',
  icon: 'user',
};

export const MgMenuItemWhitBadge = Template.bind({});

MgMenuItemWhitBadge.args = {
  label: 'Batman',
  badge: {
    label: '1 notification',
    value: '1',
  },
};

export const MgMenuItemWhitBadgeAndIcon = Template.bind({});

MgMenuItemWhitBadgeAndIcon.args = {
  label: 'Batman',
  icon: 'user',
  badge: {
    label: '1 notification',
    value: '1',
  },
};

const TemplateWhithSubmenu = (args: any): HTMLElement => (
  <mg-menu-item {...filterArgs(args)}>
    <mg-menu-vertical label="submenu">
      <mg-menu-item label="Batman begins"></mg-menu-item>
      <mg-menu-item label="The dark knight"></mg-menu-item>
      <mg-menu-item label="The dark knight rises"></mg-menu-item>
    </mg-menu-vertical>
  </mg-menu-item>
);

export const MgMenuItemWhithSubmenu = TemplateWhithSubmenu.bind({});

MgMenuItemWhithSubmenu.args = {
  label: 'Batman',
  icon: 'user',
  badge: { value: 2, label: 'hello' },
};
