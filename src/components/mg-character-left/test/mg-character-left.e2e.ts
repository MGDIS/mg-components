import { newE2EPage } from '@stencil/core/testing';

describe('mg-character-left', ()=>{

  describe.each([400, 4000, 36])('Screenshot with %s characters', (maxlength) => {
    test('renders', async () => {
      const page = await newE2EPage();
      //page.addStyleTag({path: './dist/design-system/design-system.css'})
      await page.setContent(`<mg-character-left maxlength="${maxlength}"></mg-character-left>`);

      const element = await page.find('mg-character-left');
      expect(element).toHaveClass('hydrated');

      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })
      expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.1 })
    });
  });

  test('should set', async () => {
    const maxlength = 400;
    const characters = "blu blu";

    const page = await newE2EPage();
    await page.setContent(`<mg-character-left reference="blu" maxlength="${maxlength}"></mg-character-left>`);

    let element = await page.find('mg-character-left');
    expect(element).toEqualText(`${maxlength} caractères disponibles.`);

    await page.$eval('mg-character-left', (element: any, characters) => {
      element.characters = characters;
    }, characters);
    await page.waitForChanges();

    element = await page.find('mg-character-left');
    expect(element).toEqualText(`${maxlength - characters.length} caractères disponibles.`);
  });

});
