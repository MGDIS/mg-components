import { h } from '@stencil/core';
import { filterArgs } from '../../.storybook/utils';

export default {
  title: 'Style/Helpers',
  argTypes: {
    align: {
      options: ['left', 'right'],
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
  <div>
    <h1>Helpers</h1>
    <h2>.mg-group-elements</h2>
    <p>
      Buttons can be grouped in an HTMLelement using the <code>.mg-group-elements</code> class, it will ensure a 10px margin space between them, even verticaly. Above exemples are
      using it.
    </p>
    <p>
      By adding the <code>.mg-group-elements--align-right</code> class you 'll set a right alignment of the button, even when line breaks.
    </p>
    <h3>Demo</h3>
    <div class={`mg-group-elements${args.align === 'right' ? ' mg-group-elements--align-right' : ''}`}>
      <mg-button>First Button</mg-button>
      <mg-button>
        <mg-icon icon="info-circle"></mg-icon>
        Second Button
      </mg-button>
      <mg-button {...filterArgs({ isIcon: true })} label="Third button">
        <mg-icon icon="info-circle"></mg-icon>
      </mg-button>
    </div>
  </div>
);

export const Helpers = Template.bind({});
Helpers.args = {
  align: 'left',
};
