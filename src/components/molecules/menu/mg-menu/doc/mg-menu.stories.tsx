import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { Direction } from '../mg-menu.conf';

export default {
  component: 'mg-menu',
  title: 'Molecules/menus/mg-menu',
  argTypes: {
    direction: {
      options: [undefined, Direction.HORIZONTAL, Direction.VERTICAL],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <div style={{ display: 'flex' }}>
    <mg-menu {...filterArgs(args)}>
      <mg-menu-item identifier="id-1" label="1 - head-1"></mg-menu-item>
      <mg-menu-item identifier="id-2" label="1 - head-2 long" status={Status.DISABLED}></mg-menu-item>
      <mg-menu-item identifier="id-3" icon={{ icon: 'user' }} label="1 - head-3 very long"></mg-menu-item>
      <mg-menu-item identifier="id-4" icon={{ icon: 'user' }} label="1 - head-4" badge={{ value: 2, label: 'hello' }}>
        <mg-menu label="submenu" direction={Direction.HORIZONTAL}>
          <mg-menu-item identifier="id-4-1" size="medium" label="Batman begins"></mg-menu-item>
          <mg-menu-item identifier="id-4-2" size="medium" icon={{ icon: 'user' }} label="2 - head 1"></mg-menu-item>
          <mg-menu-item identifier="id-4-3" size="medium" icon={{ icon: 'user' }} label="2 - head 2 very long"></mg-menu-item>
          <mg-menu-item identifier="id-4-4" size="medium" icon={{ icon: 'user' }} label="2 - head 3" badge={{ value: 2, label: 'hello' }}>
            <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
              <mg-menu-item identifier="id-4-4-1" size="regular" label="Batman begins"></mg-menu-item>
              <mg-menu-item identifier="id-4-4-2" size="regular" icon={{ icon: 'user' }} label="3 - head 1"></mg-menu-item>
              <mg-menu-item identifier="id-4-4-3" size="regular" icon={{ icon: 'user' }} label="3 - head 2" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            </mg-menu>
          </mg-menu-item>
          <mg-menu-item identifier="id-4-4-5" size="medium" icon={{ icon: 'user' }} label="2 - head 4" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item identifier="id-5" icon={{ icon: 'user' }} label="1 - head-5" badge={{ value: 2, label: 'hello' }} size="medium">
        <mg-menu label="submenu" direction={Direction.VERTICAL}>
          <mg-menu-item identifier="id-5-1" size="medium" label="2 - head 1">
            <mg-menu label="submenu" direction={Direction.VERTICAL}>
              <mg-menu-item identifier="id-5-1-1" size="medium" icon={{ icon: 'user' }} label="3 - head 1" badge={{ value: 2, label: 'hello' }}>
                <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                  <mg-menu-item identifier="id-5-1-1-1" size="medium" label="4 - head 1" status={Status.ACTIVE}></mg-menu-item>
                  <mg-menu-item identifier="id-5-1-1-2" size="medium" icon={{ icon: 'user' }} label="4 - head 2"></mg-menu-item>
                  <mg-menu-item identifier="id-5-1-1-3" size="medium" icon={{ icon: 'user' }} label="4 - head 3" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
                </mg-menu>
              </mg-menu-item>
            </mg-menu>
          </mg-menu-item>
          <mg-menu-item identifier="id-5-2" size="medium" icon={{ icon: 'user' }} label="2 - head 2"></mg-menu-item>
          <mg-menu-item identifier="id-5-3" size="medium" icon={{ icon: 'user' }} label="2 - head 3" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
          <mg-menu-item identifier="id-5-4" size="medium" icon={{ icon: 'user' }} label="2 - head 4 very long" badge={{ value: 2, label: 'hello' }}>
            <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
              <mg-menu-item identifier="id-5-4-1" size="regular" label="Batman begins"></mg-menu-item>
              <mg-menu-item identifier="id-5-4-2" size="regular" icon={{ icon: 'user' }} label="3 - head 1"></mg-menu-item>
              <mg-menu-item identifier="id-5-4-3" size="regular" icon={{ icon: 'user' }} label="3 - head 2" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
            </mg-menu>
          </mg-menu-item>
          <mg-menu-item identifier="id-5-5" size="medium" icon={{ icon: 'user' }} label="2 - head 5" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </div>
);

export const MgMenu = Template.bind({});

MgMenu.args = {
  label: 'Batman menu',
  direction: Direction.HORIZONTAL,
};
