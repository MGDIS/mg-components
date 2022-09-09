import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-radio',
  title: 'Molecules/Inputs/mg-input-radio',
  argTypes: {
    value: {
      options: [null, 'ht', 'ttc', 'mixte'],
      control: { type: 'radio' },
    },
  },
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-radio {...filterArgs(args)}></mg-input-radio>;

export const MgInputRadio = Template.bind({});
MgInputRadio.args = {
  // Global
  value: null,
  items: ['ht', 'ttc', 'mixte'],
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Option',
  labelOnTop: false,
  labelHide: false,
  // placement
  inputVerticalList: false,
  // Input
  required: false,
  disabled: false,
  readonly: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};

export const ItemsWithOptions = Template.bind({});
ItemsWithOptions.args = {
  ...MgInputRadio.args,
  required: true,
  items: [
    {
      title: 'HT',
      value: 'ht',
    },
    {
      title: 'TTC',
      value: 'ttc',
      disabled: true,
    },
    {
      title: 'Mixte (HT/TTC)',
      value: 'mixte',
    },
  ],
};
