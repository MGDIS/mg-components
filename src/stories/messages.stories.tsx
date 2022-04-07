import { h } from '@stencil/core';
import { variants } from '../components/molecules/mg-message/mg-message.conf';

export default {
  title: 'Style/Messages',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
};

const Template = args => (
  <main>
    <h1>Messages</h1>

    <h2>Simple</h2>

    <div class={`mg-message mg-message--${args.variant}`}>
      <span class="mg-message__icon">
        <mg-icon icon="info-circle"></mg-icon>
      </span>
      <div class="mg-message__content">
        <span class="mg-message__content-slot" innerHTML={args.content}></span>
      </div>
    </div>

    <h2>w/ close button</h2>

    <div class={`mg-message mg-message--${args.variant} mg-message--close-button`}>
      <span class="mg-message__icon">
        <mg-icon icon="info-circle"></mg-icon>
      </span>
      <div class="mg-message__content">
        <span class="mg-message__content-slot" innerHTML={args.content}></span>
      </div>
      <span class="mg-message__close-button">
        <button class="mg-button mg-button--flat mg-button--icon">
          <mg-icon icon="cross"></mg-icon>
        </button>
      </span>
    </div>

    <h2>w/ actions</h2>

    <div class={`mg-message mg-message--${args.variant}`}>
      <span class="mg-message__icon">
        <mg-icon icon="info-circle"></mg-icon>
      </span>
      <div class="mg-message__content">
        <span class="mg-message__content-slot" innerHTML={args.content}></span>
        <span class="mg-message__content-separator"></span>
        <span class="mg-message__content-actions-slot">
          <span class="mg-group-elements mg-group-elements--align-right">
            <button class="mg-button mg-button--primary">Primary</button>
            <button class="mg-button mg-button--secondary">Secondary</button>
          </span>
        </span>
      </div>
    </div>
  </main>
);

export const Messages = Template.bind({});
Messages.args = {
  variant: variants[0], // info
  content:
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
};
