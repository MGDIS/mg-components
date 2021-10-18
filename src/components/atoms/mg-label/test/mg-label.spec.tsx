import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgLabel } from '../mg-label';

const getPage = (args) => newSpecPage({
  components: [MgLabel],
  template: () => (<mg-label {...args}>mg-label</mg-label>),
});

describe('mg-label', () => {
  test.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true]
  ])('Should render label with required %s and colon %s', async (required, colon) => {
    const args = {required, colon};
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
