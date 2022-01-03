import { h } from "@stencil/core";

export default {
  component: 'mg-input-checkbox',
  title: 'Molecules/Inputs/mg-input-checkbox',
  parameters: {
    docs: {
      source: {
        code: `<mg-input-checkbox
  label="Label"
  tooltip="This is a tooltip"
  help-text="Help text with html <strong>bold</strong>, <em>italic</em>."
  required></mg-input-checkbox>`,
      },
    },
  },
  argTypes: {
    value: {
      options: [true, 'false', null],
      control: { type: 'radio' }
    }
  }
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-checkbox
    {...args}
    label-on-top={args.labelOnTop}
    help-text={args.helpText}
  ></mg-input-checkbox>
);

export const MgInputCheckbox = Template.bind({});
MgInputCheckbox.args = {
  // Global
  value: null,
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  // Input
  required: true,
  disabled: false,
  readonly: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  // Checkbox
  indeterminate: false,
};
