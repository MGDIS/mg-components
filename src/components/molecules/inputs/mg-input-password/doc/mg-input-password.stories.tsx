import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-password',
  title: 'Molecules/Inputs/mg-input-password',
  argTypes: {
    mgWidth: {
      options: [2, 4, 16, 'full'],
      control: { type: 'select' },
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
const Template = (args: any): HTMLElement => <mg-input-password {...filterArgs(args)}></mg-input-password>;

/**
 * Global use
 */

export const MgInputPassword = Template.bind({});

MgInputPassword.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  labelHide: false,
  // Input
  placeholder: 'placeholder',
  maxlength: 400,
  required: true,
  disabled: false,
  readonly: false,
  mgWidth: 'full',
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
