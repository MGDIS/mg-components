import { createPage } from "../../../../utils/test.utils"

describe('mg-input-title', ()=>{

  describe.each([
    {required: false, identifier: 'identifier'},
    {required: true, identifier: 'identifier'},
  ])('Screenshot with args', ({required}) => {
    test('Should render', async () => {
      const page = await createPage(`<mg-input-title required=${required}>Label</mg-input-title>`);

      const element = await page.find('mg-input-title');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

});
