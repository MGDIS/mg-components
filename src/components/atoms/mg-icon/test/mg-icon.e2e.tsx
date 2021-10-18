import { newE2EPage } from '@stencil/core/testing';

describe.each(["user-cadenas", "editable"])('mg-icon %s', (icon) => {
  test('renders', async () => {
    const page = await newE2EPage();
    //page.addStyleTag({path: './dist/design-system/design-system.css'})
    await page.setContent(`<mg-icon icon="${icon}"></mg-icon>`);

    const element = await page.find('mg-icon');
    expect(element).toHaveClass('hydrated');

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
  });
});
