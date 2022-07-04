import { createPage } from '../../../../utils/test.utils';

describe.each([
  `<mg-character-left characters="" maxlength="100"></mg-character-left>`,
  `<mg-character-left characters="blu" maxlength="100"></mg-character-left>`,
  `<mg-character-left characters="blu blu blu blu" maxlength="100"></mg-character-left>`,
  `<mg-character-left characters="blu blu blu blu" maxlength="100" template="Il te reste {counter} lettres."></mg-character-left>`,
  `<mg-character-left characters="" maxlength="100" lang="fr"></mg-character-left>`,
])('without tooltip', html => {
  test('render', async () => {
    const page = await createPage(html);

    const element = await page.find('mg-character-left');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
