import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-divider', () => {
  describe.each(['regular', 'full'])('size %s', size => {
    test('Should render', async () => {
      const page = await createPage(`<mg-divider size="${size}"></mg-divider>`);

      const element = await page.find('mg-divider');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
