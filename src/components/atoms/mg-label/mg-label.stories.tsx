import { h } from "@stencil/core";

export default {
  component: 'mg-label',
  title: 'Atoms/mg-label'
};

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slot = args.slot;
  delete args.slot;
  // return element
  return <mg-label {...args}>{slot}</mg-label>
};

export const MgLabel = Template.bind({});
MgLabel.args = {
  slot: 'Label',
  identifier: 'identifier',
  required: true,
  colon: true,
};
