import { h } from "@stencil/core";

export default {
  component: 'mg-input-date',
  title: 'Molecules/mg-input-date',
  parameters: {
    docs: {
      source: {
        code: `<mg-input-date
  value="2021-10-14"
  label="Label"
  tooltip="This is a tooltip"
  help-text="Help text with html <strong>bold</strong>, <em>italic</em>."
  required
  has-colon></mg-input-date>`,
      },
    },
  },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-date
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    label-hide={args.labelHide}
    help-text={args.helpText}
  ></mg-input-date>
);

export const MgInputDate = Template.bind({});
MgInputDate.args = {
  // Global
  value: '2021-10-14',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  labelColon: true,
  labelHide: false,
  // Input
  required: true,
  readonly: false,
  disabled: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
