import { h } from "@stencil/core";

export default {
  component: 'mg-input-text',
  title: 'Molecules/mg-input-text',
  parameters: {
    docs: {
      source: {
        code: `<mg-input-text label="Label" required has-colon></mg-input-text>`,
      },
    },
  },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => (
  <mg-input-text
    {...args}
    label-on-top={args.labelOnTop}
    label-colon={args.labelColon}
    pattern-error-message={args.patternErrorMessage}
    display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
    character-left-template={args.characterLeftTemplate}
    help-text={args.helpText}
  ></mg-input-text>
);

export const MgInputText = Template.bind({});
MgInputText.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  labelColon: true,
  // Input
  placeholder: 'placeholder',
  maxlength: 400,
  required: true,
  disabled: false,
  readonly: false,
  pattern: undefined,
  patternErrorMessage: undefined,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Nb Char Left
  displayCharacterLeft: true,
  characterLeftTemplate: '{counter} characters left.',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};
