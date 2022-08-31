import { h } from '@stencil/core';

export default {
  component: 'mg-details',
  title: 'Molecules/mg-details',
  parameters: { actions: { handles: ['expanded-change'] } },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slotSummary = args.slotSummary;
  delete args.slotSummary;
  const slotDetails = args.slotDetails;
  delete args.slotDetails;
  const toggleClosed = args.toggleClosed;
  delete args.toggleClosed;
  const toggleOpened = args.toggleOpened;
  delete args.toggleOpened;
  // return element
  return (
    <mg-details {...args} toggle-closed={toggleClosed} toggle-opened={toggleOpened}>
      {slotSummary && <span slot="summary" innerHTML={slotSummary}></span>}
      {slotDetails && <p slot="details" innerHTML={slotDetails}></p>}
    </mg-details>
  );
};

export const MgDetails = Template.bind({});

MgDetails.args = {
  slotSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  slotDetails:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  toggleClosed: 'Show details',
  toggleOpened: 'Hide details',
  expanded: false,
};
