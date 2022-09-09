import { h } from '@stencil/core';
import { filterArgs } from '../../.storybook/utils';
import { icons, sizes } from '../components/atoms/mg-icon/mg-icon.conf';

export default {
  title: 'Style/Icons',
  argTypes: {
    size: {
      options: sizes,
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
const Template = (args: any): HTMLElement => (
  <ul style={{ display: 'flex', flexWrap: 'wrap', margin: '0', padding: '0', listStyle: 'none', textAlign: 'center' }}>
    {Object.keys(icons).map((icon: string) => (
      <li style={{ margin: '1rem', padding: '1rem', width: '100px' }}>
        <div style={{ color: args.color, margin: '1rem' }}>
          <mg-icon {...filterArgs({ icon, size: args.size }, { size: 'regular' })}></mg-icon>
        </div>
        <div>{icon}</div>
      </li>
    ))}
  </ul>
);

export const Icons = Template.bind({});
Icons.args = {
  color: '',
  size: sizes[0], // regular
};
