import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-input-select></mg-input-select>');

    const element = await page.find('mg-input-select');
    expect(element).toHaveClass('hydrated');
  });
});
