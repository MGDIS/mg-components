import { h } from "@stencil/core";

export default {
  component: 'mg-input-select',
  title: 'Molecules/Inputs/mg-input-select',
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
  return <mg-input-select
    {...args}
    label-on-top={labelOnTop}
    label-hide={labelHide}
    help-text={helpText}
  ></mg-input-select>
}

export const MgInputSelect = Template.bind({});
MgInputSelect.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
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
  //
  items: [
    { title: 'blu', value: 'blublu' },
    { title: 'bli', value: 'blibli' },
    { title: 'blo', value: 'bloblo' },
    { title: 'bla', value: 'blabla', disabled: true },
  ],
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
