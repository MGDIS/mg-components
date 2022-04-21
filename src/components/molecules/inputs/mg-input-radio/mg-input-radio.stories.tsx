import { h } from '@stencil/core';

export default {
  component: 'mg-input-radio',
  title: 'Molecules/Inputs/mg-input-radio',
  argTypes: {
    value: {
      options: [null, 'ht', 'ttc', 'mixte'],
      control: { type: 'radio' },
    },
  },
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
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
  const helpText = args.helpText;
  delete args.helpText;
  const inputVerticalList = args.inputVerticalList;
  delete args.inputVerticalList;
  const labelHide = args.labelHide;
  delete args.labelHide;
  // return element
  return <mg-input-radio {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText} input-vertical-list={inputVerticalList}></mg-input-radio>;
};

export const MgInputRadio = Template.bind({});
MgInputRadio.args = {
  // Global
  value: null,
  items: ['ht', 'ttc', 'mixte'],
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

export const ItemsWithOptions = Template.bind({});
ItemsWithOptions.args = {
  ...MgInputRadio.args,
  required: true,
  items: [
    {
      title: 'HT',
      value: 'ht',
    },
    {
      title: 'TTC',
      value: 'ttc',
      disabled: true,
    },
    {
      title: 'Mixte (HT/TTC)',
      value: 'mixte',
    },
  ],
};
