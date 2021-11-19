import { h } from "@stencil/core";
import { icons, sizes } from '../components/atoms/mg-icon/mg-icon.conf';

export default {
  title: 'Style/Icons',
  argTypes :{
    size: {
      options: sizes,
      control: { type: 'select' },
    },
  }
};

const Template = args => (
  <ul style={{display: 'flex', flexWrap: 'wrap', margin: '0', padding : '0', listStyle: 'none', textAlign: 'center'}}>
    {Object.keys(icons).map((icon:string)=>
      <li style={{margin: '1rem', padding: '1rem', width: '80px',}}>
        <div style={{color: args.color, margin: '1rem'}}>
          <mg-icon icon={icon} size={args.size}></mg-icon>
        </div>
        <div>{icon}</div>
      </li>
    )}
  </ul>
);

export const Icons = Template.bind({});
Icons.args = {
  color: '',
  size: sizes[1], // regular
};
