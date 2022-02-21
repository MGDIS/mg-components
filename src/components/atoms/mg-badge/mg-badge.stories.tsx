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
    value: {
      control: { type: 'number' },
    },
  },
};

const Template = args => {
  // Extract slot so it won't be render as an attribute
  // return element
  return <mg-badge {...args}></mg-badge>;
};

export const MgBadge = Template.bind({});
MgBadge.args = {
  value: 99,
  label: 'unread messages',
  variant: variants[0],
  outline: false,
};
