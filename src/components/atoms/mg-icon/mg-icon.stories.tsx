import { h } from "@stencil/core";
import { icons, sizes } from "./mg-icon.conf";

export default {
  component: 'mg-icon',
  title: 'Atoms/mg-icon',
  argTypes: {
    icon: {
      options: Object.keys(icons),
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
  },
};

const Template = args => (
  <div style={{color: args.color}}>
    <mg-icon {...args}></mg-icon>
  </div>
);

export const MgIcon = Template.bind({});
MgIcon.args = {
  color: '',
  icon: Object.keys(icons)[0],
  size: sizes[1], // regular
};
