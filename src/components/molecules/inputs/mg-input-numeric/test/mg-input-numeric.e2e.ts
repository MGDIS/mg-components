import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-currency', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-input-currency></mg-input-currency>');

    const element = await page.find('mg-input-currency');
    expect(element).toHaveClass('hydrated');
  });
});
