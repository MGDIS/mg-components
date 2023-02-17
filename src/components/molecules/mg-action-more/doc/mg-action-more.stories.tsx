import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-action-more',
  title: 'Molecules/mg-action-more',
  parameters: { actions: { handles: ['click'] } },
};

const mouseEventHandler = () => {
  window.alert('This alert comme from the clicked item method "mouseEventHandler".');
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-action-more {...filterArgs(args)} style={{ 'margin-left': '1rem' }}></mg-action-more>;

export const MgActionMore = Template.bind({});

MgActionMore.args = {
  items: [
    {
      label: 'element 1',
      mouseEventHandler,
    },
    {
      label: 'element 2',
      mouseEventHandler,
      badge: {
        value: 2,
        label: 'badge',
      },
    },
    {
      label: 'element 3',
      mouseEventHandler,
      icon: 'user',
    },
    {
      label: 'element 4',
      mouseEventHandler,
      href: '#',
    },
  ],
};

export const MgActionMoreCustom = Template.bind({});

MgActionMoreCustom.args = {
  ...MgActionMore.args,
  button: {
    variant: 'flat',
    isIcon: false,
    label: 'mon user',
  },
  icon: {
    icon: 'user',
  },
};
