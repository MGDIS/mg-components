import { h } from '@stencil/core';

export default {
  component: 'mg-tabs',
  title: 'Molecules/mg-tabs',
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // return element
  return (
    <mg-tabs {...args}>
      <div slot="tab_content-1">Content 1</div>
      <div slot="tab_content-2">Content 2</div>
      <div slot="tab_content-3">Content 3</div>
    </mg-tabs>
  );
};

export const MgTabs = Template.bind({});

MgTabs.args = {
  tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
};

export const MgTabsItems = Template.bind({});

MgTabsItems.args = {
  tabs: [
    {
      label: 'Tab 1',
      icon: 'check',
      badge: 1,
    },
    {
      label: 'Tab 2',
      badge: 5,
    },
    {
      label: 'Tab 3',
      icon: 'cross',
    },
  ],
};
