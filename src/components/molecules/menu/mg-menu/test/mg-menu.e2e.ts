import { createPage } from '../../../../../utils/test.utils';

const createHTML = direction => `
  <div style="display: flex;">
    <mg-menu ${direction && `direction="${direction}"`}>
      <mg-menu-item identifier="id-1" label="1 - head-1" status="active">
        <mg-menu label="submenu" direction="vertical">
          <mg-menu-item identifier="id-1-1" size="medium" label="Batman begins"></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item identifier="id-2" label="1 - head-2 long" status="disabled"></mg-menu-item>
      <mg-menu-item identifier="id-3" icon={{ icon: 'user' }} label="1 - head-3 very long"></mg-menu-item>
      <mg-menu-item identifier="id-4" icon={{ icon: 'user' }} label="1 - head-4" badge={{ value: 2, label: 'hello' }}></mg-menu-item>
      <mg-menu-item identifier="id-5" icon={{ icon: 'user' }} label="1 - head-5" badge={{ value: 2, label: 'hello' }}>
        <mg-menu label="submenu-2" direction="vertical">
          <mg-menu-item identifier="id-5-1" size="medium" label="Batman begins"></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </div>
  <script>
    document.querySelector('mg-menu').querySelector('mg-menu-item[identifier="id-3"]').icon = {icon : 'user'};
    document.querySelector('mg-menu').querySelector('mg-menu-item[identifier="id-4"]').icon = {icon : 'user'};
    document.querySelector('mg-menu').querySelector('mg-menu-item[identifier="id-5"]').icon = {icon : 'user'};
    document.querySelector('mg-menu').querySelector('mg-menu-item[identifier="id-4"]').badge = {label: 'hello', value: 2};
    document.querySelector('mg-menu').querySelector('mg-menu-item[identifier="id-5"]').badge = {label: 'hello', value: 2};
  </script>`;

describe('mg-menu', () => {
  test.each([undefined, 'horizontal', 'vertical'])('should renders, props %s', async direction => {
    const page = await createPage(createHTML(direction));

    const element = await page.find('mg-menu');
    expect(element).toHaveClass('hydrated');

    await page.setViewport({ width: direction === 'vertical' ? 400 : 1000, height: direction === 'vertical' ? 400 : 100 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe('keyboard navigation', () => {
    test.each(['horizontal', 'vertical'])('should success keyboard navigation, case direction %s', async direction => {
      const page = await createPage(createHTML(direction));

      await page.setViewport({ width: direction === 'vertical' ? 400 : 1000, height: direction === 'vertical' ? 500 : 200 });

      const baseScreenshot = await page.screenshot();
      expect(baseScreenshot).toMatchImageSnapshot();

      // focus on menu-item id-1
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab1 = await page.screenshot();
      expect(screenshotTab1).toMatchImageSnapshot();

      // focus on menu-item id-3 (has id-2 is disabled)
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab2 = await page.screenshot();
      expect(screenshotTab2).toMatchImageSnapshot();

      // focus on menu-item id-4
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab3 = await page.screenshot();
      expect(screenshotTab3).toMatchImageSnapshot();

      // focus on menu-item id-5
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab4 = await page.screenshot();
      expect(screenshotTab4).toMatchImageSnapshot();

      // expand submenu-item id-5-1
      page.keyboard.down('Enter');
      await page.waitForChanges();

      const screenshotEnter1 = await page.screenshot();
      expect(screenshotEnter1).toMatchImageSnapshot();

      // focus on submenu-item id-5-1
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab5 = await page.screenshot();
      expect(screenshotTab5).toMatchImageSnapshot();

      // focus to parent menu item id-5
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      await page.keyboard.up('Shift');
      await page.waitForChanges();

      const screenshotTab6 = await page.screenshot();
      expect(screenshotTab6).toMatchImageSnapshot();

      // close submenu
      page.keyboard.down('Enter');
      await page.waitForChanges();

      const screenshotEnter2 = await page.screenshot();
      expect(screenshotEnter2).toMatchImageSnapshot();

      // exit focus menu
      page.keyboard.down('Tab');
      await page.waitForChanges();

      const screenshotTab7 = await page.screenshot();
      expect(screenshotTab7).toMatchImageSnapshot();
    });
  });
  describe('click navigation', () => {
    test.each(['horizontal', 'vertical'])('should success keyboard navigation, case direction %s', async direction => {
      const page = await createPage(createHTML(direction));

      await page.setViewport({ width: direction === 'vertical' ? 400 : 1000, height: direction === 'vertical' ? 500 : 200 });

      const baseScreenshot = await page.screenshot();
      expect(baseScreenshot).toMatchImageSnapshot();

      // standard menu-item
      const mgMenuItem1 = await page.find('mg-menu mg-menu-item[identifier="id-1"]');
      await mgMenuItem1.click();

      await page.waitForChanges();

      const screenshotItem1 = await page.screenshot();
      expect(screenshotItem1).toMatchImageSnapshot();

      // expandable menu-item, open
      const mgMenuItem5 = await page.find('mg-menu mg-menu-item[identifier="id-5"]');
      await mgMenuItem5.click();

      await page.waitForChanges();

      const screenshotItem5Expand = await page.screenshot();
      expect(screenshotItem5Expand).toMatchImageSnapshot();

      // expandable menu-item, close
      await mgMenuItem5.click();

      await page.waitForChanges();

      const screenshotItem5Close = await page.screenshot();
      expect(screenshotItem5Close).toMatchImageSnapshot();
    });
  });
});
