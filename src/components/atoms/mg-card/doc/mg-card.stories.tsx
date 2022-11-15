import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-card',
  title: 'Atoms/mg-card',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-card {...filterArgs(args)}>{args.slot}</mg-card>;

export const MgCard = Template.bind({});
MgCard.args = {
  slot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
