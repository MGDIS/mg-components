import { createPage } from '../../../../../utils/e2e.test.utils';
import { Direction } from '../../mg-menu/mg-menu.conf';
import { sizes, Status } from '../mg-menu-item.conf';

const slotContent = '<div><h3>Demo title</h3><p>some content</p></div>';
const slotMenuItem = '<mg-menu label="submenu"><mg-menu-item identifier="id-1-1" label="Batman begins"></mg-menu-item></mg-menu>';
const slotIllusatration = '<mg-icon icon="user" slot="illustration"></mg-icon>';
const slotInformation = '<mg-badge value="2" label="hello" slot="information"></mg-badge>';

const createHTML = (args, slot?, direction = Direction.HORIZONTAL) => `
<mg-menu label="batmenu" direction="${direction}">
  <mg-menu-item identifier="id-1" label="batman" ${args}>
    ${slot ? slot : ''}
  </mg-menu-item>
</mg-menu>
`;

describe('mg-menu-item', () => {
  describe.each([true, false])('with submenu %s', submenu => {
    test.each([undefined, '', ...sizes])('should renders, props size=%s', async size => {
      const page = await createPage(createHTML(`size="${size}"`, submenu && slotMenuItem));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '', Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED])('should renders, props status=%s', async status => {
      const page = await createPage(createHTML(`status="${status}"`, submenu && slotMenuItem));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      if (status === Status.HIDDEN) {
        await page.setViewport({ width: 100, height: 100 });
      }

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '#link'])('should renders, props href=%s', async href => {
      const page = await createPage(createHTML(`href="${href}"`, submenu && slotMenuItem));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '', ...sizes])('should render with illustration slot', async size => {
      let slot = slotIllusatration;
      if (submenu) slot += slotMenuItem;

      const page = await createPage(createHTML(`size="${size}"`, slot));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '', ...sizes])('should render with information slot', async size => {
      let slot = slotInformation;
      if (submenu) slot += slotMenuItem;

      const page = await createPage(createHTML(`size="${size}"`, slot));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([undefined, '', ...sizes])('should render with information AND illusatration slot', async size => {
      let slot = slotInformation + slotIllusatration;
      if (submenu) slot += slotMenuItem;
      const page = await createPage(createHTML(`size="${size}"`, slot));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test.each([undefined, true, false])('should renders, props expanded=%s', async expanded => {
    const page = await createPage(createHTML(`expanded="${expanded}"`, slotMenuItem));

    const element = await page.find('mg-menu-item');
    expect(element).toHaveClass('hydrated');

    await page.setViewport({ width: 300, height: 200 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe('content item', () => {
    test('should render content slot', async () => {
      const page = await createPage(createHTML(`expanded="true"`, slotContent));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      await page.setViewport({ width: 300, height: 200 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('in vertical menu', () => {
    describe.each([true, false])('with displayed slotMenuItem %s', submenu => {
      test.each([undefined, '', ...sizes])('should renders, props size=%s', async size => {
        const page = await createPage(createHTML(`size="${size}"`, submenu && slotMenuItem, Direction.VERTICAL));

        const element = await page.find('mg-menu-item');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });

      test.each([undefined, '', Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED])('should renders, props status=%s', async status => {
        const page = await createPage(createHTML(`status="${status}"`, submenu && slotMenuItem, Direction.VERTICAL));

        const element = await page.find('mg-menu-item');
        expect(element).toHaveClass('hydrated');

        if (status === Status.HIDDEN) {
          await page.setViewport({ width: 100, height: 100 });
        }

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });

      test.each([undefined, '#link'])('should renders, props href=%s', async href => {
        const page = await createPage(createHTML(`href="${href}"`, submenu && slotMenuItem, Direction.VERTICAL));

        const element = await page.find('mg-menu-item');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });
    });
  });
});
