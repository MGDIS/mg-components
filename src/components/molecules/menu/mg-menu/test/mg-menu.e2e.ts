import { createPage, DesignSystemE2EPage, renderAttributes } from '../../../../../utils/e2e.test.utils';

const expectImageSnapshot = async (page: DesignSystemE2EPage) => {
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
};

const createHTML = args => `
  <div class="menu-container">
    <mg-menu ${renderAttributes({ label: 'menu', ...args })}>
      <mg-menu-item size="large" status="active">
        <span slot="label">1 - head-1</span>
        <mg-menu label="submenu-1" direction="vertical">
          <mg-menu-item size="medium"><span slot="label">Batman begins</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item size="large" status="disabled"><span slot="label">1 - head-2 long</span></mg-menu-item>
      <mg-menu-item size="large">
        <span slot="label">1 - head-3 very long</span>
        <mg-icon icon='user' slot='illustration'></mg-icon>
      </mg-menu-item>
      <mg-menu-item size="large">
        <span slot="label">1 - head-4</span>
        <mg-icon icon='user' slot='illustration'></mg-icon>
        <mg-badge value='2' label='hello' slot='information'></mg-badge>  
      </mg-menu-item>
      <mg-menu-item size="large">
        <span slot="label">1 - head-5</span>
        <mg-icon icon='user' slot='illustration'></mg-icon>
        <mg-badge value='2' label='hello' slot='information'></mg-badge>  
        <mg-menu label="submenu-2" direction="vertical">
          <mg-menu-item size="medium"><span slot="label">Batman begins with a longer title to go outide screen</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </div>`;

describe.each(['horizontal', 'vertical'])('mg-menu', direction => {
  test(`should renders, case direction ${direction}`, async () => {
    const page = await createPage(createHTML({ direction }), { width: direction === 'vertical' ? 400 : 1100, height: direction === 'vertical' ? 400 : 100 });

    const element = await page.find('mg-menu');
    expect(element).toHaveClass('hydrated');
    await expectImageSnapshot(page);

    if (direction === 'vertical') {
      await page.setViewport({ width: 180, height: 400 });
      await expectImageSnapshot(page);
    }
  });

  describe('navigation', () => {
    test(`should success mouse navigation, case direction ${direction}`, async () => {
      const page = await createPage(createHTML({ direction }), { width: direction === 'vertical' ? 400 : 1200, height: direction === 'vertical' ? 500 : 200 });
      await expectImageSnapshot(page);

      // standard menu-item
      const mgMenuItem1 = await page.find('mg-menu-item');
      await mgMenuItem1.click();
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);

      // expandable menu-item, open
      const mgMenuItem5 = await page.find(`mg-menu-item[data-style-direction-${direction}]:nth-child(5)`);
      await mgMenuItem5.click();
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);

      // expandable menu-item, close
      await mgMenuItem5.click();
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);
    });

    test(`should manage document click, case direction ${direction}`, async () => {
      const page = await createPage(createHTML({ direction }), { width: direction === 'vertical' ? 400 : 1200, height: direction === 'vertical' ? 500 : 200 });
      await expectImageSnapshot(page);

      const document = await page.find('body');

      // standard menu-item
      const mgMenuItem1 = await page.find('mg-menu-item');
      await mgMenuItem1.click();
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);

      // expandable menu-item, close
      await document.click();
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);
    });

    test(`should success keyboard navigation, case direction ${direction}`, async () => {
      const page = await createPage(createHTML({ direction }), { width: direction === 'vertical' ? 400 : 1200, height: direction === 'vertical' ? 500 : 200 });
      await expectImageSnapshot(page);

      // focus on menu-item id-1
      page.keyboard.press('Tab');
      await page.waitForChanges();
      await expectImageSnapshot(page);

      // focus on menu-item id-3 (has id-2 is disabled)
      page.keyboard.press('Tab');
      // focus on menu-item id-4
      page.keyboard.press('Tab');
      // focus on menu-item id-5
      page.keyboard.press('Tab');
      await page.waitForChanges();
      await expectImageSnapshot(page);

      // expand submenu-item id-5-1
      page.keyboard.press('Enter');
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);

      // focus on submenu-item id-5-1
      page.keyboard.press('Tab');
      await page.waitForChanges();
      await expectImageSnapshot(page);

      // focus to parent menu item id-5
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      await page.keyboard.up('Shift');
      await page.waitForChanges();
      await expectImageSnapshot(page);

      // close submenu
      page.keyboard.press('Enter');
      await page.waitForChanges();
      await page.waitForTimeout(200); // chevron rotation animation
      await expectImageSnapshot(page);

      // exit focus menu
      page.keyboard.press('Tab');
      await page.waitForChanges();
      await expectImageSnapshot(page);
    });
  });
});
