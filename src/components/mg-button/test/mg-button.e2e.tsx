import { newE2EPage } from '@stencil/core/testing';

describe('mg-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-button></mg-button>');

    const element = await page.find('mg-button');
    expect(element).toHaveClass('hydrated');
  });
});
