import { h } from '@stencil/core';

import { Status } from '../mg-nav.conf';

export default {
  component: 'mg-nav',
  title: 'Molecules/mg-nav',
  parameters: { actions: { handles: ['active-nav-change'] } },
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */

const Template = args => {
  // return element
  const activeNav = args.activeNav;
  delete args.activeNav;
  return <mg-nav {...args} active-tab={activeNav}></mg-nav>;
};

export const MgNav = Template.bind({});

MgNav.args = {
  items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
  label: 'Short tabs description. Needed for accessibility',
  activeNav: undefined,
};

export const MgNavItems = Template.bind({});

MgNavItems.args = {
  ...MgNav.args,
  activeNav: 3,
  items: [
    {
      label: 'Tab 1',
      icon: 'check',
      badge: { value: 1, label: 'message' },
    },
    {
      label: 'Tab 2',
      badge: { value: 5, label: 'messages' },
      status: Status.DISABLED,
    },
    {
      label: 'Tab 3',
      icon: 'cross',
    },
    {
      label: 'Tab 4',
      icon: 'trash',
      status: Status.HIDDEN,
    },
  ],
};
