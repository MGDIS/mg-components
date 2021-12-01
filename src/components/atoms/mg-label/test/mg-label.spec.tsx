import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgLabel } from '../mg-label';

const getPage = (args) => newSpecPage({
  components: [MgLabel],
  template: () => (<mg-label {...args}>mg-label</mg-label>),
});

describe('mg-label', () => {
  test.each([
    [false, false, 'identifier'],
    [false, true, 'identifier'],
    [true, false, 'identifier'],
    [true, true, 'identifier']
  ])('Should render label with required %s and colon %s', async (required, colon, identifier) => {
    const args = {required, colon, identifier};
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
