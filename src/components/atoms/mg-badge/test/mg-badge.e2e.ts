import { createPage, darkBackground } from '../../../../utils/e2e.test.utils';
import { variants } from '../mg-badge.conf';

describe('mg-badge', () => {
  test('Should render', async () => {
    const html = variants
      .map(variant => {
        const template = [true, false]
          .map(outline =>
            [1, 99, '*', '!', '99+']
              .map(value => darkBackground(variant === 'secondary', `<mg-badge value="${value}" label="${variant}" variant="${variant}" outline="${outline}"></mg-badge>`))
              .join(''),
          )
          .join('');
        return `<h2>${variant}<h2/><div>${template}<div>`;
      })
      .join('');

    const page = await createPage(html, { width: 250 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
