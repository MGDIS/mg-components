import { h } from '@stencil/core';
import { variants } from './mg-message.conf';

export default {
  component: 'mg-message',
  title: 'Molecules/mg-message',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slotContent = args.slotContent;
  delete args.slotContent;
  const slotActions = args.slotActions;
  delete args.slotActions;
  const closeButton = args.closeButton;
  delete args.closeButton;
  // return element
  return (
    <mg-message {...args} close-button={closeButton}>
      {slotContent && <span innerHTML={slotContent}></span>}
      {slotActions && <span slot="actions" innerHTML={slotActions}></span>}
    </mg-message>
  );
};

export const MgMessage = Template.bind({});

MgMessage.args = {
  slotContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
  slotActions: ``,
  identifier: 'identifier',
  variant: variants[0], // info
  closeButton: false,
  hide: false,
};

export const WithCloseButton = Template.bind({});

WithCloseButton.args = {
  ...MgMessage.args,
  variant: 'danger',
  closeButton: true,
};

export const WithActions = Template.bind({});

WithActions.args = {
  ...MgMessage.args,
  variant: 'warning',
  slotActions: `<div slot="actions" class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`,
};
