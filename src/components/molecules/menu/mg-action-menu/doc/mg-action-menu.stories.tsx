import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { sizes } from '../../mg-menu-item/mg-menu-item.conf';
import { interactivesElements, placements } from '../mg-action-menu.conf';

export default {
  component: 'mg-action-menu',
  title: 'Behaviors/mg-action-menu',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-action-menu {...filterArgs(args)}>{args.slot}</mg-action-menu>;

const args = {
  placement: placements[0],
  itemSize: sizes[0],
  interactiveElement: interactivesElements[0],
};

export const ButtonList = Template.bind({});

ButtonList.args = {
  ...args,
  slot: [
    <mg-button variant="secondary">Element 1</mg-button>,
    <mg-button>Element 2</mg-button>,
    <mg-button>
      Element 3<mg-badge value={1} label="movies"></mg-badge>
    </mg-button>,
  ],
};
