import { newSpecPage } from '@stencil/core/testing';
import { MgInputCheckbox } from '../mg-input-checkbox';

describe('mg-input-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MgInputCheckbox],
      html: `<mg-checkbox></mg-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <mg-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mg-checkbox>
    `);
  });
});
