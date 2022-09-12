import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { placements } from '../mg-popover.conf';

export default {
  component: 'mg-popover',
  title: 'Molecules/mg-popover',
  parameters: {
    layout: 'centered',
    docs: { iframeHeight: 600 },
    actions: { handles: ['display-change'] },
  },
  argTypes: {
    placement: {
      options: placements,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'bottom' },
      },
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
  <mg-popover {...filterArgs(args, { placement: 'bottom' })}>
    <mg-button>Button</mg-button>
    {args.slotTitle && <h2 slot="title">{args.slotTitle}</h2>}
    {args.slotContent && <p slot="content">{args.slotContent}</p>}
  </mg-popover>
);

export const MgPopover = Template.bind({});

MgPopover.args = {
  slotTitle: `Blu bli blo bla`,
  slotContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  identifier: 'identifier',
  closeButton: false,
  disabled: false,
  display: false,
  placement: undefined,
};
