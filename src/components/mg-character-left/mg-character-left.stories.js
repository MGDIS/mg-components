export default {
  component: 'mg-character-left',
  title: 'Atoms/mg-character-left',
};

const Template = args => <mg-character-left {...args}>{args.slot}</mg-character-left>;

export const MgCharacterLeft = Template.bind({});
MgCharacterLeft.args = {
  reference: 'test-label',
  characters: '',
  maxlength: 400,
  template: '{counter} characters left.',
};
