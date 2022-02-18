import { h } from '@stencil/core';

export default {
  component: 'mg-input-title',
  title: 'Atoms/mg-input-title',
};

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slot = args.slot;
  delete args.slot;
  const isLegend = args.isLegend;
  delete args.isLegend;

  // return element
  return (
    <mg-input-title {...args} is-legend={isLegend}>
      {slot}
    </mg-input-title>
  );
};

export const MgInputTitle = Template.bind({});
MgInputTitle.args = {
  slot: 'Label',
  identifier: 'identifier',
  required: true,
  isLegend: false,
};
