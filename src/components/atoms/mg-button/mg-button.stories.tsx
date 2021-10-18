import { h } from "@stencil/core";

export default {
  component: 'mg-button',
  title: 'Atoms/mg-button',
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'alert', 'alert-alt', 'info'],
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
