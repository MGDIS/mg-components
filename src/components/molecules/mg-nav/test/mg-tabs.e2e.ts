import { createPage } from '../../../../utils/test.utils';

describe('mg-nav', () => {
  describe('template', () => {
    test.each([
      { items: ['Batman', 'Joker', 'Bane'] },
      {
        items: [
          { label: 'Batman', icon: 'check' },
          { label: 'Joker', icon: 'cross', status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
      {
        items: [
          { label: 'Batman', badge: { label: 'count', value: 1 } },
          { label: 'Joker', badge: { label: 'count', value: 1 }, status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
      {
        items: [
          { label: 'Batman', icon: 'check', badge: { label: 'count', value: 99 } },
          { label: 'Joker', icon: 'cross', badge: { label: 'count', value: 99 }, status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
    ])('render', async ({ items }) => {
      const page = await createPage(`<mg-nav label="label"></mg-nav>
      <script>
      const mgNav = document.querySelector('mg-nav');
      mgNav.items = ${JSON.stringify(items)};
      </script>
      `);

      const element = await page.find('mg-nav');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test('should go to next tab on click event', async () => {
      const page = await createPage(`<mg-nav label="label"></mg-nav>
      <script>
      const mgNav = document.querySelector('mg-nav');
      mgNav.items = ['Batman', 'Joker', 'Bane'];
      </script>
      `);
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('ArrowRight');
      await page.waitForChanges();

      const screenshotRight = await page.screenshot();
      expect(screenshotRight).toMatchImageSnapshot();

      await page.keyboard.down('ArrowRight');
      await page.waitForChanges();

      const screenshotRightHidden = await page.screenshot();
      expect(screenshotRightHidden).toMatchImageSnapshot();

      await page.keyboard.down('ArrowLeft');
      await page.waitForChanges();

      const screenshotLeft = await page.screenshot();
      expect(screenshotLeft).toMatchImageSnapshot();

      await page.keyboard.down('Enter');
      await page.waitForChanges();

      const screenshotEnter = await page.screenshot();
      expect(screenshotEnter).toMatchImageSnapshot();

      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotLeave = await page.screenshot();
      expect(screenshotLeave).toMatchImageSnapshot();
    });
  });
});
