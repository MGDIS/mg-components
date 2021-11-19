import { h } from "@stencil/core";
import { variants } from "./mg-button.conf";
import { icons } from "../mg-icon/mg-icon.conf";

export default {
  component: 'mg-button',
  title: 'Atoms/mg-button',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
};

const Template = args => <mg-button
  {...args}>
    {args.slot}
</mg-button>;

export const MgButton = Template.bind({});

MgButton.args = {
  slot: 'Text button',
  variant: variants[0],
  label: 'Explicit aria label',
  disabled: false,
};

// Set exemple code for component
MgButton.parameters = {
  docs: {
    source: {
      code: `<mg-button
  variant="${MgButton.args.variant}"
  label="${MgButton.args.label}"
>${MgButton.args.slot}</mg-input-text>`,
    },
  },
};

const TemplateIsIcon = args => <mg-button
  {...args}
  is-icon><mg-icon icon={args.icon}></mg-icon>
</mg-button>;

export const isIcon = TemplateIsIcon.bind({});

isIcon.args = {
  icon: Object.keys(icons)[0],
  variant: variants[0],
  label: 'Explicit aria label',
  disabled: false,
};

isIcon.argTypes = {
  icon: {
    options: Object.keys(icons),
    control: { type: 'select' },
  },
};

isIcon.parameters = {
  docs: {
    source: {
      code: `<mg-button
  variant="${isIcon.args.variant}"
  label="${isIcon.args.label}"
>
  <mg-icon icon="${isIcon.args.icon}"></mg-icon>
</mg-input-text>`,
    },
  },
};
