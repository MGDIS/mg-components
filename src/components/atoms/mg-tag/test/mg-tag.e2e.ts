import { createPage } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-tag.conf';

describe.each(variants)('mg-tag %s', variant => {
  describe.each([true, false])('outline %s', outline => {
    test('Should render', async () => {
      const page = await createPage(
        `${variant === 'secondary' ? '<style>body{background:#999;}</style>' : ''}<mg-tag variant="${variant}" outline="${outline}">${variant}</mg-tag>`,
      );

      const element = await page.find('mg-tag');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});

test('Should render a 2 lines tag', async () => {
  const page = await createPage(`<mg-tag>Tag with a<br> two lines text</mg-tag>`);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
});

test('Should render a tag in a paragraph', async () => {
  const page = await createPage(`<p>This is a <mg-tag>tag</mg-tag> in a paragraph.</p>`);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
});
