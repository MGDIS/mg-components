import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-action-more',
  title: 'Molecules/mg-action-more',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-action-more {...filterArgs(args)}>{args.slot}</mg-action-more>;

export const MgActionMore = Template.bind({});

MgActionMore.args = {
  items: [
    {
      label: 'element 1',
      mouseEventHandler: event => {
        console.log(event);
      },
    },
    {
      label: 'element 2',
      mouseEventHandler: event => {
        console.log(event);
      },
      badge: {
        value: 2,
        label: 'badge',
      },
    },
    {
      label: 'element 3',
      mouseEventHandler: event => {
        console.log(event);
      },
      icon: 'user',
    },
  ],
};

export const MgActionMoreCustom = Template.bind({});

MgActionMoreCustom.args = {
  ...MgActionMore.args,
  button: {
    variant: 'flat',
    isIcon: false,
    identifier: 'identifier',
    label: 'mon user',
  },
  icon: {
    icon: 'user',
  },
};
