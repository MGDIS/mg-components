import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { icons, sizes, variants } from '../mg-icon.conf';

export default {
  component: 'mg-icon',
  title: 'Atoms/mg-icon',
  argTypes: {
    icon: {
      options: Object.keys(icons),
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    variant: {
      options: [undefined, ...variants],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => {
  const color = args.color;
  delete args.color;
  // return element
  return (
    <div style={{ color }}>
      <mg-icon {...filterArgs(args, { size: sizes[1] })}></mg-icon>
    </div>
  );
};

export const MgIcon = Template.bind({});
MgIcon.args = {
  color: '',
  icon: Object.keys(icons)[0],
  size: undefined,
  spin: false,
};
