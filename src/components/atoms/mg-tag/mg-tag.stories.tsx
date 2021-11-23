import { h } from "@stencil/core";
import { variants } from "./mg-tag.conf";

export default {
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
};

const Template = args => <mg-tag {...args}>{args.slot}</mg-tag>;

export const MgTag = Template.bind({});
MgTag.args = {
  slot: 'Label',
  variant: variants[0],
  outline: false
};

MgTag.parameters = {
  docs: {
    source: {
      code: `<mg-tag
  variant="${MgTag.args.variant}"
>${MgTag.args.slot}</mg-tag>`,
    },
  },
};
