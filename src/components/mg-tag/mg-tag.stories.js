export default {
  name: 'blu',
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
  parameters: {
    docs: {
      source: {
        code: `<mg-tag variant="product">Label</mg-tag>`,
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

export const MgTag = Template.bind({});
MgTag.args = {
  slot: 'Label',
  variant: 'product',
};
