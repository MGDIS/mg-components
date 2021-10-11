import { newE2EPage } from '@stencil/core/testing';

describe('mg-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-tooltip></mg-tooltip>');

    const element = await page.find('mg-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
