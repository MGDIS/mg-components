export default {
  component: 'mg-label',
  title: 'Atoms/mg-label',
  parameters: {
    docs: {
      source: {
        code: `<mg-label required colon>Label</mg-label>`,
      },
    },
  },
};

const Template = args => <mg-label {...args}>{args.slot}</mg-label>;

export const MgLabel = Template.bind({});
MgLabel.args = {
  slot: 'Label',
  reference: 'reference-id',
  required: true,
  colon: true,
};
