import { createPage } from '../../../../utils/test.utils';

describe('mg-pagination', () => {
  describe('template', () => {
    test.each([1, 2, 3, 4, 5, 10])('render', async totalPages => {
      const page = await createPage(`<mg-pagination total-pages=${totalPages}></mg-pagination>`);

      const element = await page.find('mg-pagination');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      const actions = [...Array(totalPages - 1).keys()];

      for (const _ of actions) {
        const nextButton = await page.find('mg-pagination >>> li:last-child button');
        await nextButton.click();
        await page.waitForChanges();

        const screenshot2 = await page.screenshot();
        expect(screenshot2).toMatchImageSnapshot();
      }
    });
  });
});
