import { createPage } from "../../../../utils/test.utils"
import { icons, sizes } from '../mg-icon.conf';

describe.each(Object.keys(icons))('mg-icon %s', (icon) => {
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
