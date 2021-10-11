export default {
  name: 'blu',
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
  parameters: {
    docs: {
      source: {
        code: `<mg-tag variant="brand">Label</mg-tag>`,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['product', 'success', 'warning', 'danger', 'draft'],
      control: { type: 'select' },
    },
  },
};

const Template = args => <mg-tag {...args}>{args.slot}</mg-tag>;

export const MgInputText = Template.bind({});
MgInputText.args = {
  slot: 'Label',
  variant: 'product',
};
