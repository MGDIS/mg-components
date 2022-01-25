import { h } from '@stencil/core';

export default {
  component: 'mg-input-toggle',
  title: 'Molecules/Inputs/mg-input-toggle',
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
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 */
const Template = args => {
  // Extract slot so it won't be render as an attribute
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const isIcon = args.isIcon;
  delete args.isIcon;
  const isOnOff = args.isOnOff;
  delete args.isOnOff;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return (
    <mg-input-toggle {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText} is-icon={isIcon} is-on-off={isOnOff}>
      <span slot="item-1">Non</span>
      <span slot="item-2">Oui</span>
    </mg-input-toggle>
  );
};

export const MgInputtoggle = Template.bind({});
MgInputtoggle.args = { ...args };

const TemplateIcon = args => {
  // Extract slot so it won't be render as an attribute
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const helpText = args.helpText;
  delete args.helpText;
  const labelHide = args.labelHide;
  delete args.labelHide;

  const isIcon = args.isIcon;
  delete args.isIcon;
  const isOnOff = args.isOnOff;
  delete args.isOnOff;
  // return element
  return (
    <mg-input-toggle {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText} is-icon={isIcon} is-on-off={isOnOff}>
      <span slot="item-1">
        <mg-icon icon="cross"></mg-icon>
      </span>
      <span slot="item-2">
        <mg-icon icon="check"></mg-icon>
      </span>
    </mg-input-toggle>
  );
};

export const MgInputtoggleWithIcon = TemplateIcon.bind({});
MgInputtoggleWithIcon.args = {
  ...args,
  isIcon: true,
  isOnOff: true,
};
