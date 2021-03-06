import { h } from '@stencil/core';
import { variants } from '../mg-button.conf';
import { icons } from '../../mg-icon/mg-icon.conf';

export default {
  component: 'mg-button',
  title: 'Atoms/mg-button',
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
      table: {
        defaultValue: { summary: variants[0] },
      },
    },
  },
};

const Template = args => {
  // Extract slot so it won't be render as an attribute
  const slot = args.slot;
  delete args.slot;
  const disableOnClick = args.disableOnClick;
  delete args.disableOnClick;
  const isIcon = args.isIcon;
  delete args.isIcon;
  // return element
  return (
    <mg-button {...args} disable-on-click={disableOnClick} is-icon={isIcon}>
      {slot}
    </mg-button>
  );
};

export const MgButton = Template.bind({});

MgButton.args = {
  slot: 'Text button',
  variant: variants[0],
  label: 'Explicit aria label',
  identifier: undefined,
  disabled: false,
  disableOnClick: false,
  isIcon: false,
  expanded: false,
  controls: undefined,
};

export const IsIcon = Template.bind({});

IsIcon.args = {
  ...MgButton.args,
  isIcon: true,
  slot: <mg-icon icon={Object.keys(icons)[0]}></mg-icon>,
};

export const DisableOnClick = Template.bind({});

DisableOnClick.args = {
  ...MgButton.args,
  disableOnClick: true,
};
