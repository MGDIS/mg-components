import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-textarea',
  title: 'Molecules/Inputs/mg-input-textarea',
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
const Template = (args: any): HTMLElement => {
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  // return element
  return <mg-input-textarea {...filterArgs(args)} display-character-left={displayCharacterLeft ? undefined : 'false'}></mg-input-textarea>;
};

export const MgInputTextarea = Template.bind({});
MgInputTextarea.args = {
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
  maxlength: 4000,
  required: true,
  disabled: false,
  readonly: false,
  pattern: undefined,
  patternErrorMessage: undefined,
  rows: 3,
  mgWidth: 'full',
  resizable: 'none',
  // Tooltip
  tooltip: 'This is a tooltip',
  // Nb Char Left
  displayCharacterLeft: true,
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
