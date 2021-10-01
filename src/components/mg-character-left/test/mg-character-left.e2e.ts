import { newE2EPage } from '@stencil/core/testing';

describe('mg-character-left', ()=>{

  describe.each([400, 4000, 36])('Screenshot with %s characters', (maxlength) => {
    test('renders', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mg-character-left maxlength="${maxlength}"></mg-character-left>`);

      const element = await page.find('mg-character-left');
      expect(element).toHaveClass('hydrated');

      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
      expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
    });
  });

});
