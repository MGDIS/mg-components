import { h } from '@stencil/core';
import { variants, buttonTypes } from '../mg-button.conf';
import { icons } from '../../mg-icon/mg-icon.conf';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-button',
  title: 'Atoms/mg-button',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: variants[0] },
      },
    },
    type: {
      options: [undefined, ...buttonTypes],
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
const Template = (args: any): HTMLElement => <mg-button {...filterArgs(args, { variant: variants[0] })}>{args.slot}</mg-button>;

export const MgButton = Template.bind({});

MgButton.args = {
  slot: 'Text button',
  variant: variants[0],
  label: 'Explicit aria label',
  identifier: undefined,
  disabled: false,
  disableOnClick: false,
  isIcon: false,
  expanded: false,
  controls: undefined,
  type: undefined,
};

export const IsIcon = Template.bind({});

IsIcon.args = {
  ...MgButton.args,
  isIcon: true,
  slot: <mg-icon icon={Object.keys(icons)[0]}></mg-icon>,
};

export const DisableOnClick = Template.bind({});

DisableOnClick.args = {
  ...MgButton.args,
  disableOnClick: true,
};
