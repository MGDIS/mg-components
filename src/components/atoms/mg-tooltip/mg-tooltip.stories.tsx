import { h } from "@stencil/core";

export default {
  component: 'mg-tooltip',
  title: 'Atoms/mg-tooltip',
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <mg-tooltip {...args}><mg-icon icon="info"></mg-icon></mg-tooltip>;

export const MgTooltip = Template.bind({});

MgTooltip.args = {
  identifier: 'identifier',
  message: 'This is a tooltip message',
  placement: 'bottom',
};
