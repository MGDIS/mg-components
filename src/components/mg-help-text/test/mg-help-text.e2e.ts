import { newE2EPage } from '@stencil/core/testing';

describe('mg-help-text', ()=>{

  describe.each(['Simple help text.', 'Help text with <a href="https://www.exemple.com">a link</a>, a <strong>bold text</strong> and <em>an italic one</em>.'])('Screenshot text : %s', (helpText) => {
    test('renders', async () => {
      const page = await newE2EPage();
      await page.setContent(`<mg-help-text>${helpText}</mg-help-text>`);

      const element = await page.find('mg-help-text');
      expect(element).toHaveClass('hydrated');

      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
      expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
    });
  });

});
