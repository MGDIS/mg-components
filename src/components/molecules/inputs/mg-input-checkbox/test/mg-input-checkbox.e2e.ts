import { newE2EPage } from '@stencil/core/testing';

describe('mg-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-checkbox></mg-checkbox>');

    const element = await page.find('mg-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
