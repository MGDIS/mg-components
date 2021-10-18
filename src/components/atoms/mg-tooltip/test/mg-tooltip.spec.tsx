import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTooltip } from '../mg-tooltip';

const getPage = (args) => newSpecPage({
  components: [MgTooltip],
  template: () => (<mg-tooltip {...args}></mg-tooltip>),

});

describe('mg-tooltip', () => {
  test('Should render:', async () => {
    const args = { identifier:"identifier", message: 'blu'}
    const {root} = await getPage(args);
    expect(root).toMatchSnapshot();
  });
});
