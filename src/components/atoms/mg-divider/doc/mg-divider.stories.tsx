import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-divider',
  title: 'Atoms/mg-divider',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-divider {...filterArgs(args, { size: 'regular' })}></mg-divider>;

export const MgBadge = Template.bind({});
MgBadge.args = {
  size: 'regular',
};
