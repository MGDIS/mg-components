import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-toggle',
  title: 'Molecules/Inputs/mg-input-toggle',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

const args = {
  // Global
  value: null,
  items: [
    { title: 'non', value: false },
    { title: 'oui', value: true },
  ],
  identifier: 'identifier',
  name: 'input-name',
  // Label
  label: 'Option',
  labelOnTop: false,
  labelHide: false,
  // toggle
  isIcon: false,
  isOnOff: false,
  // Input
  disabled: false,
  readonly: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
  <mg-input-toggle {...filterArgs(args)}>
    <span slot="item-1">Non</span>
    <span slot="item-2">Oui</span>
  </mg-input-toggle>
);

export const MgInputToggle = Template.bind({});
MgInputToggle.args = { ...args };

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateIcon = (args: any): HTMLElement => (
  <mg-input-toggle {...filterArgs(args)}>
    <span slot="item-1">
      <mg-icon icon="cross"></mg-icon>
    </span>
    <span slot="item-2">
      <mg-icon icon="check"></mg-icon>
    </span>
  </mg-input-toggle>
);

export const MgInputToggleWithIcon = TemplateIcon.bind({});
MgInputToggleWithIcon.args = {
  ...args,
  isIcon: true,
  isOnOff: true,
};
