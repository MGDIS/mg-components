import { createPage } from "../../../../utils/test.utils"
import { icons, sizes, variants } from '../mg-icon.conf';

describe('mg-icon', ()=>{
  describe.each(Object.keys(icons))('icon %s', (icon) => {
    describe.each(sizes)('size %s', (size) => {
      test('renders', async () => {
        const page = await createPage(`<mg-icon icon="${icon}" size="${size}"></mg-icon>`);

        const element = await page.find('mg-icon');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

      });
    });
  });

  describe.each(variants)('variant %s', (variant) => {
    describe.each(sizes)('size %s', (size) => {
      test('renders', async () => {
        const page = await createPage(`<mg-icon icon="check-circle" size="${size}" variant="${variant}"></mg-icon>`);

        const element = await page.find('mg-icon');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });
    });
  });
})
