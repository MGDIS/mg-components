import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgLabel } from '../mg-label';

const getPage = (args) => newSpecPage({
  components: [MgLabel],
  template: () => (<mg-label {...args}>mg-label</mg-label>),
});

describe('mg-label', () => {
  test.each([
    {required: false, colon: false, identifier: 'identifier'},
    {required: true, colon: false, identifier: 'identifier'},
    {required: false, colon: true, identifier: 'identifier'},
    {required: true, colon: true, identifier: 'identifier'},
  ])('Should render label with args %s', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
