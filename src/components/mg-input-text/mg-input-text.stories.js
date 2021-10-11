export default {
  name: 'blu',
  component: 'mg-input-text',
  title: 'Components/mg-input-text',
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
  value: '',
  reference: 'reference-id',
  name: 'input-name',
  label: 'Label',
  labelOnTop: false,
  labelColon: true,
  placeholder: 'placeholder',
  maxlength: 400,
  required: true,
  pattern: undefined,
  patternErrorMessage: undefined,
  disabled: false,
  readonly: false,
  tooltip: 'This is a tooltip',
  displayCharacterLeft: true,
  characterLeftTemplate: '{counter} characters left.',
  helpText: 'Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.',
};
