import { h } from '@stencil/core';
import { variants } from './mg-badge.conf';

export default {
  component: 'mg-badge',
  title: 'Atoms/mg-badge',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: variants[0] },
      },
    },
    value: {
      control: { type: 'text' },
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
  value: '99',
  label: 'unread messages',
  variant: variants[0],
  outline: false,
};
