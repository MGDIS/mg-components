import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-input-text></mg-input-text>');

    const element = await page.find('mg-input-text');
    expect(element).toHaveClass('hydrated');
  });
});
