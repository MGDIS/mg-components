import { h } from '@stencil/core';

export default {
  component: 'mg-input-date',
  title: 'Molecules/Inputs/mg-input-date',
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => {
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return <mg-input-date {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText}></mg-input-date>;
};

const date = new Date();
const getFormatedNumber = (number: number) => {
  return `${number > 9 ? number : '0' + number}`;
};

export const MgInputDate = Template.bind({});

MgInputDate.args = {
  // Global
  value: `${date.getFullYear()}-${getFormatedNumber(date.getMonth())}-${getFormatedNumber(date.getDate())}`,
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
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};

export const MgInputDateMinMax = Template.bind({});

MgInputDateMinMax.args = {
  ...MgInputDate.args,
  // date range
  min: `${date.getFullYear()}-01-01`,
  max: `${date.getFullYear() + 1}-12-31`,
};
