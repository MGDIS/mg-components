import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgCard } from '../mg-card';

const getPage = slot =>
  newSpecPage({
    components: [MgCard],
    template: () => <mg-card>{slot}</mg-card>,
  });

describe('mg-card', () => {
  test('render', async () => {
    const { root } = await getPage(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    );
    expect(root).toMatchSnapshot();
  });
});
