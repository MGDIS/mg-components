import { createPage } from '../../../../utils/test.utils';
import { variants } from '../mg-badge.conf';

describe.each(variants)('mg-badge %s', variant => {
  describe.each([true, false])('outline %s', outline => {
    test('Should render', async () => {
      const page = await createPage(
        `${variant === 'secondary' ? '<style>body{background:#999;}</style>' : ''}<mg-badge value="1" label="${variant}" variant="${variant}" outline="${outline}"></mg-badge>`,
      );

      const element = await page.find('mg-badge');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});

test('Should render in tabs', async () => {
  const page = await createPage(`<mg-tabs label="label"><div slot='tab_content-1'>Content</div></mg-tabs>
    <script>
    const mgTabs = document.querySelector('mg-tabs');
    mgTabs.items = ${JSON.stringify([{ label: 'batman', badge: { label: 'count', value: 1 } }])};
    </script>
  `);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
});
