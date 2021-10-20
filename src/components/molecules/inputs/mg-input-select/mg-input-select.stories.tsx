import { h } from "@stencil/core";

export default {
  component: 'mg-input-select',
  title: 'Molecules/mg-input-select',
  parameters: {
    docs: {
      source: {
        code: `<mg-input-select
  value=""
  label="Label"
  tooltip="This is a tooltip"
  help-text="Help text with html <strong>bold</strong>, <em>italic</em>."
  required
  has-colon></mg-input-select>`,
      },
    },
  },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-select
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    help-text={args.helpText}
  ></mg-input-select>
);

export const MgInputSelect = Template.bind({});
MgInputSelect.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  labelColon: true,
  // Input
  required: true,
  readonly: false,
  disabled: false,
  items: ['blu', 'bli', 'blo', 'bla'],
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};

export const WithObjectItems = Template.bind({});
WithObjectItems.args = {
  ...MgInputSelect.args,
  items: [
    { title: 'blu', value: 'blublu' },
    { title: 'bli', value: 'blibli' },
    { title: 'blo', value: 'bloblo' },
    { title: 'bla', value: 'blabla' },
  ],
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  ...MgInputSelect.args,
  items: [
    { title: 'blu', value: 'blublu', group: '1st group' },
    { title: 'bli', value: 'blibli', group: '2nd group' },
    { title: 'blo', value: 'bloblo', group: '1st group' },
    { title: 'bla', value: 'blabla' },
  ],
};
