import { newE2EPage } from '@stencil/core/testing';

describe('mg-character-left', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-character-left></mg-character-left>');

    const element = await page.find('mg-character-left');
    expect(element).toHaveClass('hydrated');
  });
});
