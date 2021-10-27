import { h } from "@stencil/core";

export default {
  component: 'mg-help-text',
  title: 'Atoms/mg-help-text',
  parameters: {
    docs: {
      source: {
        code: `<mg-help-text identifier="identifier">
        Help text with html <strong>bold</strong>, <em>italic</em>.
</mg-help-text>`,
      },
    },
  },
};

const Template = args => <mg-help-text {...args} innerHTML={args.slot}></mg-help-text>;

export const MgHelpText = Template.bind({});
MgHelpText.args = {
  slot: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  identifier: 'identifier',
};
