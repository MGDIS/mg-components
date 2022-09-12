import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { placements } from '../mg-tooltip.conf';

export default {
  component: 'mg-tooltip',
  title: 'Atoms/mg-tooltip',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      options: placements,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'bottom' },
      },
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
const Template = (args: any): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <mg-icon icon="info-circle"></mg-icon>
  </mg-tooltip>
);

export const MgTooltip = Template.bind({});

MgTooltip.args = {
  identifier: 'identifier',
  message: 'This is a tooltip message',
  placement: undefined,
  display: false,
  disabled: false,
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateButton = (args: any): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <mg-button>Action</mg-button>
  </mg-tooltip>
);

export const MgTooltipOnButton = TemplateButton.bind({});

MgTooltipOnButton.args = {
  ...MgTooltip.args,
};

/**
 * Template
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateSpan = (args: any): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <span>any text</span>
  </mg-tooltip>
);

export const MgTooltipOnSpan = TemplateSpan.bind({});

MgTooltipOnSpan.args = {
  ...MgTooltip.args,
};
