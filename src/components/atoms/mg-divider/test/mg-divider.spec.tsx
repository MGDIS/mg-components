import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgDivider } from '../mg-divider';

const getPage = args =>
  newSpecPage({
    components: [MgDivider],
    template: () => <mg-divider {...args}></mg-divider>,
  });

describe('mg-divider', () => {
  test.each([undefined, 'regular', 'full'])('size %s', async size => {
    const { root } = await getPage({ size });
    expect(root).toMatchSnapshot();
  });
});
