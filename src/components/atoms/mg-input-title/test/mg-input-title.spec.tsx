import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputTitle } from '../mg-input-title';

const getPage = (args) => newSpecPage({
  components: [MgInputTitle],
  template: () => (<mg-input-title {...args}>mg-input-title</mg-input-title>),
});

describe('mg-input-title', () => {
  test.each([
    {required: false, colon: false, identifier: 'identifier'},
    {required: true, colon: false, identifier: 'identifier'},
    {required: false, colon: true, identifier: 'identifier'},
    {required: true, colon: true, identifier: 'identifier'},
    {isLegend: true, identifier: 'identifier'},
  ])('Should render label with args %s', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
