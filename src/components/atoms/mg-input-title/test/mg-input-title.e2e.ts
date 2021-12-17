import { createPage } from "../../../../utils/test.utils"

describe('mg-input-title', ()=>{

  describe.each([
    {required: false, colon: false,  identifier: 'identifier'},
    {required: true, colon: false,  identifier: 'identifier'},
    {required: false, colon: true,  identifier: 'identifier'},
    {required: true, colon: true,  identifier: 'identifier'},
  ])('Screenshot with args', ({required, colon}) => {
    test('Should render', async () => {
      const page = await createPage(`<mg-input-title required=${required} colon=${colon}>Label</mg-input-title>`);

      const element = await page.find('mg-input-title');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

});
