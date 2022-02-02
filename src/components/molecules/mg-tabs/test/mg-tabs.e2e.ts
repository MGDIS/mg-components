import { createPage } from '../../../../utils/test.utils';

const defaultSlots =
  "<div slot='tab_content-1'>Le héros peut être en chacun, même en celui qui fait une chose aussi simple et rassurante que mettre un manteau sur les épaules d'un garçon et ainsi lui faire comprendre que le monde ne s'est pas écroulé.</div><div slot='tab_content-2'>La seule façon raisonnable de vivre en ce bas monde, c'est en dehors des règles.</div>";

describe('mg-tabs', () => {
  describe('template', () => {
    test.each([
      { tabs: ['batman', 'joker'] },
      {
        tabs: [
          { label: 'batman', icon: 'check' },
          { label: 'joker', icon: 'cross' },
        ],
      },
      {
        tabs: [
          { label: 'batman', badge: 1 },
          { label: 'joker', badge: 1 },
        ],
      },
      {
        tabs: [
          { label: 'batman', icon: 'check', badge: 1 },
          { label: 'joker', icon: 'cross', badge: 1 },
        ],
      },
    ])('render', async ({ tabs }) => {
      const page = await createPage(`<mg-tabs>${defaultSlots}</mg-tabs>
      <script>
      const mgTabs = document.querySelector('mg-tabs');
      mgTabs.tabs = ${JSON.stringify(tabs)};
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
      const page = await createPage(`<mg-tabs>${defaultSlots}</mg-tabs>
      <script>
      const mgTabs = document.querySelector('mg-tabs');
      mgTabs.tabs = ['batman', 'joker'];
      </script>
      `);
      page.keyboard.down('Tab');

      const screenshot1 = await page.screenshot();
      expect(screenshot1).toMatchImageSnapshot();

      await page.keyboard.down('ArrowRight');

      const screenshot2 = await page.screenshot();
      expect(screenshot2).toMatchImageSnapshot();

      await page.keyboard.down('ArrowLeft');

      const screenshot3 = await page.screenshot();
      expect(screenshot3).toMatchImageSnapshot();
    });
  });
});
