export default {
  component: 'mg-help-text',
  title: 'Atoms/mg-help-text',
  parameters: {
    docs: {
      source: {
        code: `<mg-help-text reference="reference-id">
        Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.
</mg-help-text>`,
      },
    },
  },
};

const Template = args => <mg-help-text {...args} innerHTML={args.slot}></mg-help-text>;

export const MgHelpText = Template.bind({});
MgHelpText.args = {
  slot: 'Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.',
  reference: 'reference-id',
};
