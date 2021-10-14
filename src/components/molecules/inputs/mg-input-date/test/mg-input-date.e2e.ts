import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-date', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-input-date></mg-input-date>');

    const element = await page.find('mg-input-date');
    expect(element).toHaveClass('hydrated');
  });
});
