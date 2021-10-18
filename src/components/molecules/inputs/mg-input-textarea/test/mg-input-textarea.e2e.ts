import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-input-textarea></mg-input-textarea>');

    const element = await page.find('mg-input-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
