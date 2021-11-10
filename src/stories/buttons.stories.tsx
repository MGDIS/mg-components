import { h } from "@stencil/core";
import { variants } from "../components/atoms/mg-button/mg-button.conf";

export default {
  title: 'Style/Buttons',
};


const Template = args => (
  <div>
    <h1>Buttons</h1>
    <h2>Text</h2>
    {variants.map(variant=>
      <button class={`mg-button mg-button--${variant}`} {...args}>{variant}</button>
    )}
    <h2>Icon</h2>
    {variants.map(variant=>
      <button class={`mg-button mg-button--${variant} mg-button--icon`}  {...args}>
        <mg-icon icon="info"></mg-icon>
      </button>
    )}
  </div>
);

export const Buttons = Template.bind({});
Buttons.args = {
  disabled: false
};
