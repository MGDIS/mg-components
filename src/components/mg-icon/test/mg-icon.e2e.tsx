import { newE2EPage } from '@stencil/core/testing';

describe('mg-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-icon></mg-icon>');

    const element = await page.find('mg-icon');
    expect(element).toHaveClass('hydrated');
  });
});
