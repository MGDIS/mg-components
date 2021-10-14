import { newE2EPage } from '@stencil/core/testing';

describe('mg-input-text', () => {

  describe.each([false, true])('multiline: %s', (multiline) => {

    test('renders', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <link rel="stylesheet" href="http://localhost:3333/build/design-system.css" />
      <mg-input-text label="label" multiline="${multiline}"></mg-input-text>
    `);

      const element = await page.find('mg-input-text');
      expect(element).toHaveClass('hydrated');

      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
      expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
    });

  });

});
