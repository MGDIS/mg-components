import { h } from "@stencil/core";

export default {
  title: 'Style/Inputs',
};

const Template = () => (
  <div class="mg-input">
    <label htmlFor="mg-input-text-blu">Libellé&nbsp;<span class="is-asterisk">*</span>&nbsp;:</label>
    <div class="mg-input__input-container">
    <div class="mg-input__input-container__input">
      <input type="text" id="mg-input-text-blu" />
    </div>
    </div>
  </div>
);

export const Inputs = Template.bind({});
Inputs.args = {};
