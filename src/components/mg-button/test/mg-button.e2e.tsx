import { newE2EPage } from '@stencil/core/testing';

describe.each(["primary" , "secondary" , "alert", "alert-alt",  "info"])('mg-button %s', (variant) => {
  test('Should render', async () => {

    const page = await newE2EPage();
    // await page.addStyleTag({ path: './www/build/design-system.css' });
    await page.setContent(`<link rel="stylesheet" href="http://localhost:3333/build/design-system.css" /><mg-button variant="${variant}">${variant}</mg-button>`);

    const element = await page.find('mg-button');
    expect(element).toHaveClass('hydrated');

    // await page.waitForTimeout(10000);

    let pageHtml = await page.evaluate(() => document.documentElement.outerHTML);
    console.log(pageHtml)

    const results = await page.compareScreenshot();
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
  });
});
