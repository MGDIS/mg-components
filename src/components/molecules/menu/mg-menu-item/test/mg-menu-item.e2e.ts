import { createPage } from '../../../../../utils/test.utils';
import { sizes, Status } from '../mg-menu-item.conf';

const createHTML = (args, submenu, script?) => `
<mg-menu label="batmenu">
  <mg-menu-item identifier="id-1" label="batman" ${args}>
    ${submenu ? '<mg-menu label="submenu" direction="vertical"><mg-menu-item identifier="id-1-1" size="medium" label="Batman begins"></mg-menu-item></mg-menu>' : ''}
  </mg-menu-item>
</mg-menu>
${script ? script : ''}
`;

describe('mg-menu-item', () => {
  describe.each([true, false])('with submenu %s', submenu => {
    test.each([undefined, '', ...sizes])('should renders, props size=%s', async size => {
      const page = await createPage(createHTML(`size="${size}"`, submenu));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '', Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED])('should renders, props status=%s', async status => {
      const page = await createPage(createHTML(`status="${status}"`, submenu));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      if (status === Status.HIDDEN) {
        await page.setViewport({ width: 100, height: 100 });
      }

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '#link'])('should renders, props href=%s', async href => {
      const page = await createPage(createHTML(`href="${href}"`, submenu));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test.each([undefined, true, false])('should renders, props expanded=%s', async expanded => {
    const page = await createPage(createHTML(`expanded="${expanded}"`, true));

    const element = await page.find('mg-menu-item');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
