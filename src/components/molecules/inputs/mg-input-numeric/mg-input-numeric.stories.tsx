import { h } from "@stencil/core";
import { types } from './mg-input-numeric.conf'

export default {
  component: 'mg-input-numeric',
  title: 'Molecules/mg-input-numeric',
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
 const Template = args => (
  <mg-input-numeric
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    help-text={args.helpText}
  ></mg-input-numeric>
);

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
   labelColon: true,
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

 // Set exemple code for component
MgInputNumeric.parameters = {
  docs: {
    source: {
      code: `<mg-input-decimal
  value="${MgInputNumeric.args.value}"
  label="${MgInputNumeric.args.label}"
  tooltip="${MgInputNumeric.args.tooltip}"
  help-text="${MgInputNumeric.args.helpText}"
  type="${MgInputNumeric.args.type}"
  required
  has-colon
></mg-input-decimal>`,
    },
  },
};
