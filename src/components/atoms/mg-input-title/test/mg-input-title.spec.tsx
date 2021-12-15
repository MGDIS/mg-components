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

  test.each([
    {isLegend: true, element: 'LEGEND'},
    {isLegend: false, element: 'LABEL'},
  ])('validity (%s), isLabel (%s)', async ({isLegend, element})=> {
    const args = { identifier: "identifier", isLegend};
    const page = await getPage(args);

    const component = page.doc.querySelector('mg-input-title');
    const input = component.querySelector('.mg-input-title');

    expect(input.tagName).toEqual(element)
  });
});
