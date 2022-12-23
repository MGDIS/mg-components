import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-action-more',
  title: 'Beta/menus/mg-action-more',
  parameters: { actions: { handles: ['selected-change'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-action-more {...filterArgs(args)}>{args.slot}</mg-action-more>;

export const MoreElement = Template.bind({});

MoreElement.args = {
  items: [
    {
      label: 'element 1',
    },
    {
      label: 'element 2',
      badge: {
        value: 2,
        label: 'badge',
      },
    },
    {
      label: 'element 3',
      icon: 'user',
    },
  ],
};
