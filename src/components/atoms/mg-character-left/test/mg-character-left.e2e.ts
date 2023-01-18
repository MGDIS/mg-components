import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-character-left', () => {
  test('Should render', async () => {
    const components = [
      `<mg-character-left characters="" maxlength="100"></mg-character-left>`,
      `<mg-character-left characters="blu" maxlength="200"></mg-character-left>`,
      `<mg-character-left characters="blu blu blu blu" maxlength="1000"></mg-character-left>`,
    ];
    const html = components.join('');
    const page = await createPage(html, { width: 60, height: 60 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
