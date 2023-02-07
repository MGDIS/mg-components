import { createPage, renderAttributes } from '../../../../utils/e2e.test.utils';

describe('mg-pagination', () => {
  describe('template', () => {
    test('render', async () => {
      const template = [1, 2, 3, 10]
        .map(totalPages => [true, false].map(hideNavigationLabels => `<mg-pagination ${renderAttributes({ totalPages, hideNavigationLabels })}></mg-pagination>`).join(''))
        .join('');
      const page = await createPage(template);

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test.each([1, 2, 3, 10])('should success mouse navigation', async totalPages => {
      const page = await createPage(`<mg-pagination ${renderAttributes({ totalPages })}"></mg-pagination>`);

      const element = await page.find('mg-pagination');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      const actions = [...Array(totalPages - 1).keys()];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of actions) {
        const nextButton = await page.find('mg-pagination >>> mg-button:last-of-type');
        await nextButton.click();
        await page.waitForChanges();

        const screenshotAction = await page.screenshot();
        expect(screenshotAction).toMatchImageSnapshot();
      }
    });

    test('should success keyboard navigation', async () => {
      const page = await createPage(`<mg-pagination ${renderAttributes({ totalPages: 5 })}></mg-pagination>`);

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      // take focus on mg-input-select
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab = await page.screenshot();
      expect(screenshotTab).toMatchImageSnapshot();

      // change mg-input-select to value 3
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.waitForChanges();

      const screenshotArrowDown = await page.screenshot();
      expect(screenshotArrowDown).toMatchImageSnapshot();

      // take focus on previous button
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      await page.keyboard.up('Shift');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      const screenshotShiftTabShift = await page.screenshot();
      expect(screenshotShiftTabShift).toMatchImageSnapshot();

      // take focus on next
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      const screenshotTabTab = await page.screenshot();
      expect(screenshotTabTab).toMatchImageSnapshot();
    });
  });

  describe('locales', () => {
    test.each(['fr'])('render with locale: %s', async lang => {
      const page = await createPage(`<mg-pagination ${renderAttributes({ totalPages: 5, lang })}"></mg-pagination>`);

      const element = await page.find('mg-pagination');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
