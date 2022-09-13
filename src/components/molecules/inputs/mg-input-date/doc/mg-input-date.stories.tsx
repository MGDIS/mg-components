import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-date',
  title: 'Molecules/Inputs/mg-input-date',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-date {...filterArgs(args)}></mg-input-date>;

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
