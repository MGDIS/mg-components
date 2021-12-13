import { h } from "@stencil/core";

export default {
  component: 'mg-input-radio',
  title: 'Molecules/mg-input-radio',
  parameters: {
    docs: {
      source: {
        code: `<mg-input-radio
  label="Label"
  tooltip="This is a tooltip"
  help-text="Help text with html <strong>bold</strong>, <em>italic</em>."
  required
  has-colon></mg-input-radio>`,
      },
    },
  },
  argTypes: {
    value: {
      options: [null, 'HT', 'TTC', 'Mixte (HT/TTC)'],
      control: { type: 'radio' }
    }
  }
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-radio
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    help-text={args.helpText}
    input-vertical-list={args.inputVerticalList}
  ></mg-input-radio>
);

export const MgInputRadio = Template.bind({});
MgInputRadio.args = {
  // Global
  value: null,
  items: ['HT', 'TTC', 'Mixte (HT/TTC)'],
  identifier: 'identifier',
  name: 'input-name',
  legend: 'Legend',
  // Label
  label: 'Option',
  labelOnTop: false,
  labelColon: false,
  // Input
  required: false,
  disabled: false,
  readonly: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  // Checkbox
  indeterminate: false,
};

export const ItemsWithOptions = Template.bind({});
ItemsWithOptions.args = {
  ...MgInputRadio.args,
  required: true,
  items: [{
    title: 'HT',
    value: 'HT'
  }, {
    title: 'TTC',
    value: 'TTC',
    disabled: true
  }, {
    title: 'Mixte (HT/TTC)',
    value: 'Mixte (HT/TTC)'
  }],
};

export const MgInputRadioTopLabel = Template.bind({});
MgInputRadioTopLabel.args = {
  ...MgInputRadio.args,
  labelOnTop: true,
}

export const VerticalDisplayWithLeftLabel = Template.bind({});
VerticalDisplayWithLeftLabel.args = {
  ...MgInputRadio.args,
  inputVerticalList: true,
}

export const VerticalDisplayWithTopLabel = Template.bind({});
VerticalDisplayWithTopLabel.args = {
  ...MgInputRadio.args,
  inputVerticalList: true,
  labelOnTop: true,
}
