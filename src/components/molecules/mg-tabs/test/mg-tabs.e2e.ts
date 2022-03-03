import { createPage } from '../../../../utils/test.utils';

const defaultSlots =
  "<div slot='tab_content-1'>Le héros peut être en chacun, même en celui qui fait une chose aussi simple et rassurante que mettre un manteau sur les épaules d'un garçon et ainsi lui faire comprendre que le monde ne s'est pas écroulé.</div><div slot='tab_content-2'>La seule façon raisonnable de vivre en ce bas monde, c'est en dehors des règles.</div>";

describe('mg-tabs', () => {
  describe('template', () => {
    test.each([
      { items: ['batman', 'joker'] },
      {
        items: [
          { label: 'batman', icon: 'check' },
          { label: 'joker', icon: 'cross' },
        ],
      },
      {
        items: [
          { label: 'batman', badge: { label: 'count', value: 1 } },
          { label: 'joker', badge: { label: 'count', value: 1 } },
        ],
      },
      {
        items: [
          { label: 'batman', icon: 'check', badge: { label: 'count', value: 1 } },
          { label: 'joker', icon: 'cross', badge: { label: 'count', value: 1 } },
        ],
      },
    ])('render', async ({ items }) => {
      const page = await createPage(`<mg-tabs label="label">${defaultSlots}</mg-tabs>
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
      const page = await createPage(`<mg-tabs label="label">${defaultSlots}</mg-tabs>
      <script>
      const mgTabs = document.querySelector('mg-tabs');
      mgTabs.items = ['batman', 'joker'];
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

      page.keyboard.down('Tab');

      const screenshot4 = await page.screenshot();
      expect(screenshot4).toMatchImageSnapshot();
    });
  });
});
