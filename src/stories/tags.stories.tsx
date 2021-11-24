import { h } from "@stencil/core";
import { variants } from "../components/atoms/mg-tag/mg-tag.conf";

export default {
  title: 'Style/Tags',
};

const Template = args => (
  <div>
    <h1>Tags</h1>
    <h2>Plain</h2>
    <div class="mg-group-elements">
    {variants.map(variant=>
      <span class={`mg-tag mg-tag--${variant}`} {...args}>{variant}</span>
    )}
    </div>
    <h2>Outline</h2>
    <div class="mg-group-elements">
    {variants.map(variant=>
      <span class={`mg-tag mg-tag--${variant} mg-tag--outline`} {...args}>{variant}</span>
    )}
    </div>
  </div>
);

export const Tags = Template.bind({});
Tags.args = {};
