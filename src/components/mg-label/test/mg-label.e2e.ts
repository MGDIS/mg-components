import { newE2EPage } from '@stencil/core/testing';

describe('mg-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-label></mg-label>');

    const element = await page.find('mg-label');
    expect(element).toHaveClass('hydrated');
  });
});
