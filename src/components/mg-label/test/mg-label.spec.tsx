import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgLabel } from '../mg-label';

const getPage = (args) => newSpecPage({
  components: [MgLabel],
  template: () => (<mg-label {...args}>mg-label</mg-label>),
});

describe('mg-label', () => {
  test.each([false, true])('Should render label with required %s', async (required) => {
    const args = {reference: 'blu', required};
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
