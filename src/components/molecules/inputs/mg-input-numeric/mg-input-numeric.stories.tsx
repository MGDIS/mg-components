import { h } from "@stencil/core";
import { types } from './mg-input-numeric.conf'

export default {
  component: 'mg-input-numeric',
  title: 'Molecules/Inputs/mg-input-numeric',
  argTypes: {
    type: {
      options: types,
      control: { type: 'select' },
    },
  }
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
  return <mg-input-numeric
    {...args}
    label-on-top={labelOnTop}
    label-hide={labelHide}
    help-text={helpText}
  ></mg-input-numeric>
 }

/**
 * Global use
 */

export const MgInputNumeric = Template.bind({});

MgInputNumeric.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  type: types[0], // decimal
  // Label
  label: 'Label',
  labelOnTop: false,
  labelHide: false,
  // Input
  placeholder: 'placeholder',
  required: true,
  disabled: false,
  readonly: false,
  max: undefined,
  min: undefined,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
