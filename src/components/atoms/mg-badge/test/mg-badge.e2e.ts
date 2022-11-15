import { createPage } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-badge.conf';

describe.each(variants)('mg-badge %s', variant => {
  describe.each([true, false])('outline %s', outline => {
    describe.each([1, 99])('value %s', value => {
      test('Should render', async () => {
        const page = await createPage(
          `${
            variant === 'secondary' ? '<style>body{background:#999;}</style>' : ''
          }<mg-badge value="${value}" label="${variant}" variant="${variant}" outline="${outline}"></mg-badge>`,
        );

        const element = await page.find('mg-badge');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });
    });
  });
});
