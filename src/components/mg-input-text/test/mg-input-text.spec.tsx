import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';

describe('mg-input-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MgInputText],
      html: `<mg-input-text></mg-input-text>`,
    });
    expect(page.root).toEqualHtml(`
      <mg-input-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mg-input-text>
    `);
  });
});
