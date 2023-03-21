import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import messages from '../../../../../locales/en/messages.json';

export default {
  component: 'mg-input-select',
  title: 'Molecules/Inputs/mg-input-select',
  argTypes: {
    placeholder: {
      table: {
        defaultValue: { summary: messages.input.select.placeholder },
      },
    },
    mgWidth: {
      options: [undefined, 2, 4, 16, 'full'],
      control: { type: 'select' },
    },
    value: {
      control: 'object',
    },
  },
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-select {...filterArgs(args, { placeholder: messages.input.select.placeholder })}></mg-input-select>;

export const MgInputSelect = Template.bind({});
MgInputSelect.args = {
  // Global
  value: '',
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Label',
  labelOnTop: false,
  labelHide: false,
  // Input
  required: true,
  readonly: false,
  disabled: false,
  items: ['blu', 'bli', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
  mgWidth: undefined,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  // Placeholder
  placeholder: undefined,
  placeholderHide: false,
  placeholderDisabled: false,
};

/**
 * Using object
 */

export const WithObjectItems = Template.bind({});
WithObjectItems.args = {
  ...MgInputSelect.args,
  // remove feature to focus on pattern
  tooltip: '',
  helpText: '',
  required: false,
  //
  items: [
    { title: 'blu', value: 'blublu' },
    { title: 'bli', value: 'blibli' },
    { title: 'blo', value: 'bloblo' },
    { title: 'bla', value: 'blabla', disabled: true },
  ],
};

/**
 * Using group object
 */

export const WithGroups = Template.bind({});
WithGroups.args = {
  ...WithObjectItems.args,
  items: [
    { title: 'blu', value: 'blublu', group: '1st group' },
    { title: 'bli', value: 'blibli', group: '2nd group' },
    { title: 'blo', value: 'bloblo', group: '1st group' },
    { title: 'bla', value: 'blabla' },
  ],
};
