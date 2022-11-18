import { createPage } from '../../../../../utils/e2e.test.utils';

const delay = (duration = 200) => setTimeout(() => null, duration);

const createHTML = direction => `
  <div class="menu-container">
    <mg-menu label="menu" ${direction && `direction="${direction}"`}>
      <mg-menu-item status="active">
        <span slot="label">1 - head-1</span>
        <mg-menu label="submenu-1" direction="vertical">
          <mg-menu-item size="medium"><span slot="label">Batman begins</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item status="disabled"><span slot="label">1 - head-2 long</span></mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-3 very long</span>
        <mg-icon icon='user' slot='illustration'></mg-icon>
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-4</span>
        <mg-icon icon='user' slot='illustration'></mg-icon>
        <mg-badge value='2' label='hello' slot='information'></mg-badge>  
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-5</span>
        <mg-icon icon='user' slot='illustration'></mg-icon>
        <mg-badge value='2' label='hello' slot='information'></mg-badge>  
        <mg-menu label="submenu-2" direction="vertical">
          <mg-menu-item size="medium"><span slot="label">Batman begins</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </div>`;

describe('mg-menu', () => {
  test.each([undefined, 'horizontal', 'vertical'])('should renders, props %s', async direction => {
    const page = await createPage(createHTML(direction));

    const element = await page.find('mg-menu');
    expect(element).toHaveClass('hydrated');

    await page.setViewport({ width: direction === 'vertical' ? 400 : 1200, height: direction === 'vertical' ? 400 : 100 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    if (direction === 'vertical') {
      await page.setViewport({ width: 180, height: 400 });

      const screenshot2 = await page.screenshot();
      expect(screenshot2).toMatchImageSnapshot();
    }
  });

  describe('keyboard navigation', () => {
    test.each(['horizontal', 'vertical'])('should success keyboard navigation, case direction %s', async direction => {
      const page = await createPage(createHTML(direction));

      await page.setViewport({ width: direction === 'vertical' ? 400 : 1200, height: direction === 'vertical' ? 500 : 200 });

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

      // await chevron animation done
      await delay();
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

      // await chevron animation done
      await delay();
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
    test.each(['horizontal', 'vertical'])('should success click navigation, case direction %s', async direction => {
      const page = await createPage(createHTML(direction));

      await page.setViewport({ width: direction === 'vertical' ? 400 : 1200, height: direction === 'vertical' ? 500 : 200 });

      const baseScreenshot = await page.screenshot();
      expect(baseScreenshot).toMatchImageSnapshot();

      // standard menu-item
      const mgMenuItem1 = await page.find('mg-menu[label="menu"] > mg-menu-item:first-of-type');
      await mgMenuItem1.click();

      await page.waitForChanges();

      // await chevron animation done
      await delay();
      await page.waitForChanges();

      const screenshotItem1 = await page.screenshot();
      expect(screenshotItem1).toMatchImageSnapshot();

      // expandable menu-item, open
      const mgMenuItem5 = await page.find('mg-menu[label="menu"] > mg-menu-item:last-of-type');
      await mgMenuItem5.click();

      await page.waitForChanges();

      // await chevron animation done
      await delay();
      await page.waitForChanges();

      const screenshotItem5Expand = await page.screenshot();
      expect(screenshotItem5Expand).toMatchImageSnapshot();

      // expandable menu-item, close
      await mgMenuItem5.click();

      await page.waitForChanges();

      // await chevron animation done
      await delay();
      await page.waitForChanges();

      const screenshotItem5Close = await page.screenshot();
      expect(screenshotItem5Close).toMatchImageSnapshot();
    });
  });
});
