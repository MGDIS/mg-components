import { h } from '@stencil/core';
import { variants } from '../components/atoms/mg-button/mg-button.conf';

export default {
  title: 'Style/Buttons',
  argTypes: {
    align: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
  },
};

const Template = args => (
  <div>
    <h1>Buttons</h1>
    {variants.map(variant => (
      <div style={{ marginBottom: '1rem' }} class={`mg-group-elements${args.align === 'right' ? ' mg-group-elements--align-right' : ''}`}>
        <button class={`mg-button mg-button--${variant}`} {...args}>
          {variant}
        </button>
        <button class={`mg-button mg-button--${variant}`} {...args}>
          <mg-icon icon="info-circle"></mg-icon>
          {variant}
        </button>
        <button class={`mg-button mg-button--${variant} mg-button--icon`} {...args}>
          <mg-icon icon="info-circle"></mg-icon>
        </button>
      </div>
    ))}
    <h2>Link</h2>
    {variants.map(variant => (
      <div style={{ marginBottom: '1rem' }} class={`mg-group-elements${args.align === 'right' ? ' mg-group-elements--align-right' : ''}`}>
        <a class={`mg-button mg-button--${variant}`} {...args}>
          {variant}
        </a>
        <a class={`mg-button mg-button--${variant}`} {...args}>
          <mg-icon icon="info-circle"></mg-icon>
          {variant}
        </a>
        <a class={`mg-button mg-button--${variant} mg-button--icon`} {...args}>
          <mg-icon icon="info-circle"></mg-icon>
        </a>
      </div>
    ))}
    <h2>Helpers</h2>
    <h3>.mg-group-elements</h3>
    <p>
      Buttons can be grouped in an HTMLelement using the <code>.mg-group-elements</code> class, it will ensure a 10px margin space between them, even verticaly. Above exemples are
      using it.
    </p>
    <p>
      By adding the <code>.mg-group-elements--align-right</code> class you 'll set a right alignment of the button, even when line breaks.
    </p>
  </div>
);

export const Buttons = Template.bind({});
Buttons.args = {
  disabled: false,
  align: 'left',
};
