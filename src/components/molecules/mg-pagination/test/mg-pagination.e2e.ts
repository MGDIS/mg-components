import { createPage } from '../../../../utils/test.utils';

describe('mg-pagination', () => {
  describe('template', () => {
    test.each([1, 2, 3, 10])('render', async totalPages => {
      const page = await createPage(`<mg-pagination total-pages=${totalPages}></mg-pagination>`);

      const element = await page.find('mg-pagination');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      const actions = [...Array(totalPages - 1).keys()];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of actions) {
        const nextButton = await page.find('mg-pagination >>> .mg-pagination__button:last-of-type');
        await nextButton.click();
        await page.waitForChanges();

        const screenshot2 = await page.screenshot();
        expect(screenshot2).toMatchImageSnapshot();
      }
    });

    test('Keyboard navigation', async () => {
      const page = await createPage(`<mg-pagination total-pages=5></mg-pagination>`);

      // take focus on previous button
      await page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshot1 = await page.screenshot();
      expect(screenshot1).toMatchImageSnapshot();

      // take focus on mg-input-select
      await page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshot2 = await page.screenshot();
      expect(screenshot2).toMatchImageSnapshot();

      // change mg-input-select to value 3
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.waitForChanges();

      const screenshot4 = await page.screenshot();
      expect(screenshot4).toMatchImageSnapshot();

      // take focus on previous button
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      await page.keyboard.up('Shift');
      await page.waitForChanges();

      const screenshot5 = await page.screenshot();
      expect(screenshot5).toMatchImageSnapshot();

      // take focus on next
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshot6 = await page.screenshot();
      expect(screenshot6).toMatchImageSnapshot();
    });
  });
});
