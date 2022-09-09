import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { variants } from '../mg-message.conf';

export default {
  component: 'mg-message',
  title: 'Molecules/mg-message',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: variants[0] },
      },
    },
  },
  parameters: { actions: { handles: ['component-show', 'component-hide'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <mg-message {...filterArgs(args, { variant: variants[0] })}>
    {args.slotContent && <span innerHTML={args.slotContent}></span>}
    {args.slotActions && <span slot="actions" innerHTML={args.slotActions}></span>}
  </mg-message>
);

export const MgMessage = Template.bind({});

MgMessage.args = {
  slotContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
  slotActions: ``,
  identifier: 'identifier',
  variant: variants[0], // info
  closeButton: false,
  hide: false,
  delay: undefined,
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
  slotActions: `<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`,
};
