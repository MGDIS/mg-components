export default {
  title: 'Demo/MgButton',
  argTypes: {
    label: { type: 'text', description: 'The text which is shown as label' },
    name: {
      type: 'text',
      description: 'Is needed to reference the form data after the form is submitted',
    },
    disabled: {
      type: 'boolean',
      description: 'If true, the button is displayed as disabled',
      defaultValue: { summary: false },
    },
  },
};

const defaultArgs = {
  disabled: false,
};

const Template = args => {
  return <mg-button {...args}></mg-button>;
};

export const MgButton = Template.bind({});
Default.MgButton = { ...defaultArgs };
