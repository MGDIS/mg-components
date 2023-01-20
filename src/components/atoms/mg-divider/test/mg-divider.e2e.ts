import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-divider', () => {
  test('Should render', async () => {
    const sizes = ['regular', 'full'];
    const html = sizes.map(size => `<mg-divider size="${size}"></mg-divider>`).join('');
    const page = await createPage(html);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
