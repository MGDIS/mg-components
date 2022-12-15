import { h } from '@stencil/core';
import { Direction } from '../mg-menu.conf';
import { getMenuArgs, menu } from './mg-menu.stories.shared';

export default {
  component: 'mg-menu',
  title: 'Beta/menus/mg-menu',
  argTypes: {
    direction: {
      options: [undefined, Direction.HORIZONTAL, Direction.VERTICAL],
      control: { type: 'select' },
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
const Template = (args: any): HTMLElement => <div>{menu(args)}</div>;

export const MgMenuHorizontal = Template.bind({});

MgMenuHorizontal.args = getMenuArgs(Direction.HORIZONTAL, 2);

export const MgMenuVertical = Template.bind({});

MgMenuVertical.args = getMenuArgs(Direction.VERTICAL, 2);

const TemplateSmallContainer = (args: any): HTMLElement => {
  return <div style={{ width: '25rem', height: '20rem' }}>{menu(args)}</div>;
};

export const MgMenuVerticalSmallContainer = TemplateSmallContainer.bind({});

MgMenuVerticalSmallContainer.args = {
  ...MgMenuVertical.args,
};
