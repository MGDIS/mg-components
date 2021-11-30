import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-numeric', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-input-numeric></mg-input-numeric>');

    const element = await page.find('mg-input-numeric');
    expect(element).toHaveClass('hydrated');
  });
});
