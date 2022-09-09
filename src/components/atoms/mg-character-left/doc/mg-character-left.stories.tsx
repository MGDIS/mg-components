import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-character-left',
  title: 'Atoms/mg-character-left',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-character-left {...filterArgs(args)}></mg-character-left>;

export const MgCharacterLeft = Template.bind({});

MgCharacterLeft.args = {
  identifier: 'identifier',
  characters: '',
  maxlength: 400,
};
