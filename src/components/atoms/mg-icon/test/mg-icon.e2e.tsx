import { newE2EPage } from '@stencil/core/testing';
import { icons, sizes } from '../mg-icon.conf';

describe.each(icons)('mg-icon %s', (icon) => {
  describe.each(sizes)('size %s', (size) => {
    test('renders', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <link rel="stylesheet" href="http://localhost:3333/build/design-system.css" />
        <mg-icon icon="${icon}" size="${size}"></mg-icon>
      `);

      const element = await page.find('mg-icon');
      expect(element).toHaveClass('hydrated');

      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
      expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
    });
  });
});
