import { h } from "@stencil/core";

export default {
  component: 'mg-input-select',
  title: 'Molecules/mg-input-select',
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
    label-hide={args.labelHide}
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
  labelHide: false,
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

// Set exemple code for component
MgInputSelect.parameters = {
  docs: {
    source: {
      code: `<mg-input-select
  value="${MgInputSelect.args.value}"
  items="${MgInputSelect.args.items}"
  label="${MgInputSelect.args.label}"
  tooltip="${MgInputSelect.args.tooltip}"
  help-text="${MgInputSelect.args.helpText}"
  required
  has-colon
></mg-input-select>`
    },
  },
};

/**
 * Using object
 */

export const WithObjectItems = Template.bind({});
WithObjectItems.args = {
  ...MgInputSelect.args,
  // remove feature to focus on pattern
  tooltip: '',
  helpText: '',
  required: false,
  labelColon: false,
  //
  items: [
    { title: 'blu', value: 'blublu' },
    { title: 'bli', value: 'blibli' },
    { title: 'blo', value: 'bloblo' },
    { title: 'bla', value: 'blabla' },
  ],
};

// Set exemple code for component
WithObjectItems.parameters = {
  docs: {
    source: {
      code: `<mg-input-select
  value="${WithObjectItems.args.value}"
  items='${JSON.stringify(WithObjectItems.args.items)}'
  label="${WithObjectItems.args.label}"
  tooltip="${WithObjectItems.args.tooltip}"
  help-text="${WithObjectItems.args.helpText}"
></mg-input-select>`
    },
  },
};

/**
 * Using group object
 */

export const WithGroups = Template.bind({});
WithGroups.args = {
  ...WithObjectItems.args,
  items: [
    { title: 'blu', value: 'blublu', group: '1st group' },
    { title: 'bli', value: 'blibli', group: '2nd group' },
    { title: 'blo', value: 'bloblo', group: '1st group' },
    { title: 'bla', value: 'blabla' },
  ],
};

WithGroups.parameters = {
  docs: {
    source: {
      code: `<mg-input-select
  value="${WithGroups.args.value}"
  items='${JSON.stringify(WithGroups.args.items)}'
  label="${WithGroups.args.label}"
></mg-input-select>`
    },
  },
};
