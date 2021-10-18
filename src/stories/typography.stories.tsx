import { h } from "@stencil/core";

export default {
  title: 'Style/Typography',
};

const Template = args => (
  <div>
    <h1>{args.h1}</h1>
    <h2>{args.h2}</h2>
    <h3>{args.h3}</h3>
    <h4>{args.h4}</h4>
    <h5>{args.h5}</h5>
    <h6>{args.h6}</h6>
    <p>{args.p}</p>
    <p>
      <strong>{args.strong}</strong>
    </p>
    <p>
      <small>{args.small}</small>
    </p>
  </div>
);

export const Typography = Template.bind({});
Typography.args = {
  h1: 'The h1 heading element',
  h2: 'The h2 heading element',
  h3: 'The h3 heading element',
  h4: 'The h4 heading element',
  h5: 'The h5 heading element',
  h6: 'The h6 heading element',
  p: 'The Paragraph element',
  strong: 'The Strong Importance element',
  small: 'The side comment element',
};
