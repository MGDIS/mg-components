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
  const firstLevelSize = args.direction === Direction.VERTICAL ? 'medium' : undefined;
  return (
    <div style={style}>
      <mg-menu {...filterArgs(args)}>
        <mg-menu-item size={firstLevelSize}>
          <span slot="label">level-1 - label-1</span>
        </mg-menu-item>
        <mg-menu-item size={firstLevelSize} status={Status.DISABLED}>
          <span slot="label">level-1 - label-2 long</span>
        </mg-menu-item>
        <mg-menu-item size={firstLevelSize}>
          <span slot="label">level-1 - label-3 very very very very very long</span>
          <mg-icon icon="user" slot="illustration"></mg-icon>
        </mg-menu-item>
        <mg-menu-item size={firstLevelSize}>
          <span slot="label">level-1 - label-4</span>
          <mg-icon icon="user" slot="illustration"></mg-icon>
          <mg-badge value="2" label="hello" slot="information"></mg-badge>
          <mg-menu label="submenu" direction={Direction.VERTICAL}>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-1</span>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-2</span>
              <mg-icon icon="user" slot="illustration"></mg-icon>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-3 very long</span>
              <mg-icon icon="user" slot="illustration"></mg-icon>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-4</span>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                <mg-menu-item size="regular">
                  <span slot="label">level-3 - label-1</span>
                </mg-menu-item>
                <mg-menu-item size="regular">
                  <span slot="label">level-3 - label-2</span>
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                </mg-menu-item>
                <mg-menu-item size="regular">
                  <span slot="label">level-3 - label-3</span>
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                  <mg-badge value="2" label="hello" slot="information"></mg-badge>
                </mg-menu-item>
              </mg-menu>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-5</span>
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
            </mg-menu-item>
          </mg-menu>
        </mg-menu-item>
        <mg-menu-item size="regular">
          <span slot="label">level-1 - slot content</span>
          <span slot="metadata">my very long metadatas</span>
          <mg-icon icon="user" slot="illustration"></mg-icon>
          <mg-badge value="2" label="hello" slot="information"></mg-badge>
          <div>
            <h3>Demo title</h3>
            <p>some content</p>
          </div>
        </mg-menu-item>
        <mg-menu-item size={firstLevelSize}>
          <span slot="label">level-1 - label-6</span>
          <mg-badge value="2" label="hello" slot="information"></mg-badge>
          <mg-icon icon="user" slot="illustration"></mg-icon>
          <mg-menu label="submenu" direction={Direction.VERTICAL}>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-1</span>
              <mg-menu label="submenu" direction={Direction.VERTICAL}>
                <mg-menu-item size="medium">
                  <span slot="label">level-3 - label-1</span>
                  <mg-badge value="2" label="hello" slot="information"></mg-badge>
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                  <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                    <mg-menu-item size="medium" status={Status.ACTIVE}>
                      <span slot="label">level-4 - label-1</span>
                    </mg-menu-item>
                    <mg-menu-item size="medium">
                      <span slot="label">level-4 - label-2</span>
                      <mg-icon icon="user" slot="illustration"></mg-icon>
                    </mg-menu-item>
                    <mg-menu-item size="medium">
                      <span slot="label">level-4 - label-3</span>
                      <mg-icon icon="user" slot="illustration"></mg-icon>
                      <mg-badge value="2" label="hello" slot="information"></mg-badge>
                    </mg-menu-item>
                  </mg-menu>
                </mg-menu-item>
              </mg-menu>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-2</span>
              <mg-icon icon="user" slot="illustration"></mg-icon>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-3</span>
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-4 very long</span>
              <mg-icon icon="user" slot="illustration"></mg-icon>
              <mg-badge value="2" label="hello" slot="information"></mg-badge>
              <mg-menu label="submenu 2" direction={Direction.VERTICAL}>
                <mg-menu-item size="regular">
                  <span slot="label">level-3 - label-1</span>
                </mg-menu-item>
                <mg-menu-item size="regular">
                  <span slot="label">level-3 - label-2</span>
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                </mg-menu-item>
                <mg-menu-item size="regular">
                  <span slot="label">level-3 - label-3</span>
                  <mg-icon icon="user" slot="illustration"></mg-icon>
                  <mg-badge value="2" label="hello" slot="information"></mg-badge>
                </mg-menu-item>
              </mg-menu>
            </mg-menu-item>
            <mg-menu-item size="medium">
              <span slot="label">level-2 - label-5</span>
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
