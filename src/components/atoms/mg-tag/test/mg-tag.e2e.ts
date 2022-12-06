import { createPage, darkBackground } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-tag.conf';

describe('mg-tag', () => {
  test('Should render', async () => {
    const html = variants
      .map(variant =>
        [true, false]
          .map(icon =>
            [
              { outline: false, soft: false },
              { outline: true, soft: false },
              { outline: false, soft: true },
            ]
              .map(({ outline, soft }) =>
                darkBackground(
                  variant === 'secondary',
                  `<mg-tag style="margin: 0.2rem;" variant="${variant}" outline="${outline}" soft="${soft}">${icon ? '<mg-icon icon="user"></mg-icon>' : ''}${variant}</mg-tag>`,
                ),
              )
              .join(''),
          )
          .join(''),
      )
      .join('');

    const page = await createPage(html);

    const element = await page.find('mg-tag');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
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
});
