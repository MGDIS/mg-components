import { h } from "@stencil/core";

export default {
  component: 'mg-input-textarea',
  title: 'Molecules/Inputs/mg-input-textarea',
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
  const patternErrorMessage = args.patternErrorMessage;
  delete args.patternErrorMessage;
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  const characterLeftTemplate = args.characterLeftTemplate;
  delete args.characterLeftTemplate;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return <mg-input-textarea
    {...args}
    label-on-top={labelOnTop}
    label-hide={labelHide}
    pattern-error-message={patternErrorMessage}
    display-character-left={displayCharacterLeft}
    character-left-template={characterLeftTemplate}
    help-text={helpText}
  ></mg-input-textarea>
};

export const MgInputTextarea = Template.bind({});
MgInputTextarea.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
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
