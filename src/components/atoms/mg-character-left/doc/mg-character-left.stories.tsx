import { h } from '@stencil/core';
import messages from '../../../../locales/en/messages.json';

export default {
  component: 'mg-character-left',
  title: 'Atoms/mg-character-left',
  argTypes: {
    template: {
      table: {
        defaultValue: { summary: messages.nbCharLeft },
      },
    },
  },
};

const Template = args => <mg-character-left {...args}></mg-character-left>;

export const MgCharacterLeft = Template.bind({});

MgCharacterLeft.args = {
  identifier: 'identifier',
  characters: '',
  maxlength: 400,
  template: undefined,
};

export const CustomTemplate = Template.bind({});

CustomTemplate.args = {
  ...MgCharacterLeft.args,
  maxlength: 100,
  template: 'Custom template with {counter} characters left.',
};
