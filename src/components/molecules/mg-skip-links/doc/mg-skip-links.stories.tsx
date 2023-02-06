import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-skip-links',
  title: 'Molecules/mg-skip-links',
  parameters: { actions: { handles: ['go-to-anchor'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-skip-links {...filterArgs(args)}></mg-skip-links>;

export const MgSkipLinks = Template.bind({});

MgSkipLinks.args = {
  links: [
    { href: '#content', label: 'Content' },
    { href: '#menu', label: 'Menu' },
    { href: '#search', label: 'Search' },
    { href: '#footer', label: 'Footer' },
  ],
};
