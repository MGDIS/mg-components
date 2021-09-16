export default {
  component: 'mg-button',
  title: 'Components/MgButton',
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
};

const Template = args => <mg-button {...args}>{args.slot}</mg-button>;

export const MgButton = Template.bind({});
MgButton.args = {
  slot: 'Text button',
  variant: 'primary',
  label: 'Explicit aria label',
  disabled: false,
};
