import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { Status } from '../mg-menu-item/mg-menu-item.conf';

export default {
  component: 'mg-menu',
  title: 'Molecules/menus/mg-menu',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <mg-menu-horizontal {...filterArgs(args)}>
    <mg-menu-item label="Bane"></mg-menu-item>
    <mg-menu-item label="Joker" status={Status.DISABLED}></mg-menu-item>
    <mg-menu-item icon="user" label="Harley Quinn"></mg-menu-item>
    <mg-menu-item icon="user" label="Batman" badge={{ value: 2, label: 'hello' }}>
      <mg-menu-vertical label="submenu">
        <mg-menu-item label="Batman begins"></mg-menu-item>
        <mg-menu-item icon="user" label="The dark knight"></mg-menu-item>
        <mg-menu-item icon="user" label="The dark knight rises" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
      </mg-menu-vertical>
    </mg-menu-item>
  </mg-menu-horizontal>
);

export const MgMenu = Template.bind({});

MgMenu.args = {
  label: 'Batman menu',
};
