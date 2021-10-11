import { newE2EPage } from '@stencil/core/testing';

describe.each(["product" , "success" , "warning", "danger",  "draft"])('mg-tag %s', (variant) => {
  test('Should render', async () => {

    const page = await newE2EPage();
    await page.setContent(`<link rel="stylesheet" href="http://localhost:3333/build/design-system.css" /><mg-tag variant="${variant}">${variant}</mg-tag>`);

    const element = await page.find('mg-tag');
    expect(element).toHaveClass('hydrated');

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
  });
});
