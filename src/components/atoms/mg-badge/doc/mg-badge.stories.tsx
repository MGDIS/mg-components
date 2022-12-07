import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { variants } from '../mg-badge.conf';

export default {
  component: 'mg-badge',
  title: 'Atoms/mg-badge',
  argTypes: {
    value: {
      control: { type: 'text' },
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
const Template = (args: any): HTMLElement => <mg-badge {...filterArgs(args, { variant: variants[0] })}></mg-badge>;

export const MgBadge = Template.bind({});
MgBadge.args = {
  value: '99',
  label: 'unread messages',
  variant: variants[0],
  outline: false,
};
