import { h } from '@stencil/core';

export default {
  component: 'mg-popover',
  title: 'Atoms/mg-popover',
  parameters: {
    layout: 'centered',
    docs: { iframeHeight: 600 },
  },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slotTitle = args.slotTitle;
  delete args.slotTitle;
  const slotContent = args.slotContent;
  delete args.slotContent;
  const closeButton = args.closeButton;
  delete args.closeButton;
  // return element
  return (
    <mg-popover {...args} close-button={closeButton}>
      <mg-button>Button</mg-button>
      {slotTitle && <h2 slot="title">{slotTitle}</h2>}
      {slotContent && <p slot="content">{slotContent}</p>}
    </mg-popover>
  );
};

export const MgPopover = Template.bind({});

MgPopover.args = {
  slotTitle: `Blu bli blo bla`,
  slotContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  identifier: 'identifier',
  closeButton: false,
  disabled: false,
  display: false,
};
