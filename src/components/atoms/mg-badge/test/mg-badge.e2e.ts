import { createPage, darkBackground } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-badge.conf';

describe('mg-badge', () => {
  test('Should render', async () => {
    const html = variants
      .map(variant =>
        [true, false]
          .map(outline =>
            [1, 99, '*', '!', '99+']
              .map(value => darkBackground(variant === 'secondary', `<mg-badge value="${value}" label="${variant}" variant="${variant}" outline="${outline}"></mg-badge>`))
              .join(''),
          )
          .join(''),
      )
      .join('');

    const page = await createPage(html);

    const element = await page.find('mg-badge');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
