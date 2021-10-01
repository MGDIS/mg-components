export default {
  component: 'mg-character-left',
  title: 'Atoms/mg-character-left',
  parameters: {
    docs: {
      source: {
        code: `<mg-character-left
  reference="reference-id"
  characters=""
  maxlength="400"
  template="{counter} characters left."
></mg-character-left>`,
      },
    },
  },
};

const Template = args => <mg-character-left {...args}></mg-character-left>;

export const MgCharacterLeft = Template.bind({});
MgCharacterLeft.args = {
  reference: 'reference-id',
  characters: '',
  maxlength: 400,
  template: '{counter} characters left.',
};
