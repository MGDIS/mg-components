import { h } from '@stencil/core';

export default {
  component: 'mg-input-checkbox',
  title: 'Molecules/Inputs/mg-input-checkbox',
  parameters: { actions: { handles: ['value-change'] } },
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
  // Extract slot so it won't be render as an attribute
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const helpText = args.helpText;
  delete args.helpText;
  const inputVerticalList = args.inputVerticalList;
  delete args.inputVerticalList;
  const labelHide = args.labelHide;
  delete args.labelHide;
  // return element
  return <mg-input-checkbox {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText} input-vertical-list={inputVerticalList}></mg-input-checkbox>;
};

export const MgInputCheckbox = Template.bind({});
MgInputCheckbox.args = {
  // Global
  value: [
    {
      title: 'HT',
      value: true,
    },
    {
      title: 'TTC',
      value: false,
      disabled: true,
    },
    {
      title: 'Mixte (HT/TTC)',
      value: null,
    },
  ],
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Option',
  labelOnTop: false,
  labelHide: false,
  // placement
  inputVerticalList: false,
  // Input
  required: false,
  disabled: false,
  readonly: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
