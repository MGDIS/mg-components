import { h } from "@stencil/core";

export default {
  title: 'Style/Inputs',
};

const Template = (args) => (
  <div class={`mg-input${args.labelOnTop ? ' is-label-on-top' : ''}`}>
    <label htmlFor="mg-input-text-blu">Libellé&nbsp;<span class="is-asterisk">*</span>&nbsp;:</label>
    <div class="mg-input__input-container">
      <div class="mg-input__input-container__input">
        <input type="text" id="mg-input-text-blu" />
        <mg-tooltip identifier="mg-input-text-blu" message="This is a tooltip"><mg-icon icon="info"></mg-icon></mg-tooltip>
      </div>
    </div>
  </div>
);

export const Inputs = Template.bind({});
Inputs.args = {
  labelOnTop: false
 };
