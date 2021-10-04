import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';

const getPage = (args) => newSpecPage({
  components: [MgInputText],
  template: () => (<mg-input-text {...args}></mg-input-text>),
});

describe('mg-input-text', () => {
  it('renders', async () => {
    const args = {label: 'label', reference:"reference"};
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
