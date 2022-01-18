import { h } from "@stencil/core";

export default {
  component: 'mg-tooltip',
  title: 'Atoms/mg-tooltip',
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <mg-tooltip {...args}><mg-icon icon="info-circle"></mg-icon></mg-tooltip>;

export const MgTooltip = Template.bind({});

MgTooltip.args = {
  identifier: 'identifier',
  message: 'This is a tooltip message',
  placement: 'bottom',
  display: false
};

const TemplateButton = args => <mg-tooltip {...args}><mg-button>Action</mg-button></mg-tooltip>;

export const MgTooltipOnButton = TemplateButton.bind({});

MgTooltipOnButton.args = {
  ...MgTooltip.args
};

const TemplateSpan = args => <mg-tooltip {...args}><span>any text</span></mg-tooltip>;

export const MgTooltipOnSpan = TemplateSpan.bind({});

MgTooltipOnSpan.args = {
  ...MgTooltip.args
};
