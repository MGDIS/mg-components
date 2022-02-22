import { h } from '@stencil/core';

export default {
  component: 'mg-input-date',
  title: 'Molecules/Inputs/mg-input-date',
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
  return <mg-input-date {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText}></mg-input-date>;
};

export const MgInputDate = Template.bind({});

const date = new Date();
const getMonth = date => {
  const month = `${date.getMonth() + 1}`;
  return `${month.length > 1 ? month : '0' + month}`;
};

MgInputDate.args = {
  // Global
  value: `${date.getFullYear()}-${getMonth(date)}-${date.getDate()}`,
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
  // Tooltip
  tooltip: 'This is a tooltip',
  // date range
  min: `${date.getFullYear()}-01-01`,
  max: `${date.getFullYear() + 1}-12-31`,
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
