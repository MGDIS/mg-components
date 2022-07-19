import { h } from '@stencil/core';
import { types } from '../mg-input-numeric.conf';

export default {
  component: 'mg-input-numeric',
  title: 'Molecules/Inputs/mg-input-numeric',
  argTypes: {
    type: {
      options: types,
      control: { type: 'select' },
    },
    mgWidth: {
      options: [undefined, 2, 4, 16, 'full'],
      control: { type: 'select' },
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
  const labelHide = args.labelHide;
  delete args.labelHide;
  const helpText = args.helpText;
  delete args.helpText;
  const mgWidth = args.mgWidth;
  delete args.mgWidth;
  // return element
  return <mg-input-numeric {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText} mg-width={mgWidth}></mg-input-numeric>;
};

/**
 * Global use
 */

export const MgInputNumeric = Template.bind({});

MgInputNumeric.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  type: types[0], // decimal
  // Label
  label: 'Label',
  labelOnTop: false,
  labelHide: false,
  // Input
  placeholder: 'placeholder',
  required: true,
  disabled: false,
  readonly: false,
  max: undefined,
  min: undefined,
  mgWidth: undefined,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};

const TemplateSlot = args => {
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return (
    <mg-input-numeric {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText}>
      <span slot="append-input">km</span>
    </mg-input-numeric>
  );
};

/**
 * Global use
 */

export const AppendSlot = TemplateSlot.bind({});

AppendSlot.args = {
  ...MgInputNumeric.args,
};
