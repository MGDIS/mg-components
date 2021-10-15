import { newE2EPage } from '@stencil/core/testing';

describe('mg-label', ()=>{

  describe.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true]
  ])('Screenshot with required %s and colon %s', (required, colon) => {
    test('renders', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mg-label required="${required}" colon=${colon}>Label</mg-label>`);

      const element = await page.find('mg-label');
      expect(element).toHaveClass('hydrated');

      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
      expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
    });
  });

});
