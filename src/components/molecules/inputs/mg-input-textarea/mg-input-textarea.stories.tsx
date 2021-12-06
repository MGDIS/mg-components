import { h } from "@stencil/core";

export default {
  component: 'mg-input-textarea',
  title: 'Molecules/mg-input-textarea',
  parameters: {
    docs: {
      source: {
        code: `<mg-input-textarea
  value=""
  label="Label"
  tooltip="This is a tooltip"
  help-text="Help text with html <strong>bold</strong>, <em>italic</em>."
  required
  has-colon></mg-input-text>`,
      },
    },
  },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-textarea
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    label-hide={args.labelHide}
    pattern-error-message={args.patternErrorMessage}
    display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
    character-left-template={args.characterLeftTemplate}
    help-text={args.helpText}
  ></mg-input-textarea>
);

export const MgInputTextarea = Template.bind({});
MgInputTextarea.args = {
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
  placeholder: 'placeholder',
  maxlength: 4000,
  required: true,
  disabled: false,
  readonly: false,
  pattern: undefined,
  patternErrorMessage: undefined,
  rows: 3,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Nb Char Left
  displayCharacterLeft: true,
  characterLeftTemplate: '{counter} characters left.',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
