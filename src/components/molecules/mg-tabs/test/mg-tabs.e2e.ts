import { createPage } from '../../../../utils/e2e.test.utils';
import { sizes } from '../mg-tabs.conf';

const defaultSlotContents = [
  "Le héros peut être en chacun, même en celui qui fait une chose aussi simple et rassurante que mettre un manteau sur les épaules d'un garçon et ainsi lui faire comprendre que le monde ne s'est pas écroulé.",
  "La seule façon raisonnable de vivre en ce bas monde, c'est en dehors des règles.",
  'Bane have an hidden content',
];
const createSlot = (contents: string[]) => contents.map((content, i) => `<div slot="tab_content-${i + 1}">${content}</div>`).join('');

describe('mg-tabs', () => {
  describe.each(sizes)('template', size => {
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
      const page = await createPage(`<mg-tabs label="label" size=${size}>${createSlot(defaultSlotContents)}</mg-tabs>
      <script>
      const mgTabs = document.querySelector('mg-tabs');
      mgTabs.items = ${JSON.stringify(items)};
      </script>
      `);

      const element = await page.find('mg-tabs');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test('should go to next tab on click event', async () => {
      const page = await createPage(`<mg-tabs label="label">${createSlot(defaultSlotContents)}</mg-tabs>
      <script>
      const mgTabs = document.querySelector('mg-tabs');
      mgTabs.items = ['Batman', 'Joker', 'Bane'];
      </script>
      `);
      await page.keyboard.down('Tab');
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

      await page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotLeave = await page.screenshot();
      expect(screenshotLeave).toMatchImageSnapshot();
    });
  });
});
