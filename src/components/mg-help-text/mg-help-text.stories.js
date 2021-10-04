export default {
  component: 'mg-text-help',
  title: 'Atoms/mg-text-help',
  parameters: {
    docs: {
      source: {
        code: `<mg-text-help reference="reference-id">
        Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.
</mg-text-help>`,
      },
    },
  },
};

const Template = args => <mg-text-help {...args} innerHTML={args.slot}></mg-text-help>;

export const MgCharacterLeft = Template.bind({});
MgCharacterLeft.args = {
  slot: 'Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.',
  reference: 'reference-id',
};
