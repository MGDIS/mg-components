import { createPage } from "../../../../utils/test.utils"

describe('mg-label', ()=>{

  describe.each([
    {required: false, colon: false,  identifier: 'identifier'},
    {required: true, colon: false,  identifier: 'identifier'},
    {required: false, colon: true,  identifier: 'identifier'},
    {required: true, colon: true,  identifier: 'identifier'},
  ])('Screenshot with args', ({required, colon}) => {
    test('Should render', async () => {
      const page = await createPage(`<mg-label required=${required} colon=${colon}>Label</mg-label>`);

      const element = await page.find('mg-label');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

});
