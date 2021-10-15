import { h } from "@stencil/core";

export default {
  component: 'mg-icon',
  title: 'Atoms/mg-icon',
  argTypes: {
    icon: {
      options: ['user-cadenas', 'editable'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'regular', 'large'],
      control: { type: 'select' },
    },
  },
};

const Template = args => (
  <div style={{color: args.color}}>
    <mg-icon {...args}></mg-icon>
  </div>
);

export const MgIconT = Template.bind({});
MgIconT.args = {
  color: '',
  icon: 'user-cadenas',
  size: 'regular',
};
