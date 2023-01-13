import { OverflowBehaviorElements } from '../../../../../utils/behaviors.utils';
import { createPage, DesignSystemE2EPage, renderAttributes } from '../../../../../utils/e2e.test.utils';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { Direction, MenuSizeType, sizes } from '../mg-menu.conf';

const expectImageSnapshot = async (page: DesignSystemE2EPage) => {
  await page.waitForTimeout(200);
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
};

const moreElement = (hasOverflow: boolean) =>
  hasOverflow
    ? `
  <script>
    const mgMenu = document.querySelector('mg-menu');
    mgMenu.moreitem = ${JSON.stringify({ size: 'large' })};
  </script>
  `
    : '';

const getSubMenuSize = (size: MenuSizeType) => {
  if (size === 'large') return 'medium';
  else if (size === 'medium') return 'regular';
  else return 'regular';
};

const createHTML = (args, containerSize?) => `
  <div class="menu-container menu-container--${containerSize}">
    <mg-menu ${renderAttributes({ label: 'menu', ...args })}>
      <mg-menu-item status="active">
        <span slot="label">1 - head-1</span>
        <mg-menu ${renderAttributes({ label: 'sub-menu 1', size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item status="disabled"><span slot="label">1 - head-2 long</span></mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-3 very long</span>
        <mg-icon icon='user' slot='image'></mg-icon>
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-4</span>
        <mg-icon icon='user' slot='image'></mg-icon>
        ${args?.badge ? "<mg-badge value='2' label='hello' slot='information'></mg-badge>" : ''}  
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-5</span>
        <mg-icon icon='user' slot='image'></mg-icon>
        ${args?.badge ? "<mg-badge value='2' label='hello' slot='information'></mg-badge>" : ''} 
        <mg-menu ${renderAttributes({ label: 'sub-menu 2', size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins with a longer title to go outide screen</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </div>
  <style>
    .menu-container.menu-container--vertical-small {
      width: 180px;
    }
    .menu-container.menu-container--horizontal-small {
      width: 400px;
    }
  </style>
  ${moreElement(args.direction !== Direction.VERTICAL)}
  `;

describe('mg-menu', () => {
  describe.each([Direction.HORIZONTAL, Direction.VERTICAL])('direction %s', direction => {
    test.each(sizes)(`should renders, case direction ${direction} size %s with large screen`, async size => {
      const page = await createPage(
        `<h1>${direction} mg-menu - Size props ${size} in large screen</h1>${createHTML({ direction, size })}`,
        direction === Direction.HORIZONTAL ? { width: 1100, height: 200 } : undefined,
      );

      const element = await page.find('mg-menu');
      expect(element).toHaveClass('hydrated');

      await expectImageSnapshot(page);
    });

    describe('navigation', () => {
      test(`should success mouse navigation, case direction ${direction}`, async () => {
        const page = await createPage(createHTML({ direction }), { width: direction === Direction.VERTICAL ? 400 : 1200, height: direction === Direction.VERTICAL ? 500 : 200 });
        await expectImageSnapshot(page);

        // standard menu-item
        const mgMenuItem1 = await page.find('mg-menu-item');
        await mgMenuItem1.click();
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // expandable menu-item, open
        const mgMenuItem5 = await page.find(`mg-menu-item[data-style-direction-${direction}]:nth-child(5)`);
        await mgMenuItem5.click();
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // expandable menu-item, close
        await mgMenuItem5.click();
        await page.waitForChanges();
        await expectImageSnapshot(page);
      });

      test(`should manage document click, case direction ${direction}`, async () => {
        const page = await createPage(createHTML({ direction }), { width: direction === Direction.VERTICAL ? 400 : 1200, height: direction === Direction.VERTICAL ? 500 : 200 });
        await expectImageSnapshot(page);

        const document = await page.find('body');

        // standard menu-item
        const mgMenuItem1 = await page.find('mg-menu-item');
        await mgMenuItem1.click();
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // expandable menu-item, close
        await document.click();
        await page.waitForChanges();
        await expectImageSnapshot(page);
      });

      test(`should success keyboard navigation, case direction ${direction}`, async () => {
        const page = await createPage(createHTML({ direction }), { width: direction === Direction.VERTICAL ? 400 : 1200, height: direction === Direction.VERTICAL ? 500 : 200 });
        await expectImageSnapshot(page);

        // focus on menu-item id-1
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // focus on menu-item id-3 (has id-2 is disabled)
        await page.keyboard.press('Tab');
        // focus on menu-item id-4
        await page.keyboard.press('Tab');
        // focus on menu-item id-5
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // expand submenu-item id-5-1
        await page.keyboard.press('Enter');
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // focus on submenu-item id-5-1
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // focus to parent menu item id-5
        await page.keyboard.down('Shift');
        await page.keyboard.press('Tab');
        await page.keyboard.up('Shift');
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // close submenu
        await page.keyboard.press('Enter');
        await page.waitForChanges();
        await expectImageSnapshot(page);

        // exit focus menu
        await page.keyboard.press('Tab');
        await page.waitForChanges();
        await expectImageSnapshot(page);
      });
    });
  });

  describe('overflow', () => {
    test.each(sizes)(`should renders, case direction ${Direction.VERTICAL} size %s with small screen`, async size => {
      const page = await createPage(
        `<h1>${Direction.VERTICAL} mg-menu - Size props ${size} in small screen</h1>${createHTML({ direction: Direction.VERTICAL, size }, `${Direction.VERTICAL}-${'small'}`)}`,
      );

      await expectImageSnapshot(page);
    });

    test.each([true, false])('should renders with overflow, case badge %s', async badge => {
      const page = await createPage(`<h1>mg-menu - Overflow - direction ${Direction.HORIZONTAL}</h1>${createHTML({ direction: Direction.HORIZONTAL, badge })}`, {
        width: 1100,
        height: 200,
      });

      const element = await page.find('mg-menu');
      expect(element).toHaveClass('hydrated');
      await expectImageSnapshot(page);

      await page.$eval('.menu-container', elm => {
        elm.classList.add('menu-container--horizontal-small');
      });
      await page.waitForChanges();
      await expectImageSnapshot(page);

      const moreElement = await element.find(`[${OverflowBehaviorElements.MORE}]`);
      await moreElement.click();

      await expectImageSnapshot(page);

      await page.$eval(
        `[${OverflowBehaviorElements.BASE_INDEX}="0"]`,
        (elm, status) => {
          elm.setAttribute('status', status as string);
        },
        Status.VISIBLE,
      );
      await page.$eval(
        `[${OverflowBehaviorElements.BASE_INDEX}="2"]`,
        (elm, status) => {
          elm.setAttribute('status', status as string);
        },
        Status.ACTIVE,
      );

      await expectImageSnapshot(page);
    });
  });
});
