import { h } from '@stencil/core';

export default {
  component: 'mg-input-password',
  title: 'Molecules/Inputs/mg-input-password',
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => {
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return <mg-input-password {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText}></mg-input-password>;
};

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
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};