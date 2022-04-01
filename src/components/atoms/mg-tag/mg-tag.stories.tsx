import { h } from '@stencil/core';
import { variants } from './mg-tag.conf';

export default {
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: variants[0] },
      },
    },
  },
};

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slot = args.slot;
  delete args.slot;
  // return element
  return <mg-tag {...args}>{slot}</mg-tag>;
};

export const MgTag = Template.bind({});
MgTag.args = {
  slot: 'Label',
  variant: variants[0],
  outline: false,
};
