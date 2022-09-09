import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-checkbox',
  title: 'Molecules/Inputs/mg-input-checkbox',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <div>
    <mg-input-checkbox {...filterArgs(args)}></mg-input-checkbox>
    {`\<!-- blu --\>`}
  </div>
);

export const MgInputCheckbox = Template.bind({});
MgInputCheckbox.args = {
  // Global
  value: [
    {
      title: 'HT',
      value: true,
    },
    {
      title: 'TTC',
      value: false,
      disabled: true,
    },
    {
      title: 'Mixte (HT/TTC)',
      value: null,
    },
  ],
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
