import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-menu-vertical',
  title: 'Molecules/menus/mg-menu-vertical',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <mg-menu-vertical {...filterArgs(args)}>
    <mg-menu-item label="Bane"></mg-menu-item>
    <mg-menu-item label="Joker"></mg-menu-item>
    <mg-menu-item icon="user" label="Harley Quinn"></mg-menu-item>
    <mg-menu-item icon="user" label="Batman" badge={{ value: 2, label: 'hello' }}>
      <mg-menu-vertical label="submenu">
        <mg-menu-item label="Batman begins"></mg-menu-item>
        <mg-menu-item label="The dark knight"></mg-menu-item>
        <mg-menu-item label="The dark knight rises"></mg-menu-item>
      </mg-menu-vertical>
    </mg-menu-item>
  </mg-menu-vertical>
);

export const MgMenuVertical = Template.bind({});

MgMenuVertical.args = {
  label: 'Batman menu',
};
