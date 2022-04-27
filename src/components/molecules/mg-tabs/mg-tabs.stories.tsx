import { h } from '@stencil/core';

import { sizes } from './mg-tabs.conf';

export default {
  component: 'mg-tabs',
  title: 'Molecules/mg-tabs',
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
  },
  parameters: { actions: { handles: ['active-tab-change'] } },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // return element
  const activeTab = args.activeTab;
  delete args.activeTab;
  return (
    <mg-tabs {...args} active-tab={activeTab}>
      <div slot="tab_content-1">Content 1</div>
      <div slot="tab_content-2">Content 2</div>
      <div slot="tab_content-3">Content 3</div>
    </mg-tabs>
  );
};

export const MgTabs = Template.bind({});

MgTabs.args = {
  items: ['Tab 1', 'Tab 2', 'Tab 3'],
  label: 'Short tabs description. Needed for accessibility',
  activeTab: undefined,
  size: sizes[0], // regular
};

export const MgTabsItems = Template.bind({});

MgTabsItems.args = {
  ...MgTabs.args,
  items: [
    {
      label: 'Tab 1',
      icon: 'check',
      badge: { value: 1, label: 'message' },
    },
    {
      label: 'Tab 2',
      badge: { value: 5, label: 'messages' },
      disabled: true,
    },
    {
      label: 'Tab 3',
      icon: 'cross',
    },
  ],
};
