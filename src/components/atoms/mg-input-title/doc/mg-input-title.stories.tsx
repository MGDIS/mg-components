import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-input-title',
  title: 'Atoms/mg-input-title',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-title {...filterArgs(args)}>{args.slot}</mg-input-title>;

export const MgInputTitle = Template.bind({});
MgInputTitle.args = {
  slot: 'Label',
  identifier: 'identifier',
  required: true,
  isLegend: false,
};
