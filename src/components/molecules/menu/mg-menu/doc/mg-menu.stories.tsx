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
const Template = (args: any): HTMLElement => {
  const style = args.direction === Direction.VERTICAL ? { width: '25rem', height: '20rem' } : {};
  return (
    <div style={style}>
      <mg-menu {...filterArgs(args)}>
        <mg-menu-item identifier="id-1" label="1 - head-1" size="medium"></mg-menu-item>
        <mg-menu-item identifier="id-2" label="1 - head-2 long" size="medium" status={Status.DISABLED}></mg-menu-item>
        <mg-menu-item identifier="id-3" label="1 - head-3 very very very very very long" size="medium">
          <mg-icon icon="user" slot="illustration"></mg-icon>
        </mg-menu-item>
        <mg-menu-item identifier="id-4" label="1 - head-4" size="medium">
          <mg-icon icon="user" slot="illustration"></mg-icon>
          <mg-badge value="2" label="hello" slot="information"></mg-badge>
          <mg-menu label="submenu" direction={Direction.VERTICAL}>
            <mg-menu-item identifier="id-4-1" size="medium" label="Batman begins"></mg-menu-item>
            <mg-menu-item identifier="id-4-2" size="medium" label="2 - head 1">
              <mg-icon icon="user" slot="illustration"></mg-icon>
            </mg-menu-item>
            <mg-menu-item identifier="id-4-3" size="medium" label="2 - head 2 very long">
              <mg-icon icon="user" slot="illustration"></mg-icon>
            </mg-menu-item>
            <mg-menu-item identifier="id-4-4" size="medium" label="2 - head 3">
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                <mg-menu-item identifier="id-4-4-1" size="regular" label="Batman begins"></mg-menu-item>
                <mg-menu-item identifier="id-4-4-2" size="regular" label="3 - head 1">
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                </mg-menu-item>
                <mg-menu-item identifier="id-4-4-3" size="regular" label="3 - head 2">
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                  <mg-badge value="2" label="hello" slot="information"></mg-badge>
                </mg-menu-item>
              </mg-menu>
            </mg-menu-item>
            <mg-menu-item identifier="id-4-4-5" size="medium" label="2 - head 4">
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
            </mg-menu-item>
          </mg-menu>
        </mg-menu-item>
        <mg-menu-item identifier="id-5" label="1 - head-5" size="medium">
          <mg-badge value="2" label="hello" slot="information"></mg-badge>
          <mg-icon icon="user" slot="illustration"></mg-icon>
          <mg-menu label="submenu" direction={Direction.VERTICAL}>
            <mg-menu-item identifier="id-5-1" size="medium" label="2 - head 1">
              <mg-menu label="submenu" direction={Direction.VERTICAL}>
                <mg-menu-item identifier="id-5-1-1" size="medium" label="3 - head 1">
                  <mg-badge value="2" label="hello" slot="information"></mg-badge>
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                  <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                    <mg-menu-item identifier="id-5-1-1-1" size="medium" label="4 - head 1" status={Status.ACTIVE}></mg-menu-item>
                    <mg-menu-item identifier="id-5-1-1-2" size="medium" label="4 - head 2">
                      <mg-icon icon="user" slot="illustration"></mg-icon>
                    </mg-menu-item>
                    <mg-menu-item identifier="id-5-1-1-3" size="medium" label="4 - head 3">
                      <mg-icon icon="user" slot="illustration"></mg-icon>
                      <mg-badge value="2" label="hello" slot="information"></mg-badge>
                    </mg-menu-item>
                  </mg-menu>
                </mg-menu-item>
              </mg-menu>
            </mg-menu-item>
            <mg-menu-item identifier="id-5-2" size="medium" label="2 - head 2">
              <mg-icon icon="user" slot="illustration"></mg-icon>
            </mg-menu-item>
            <mg-menu-item identifier="id-5-3" size="medium" label="2 - head 3">
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
            </mg-menu-item>
            <mg-menu-item identifier="id-5-4" size="medium" label="2 - head 4 very long">
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
              <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                <mg-menu-item identifier="id-5-4-1" size="regular" label="Batman begins"></mg-menu-item>
                <mg-menu-item identifier="id-5-4-2" size="regular" label="3 - head 1">
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                </mg-menu-item>
                <mg-menu-item identifier="id-5-4-3" size="regular" label="3 - head 2">
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                  <mg-badge value="2" label="hello" slot="information"></mg-badge>
                </mg-menu-item>
              </mg-menu>
            </mg-menu-item>
            <mg-menu-item identifier="id-5-5" size="medium" label="2 - head 5">
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
            </mg-menu-item>
          </mg-menu>
        </mg-menu-item>
      </mg-menu>
    </div>
  );
};

export const MgMenu = Template.bind({});

MgMenu.args = {
  label: 'Batman menu',
  direction: Direction.HORIZONTAL,
};
