import { h } from "@stencil/core";
import { variants } from "../components/atoms/mg-button/mg-button.conf";

export default {
  title: 'Style/Buttons',
  argTypes :{
    align: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
  }
};

const Template = args => (
  <div>
    <h1>Buttons</h1>
    <h2>Text</h2>
    <span class={`mg-button-group${args.align === 'right' ? ' mg-button-group--align-right' : ''}`}>
    {variants.map(variant=>
      <button class={`mg-button mg-button--${variant}`} {...args}>{variant}</button>
    )}
    </span>
    <h2>Icon</h2>
    <span class={`mg-button-group${args.align === 'right' ? ' mg-button-group--align-right' : ''}`}>
    {variants.map(variant=>
      <button class={`mg-button mg-button--${variant} mg-button--icon`}  {...args}>
        <mg-icon icon="info"></mg-icon>
      </button>
    )}
    </span>
    <h2>Helpers</h2>
    <h3>.mg-button-group</h3>
    <p>Buttons can be grouped in an HTMLelement using the <code>.mg-button-group</code> class, it will ensure a 10px margin space between them, even verticaly. Above exemples are using it.</p>
    <p>By adding the <code>.mg-button-group--align-right</code> class you 'll set a right alignment of the button, even when line breaks.</p>
  </div>
);

export const Buttons = Template.bind({});
Buttons.args = {
  disabled: false,
  align: 'left'
};
