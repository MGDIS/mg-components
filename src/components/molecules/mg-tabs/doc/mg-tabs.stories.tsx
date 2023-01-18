import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

import { sizes, Status } from '../mg-tabs.conf';

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
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <mg-tabs {...filterArgs(args, { size: sizes[0], activeTab: 1 })}>
    <div slot="tab_content-1">Content 1</div>
    <div slot="tab_content-2">Content 2</div>
    <div slot="tab_content-3">Content 3</div>
    <div slot="tab_content-4">Content 4</div>
  </mg-tabs>
);

export const MgTabs = Template.bind({});

MgTabs.args = {
  items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
  label: 'Short tabs description. Needed for accessibility',
  activeTab: undefined,
  size: sizes[0], // regular
};

export const MgTabsItems = Template.bind({});

MgTabsItems.args = {
  ...MgTabs.args,
  activeTab: 3,
  items: [
    {
      label: 'Tab 1',
      icon: 'check',
      badge: { value: 1, label: 'message' },
    },
    {
      label: 'Tab 2',
      badge: { value: 5, label: 'messages', role: 'information' },
      status: Status.DISABLED,
    },
    {
      label: 'Tab 3',
      icon: 'cross',
      badge: { value: '9+', label: 'messages', role: 'notification' },
    },
    {
      label: 'Tab 4',
      icon: 'trash',
      status: Status.HIDDEN,
    },
  ],
};
