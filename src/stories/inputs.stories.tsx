import { h } from "@stencil/core";

export default {
  title: 'Style/Inputs',
};

const Template = args => (
  <label>Libellé&nbsp;<span class="is-asterisk">*</span>&nbsp;:</label>
);

export const Inputs = Template.bind({});
Inputs.args = {};
