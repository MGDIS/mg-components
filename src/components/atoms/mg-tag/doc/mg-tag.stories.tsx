import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { variants } from '../mg-tag.conf';

export default {
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: variants[0] },
      },
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
const Template = (args: any): HTMLElement => <mg-tag {...filterArgs(args, { variant: variants[0] })}>{args.slot}</mg-tag>;

export const MgTag = Template.bind({});
MgTag.args = {
  slot: 'Label',
  variant: variants[0],
  outline: false,
};
