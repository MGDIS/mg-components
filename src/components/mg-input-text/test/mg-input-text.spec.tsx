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

    expect(root).toEqualHtml(`
      <mg-input-text>
        <mock:shadow-root>
          <mg-label reference="${args.reference}">${args.label}</mg-label>
          <input aria-describedby="" id="${args.reference}" maxlength="400" name="${args.reference}" type="text">
          <mg-character-left maxlength="400" reference="${args.reference}-character-left"></mg-character-left>
        </mock:shadow-root>
      </mg-input-text>
    `);
  });
});
