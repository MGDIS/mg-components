import { h } from '@stencil/core';
import { variants } from './mg-badge.conf';

export default {
  component: 'mg-badge',
  title: 'Atoms/mg-badge',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
};

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slot = args.slot;
  delete args.slot;
  // return element
  return <mg-badge {...args}>{slot}</mg-badge>;
};

export const MgBadge = Template.bind({});
MgBadge.args = {
  slot: 'Label',
  variant: variants[0],
  outline: false,
};
