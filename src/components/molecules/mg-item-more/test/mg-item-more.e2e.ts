import { OverflowBehaviorElements } from '../../../../utils/behaviors.utils';
import { createPage, DesignSystemE2EPage, renderAttributes } from '../../../../utils/e2e.test.utils';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';
import { Direction, MenuSizeType, sizes } from '../../menu/mg-menu/mg-menu.conf';

const expectImageSnapshot = async (page: DesignSystemE2EPage) => {
  await page.waitForChanges();
  await page.waitForTimeout(200);
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
};

const getFrameSize = (direction, size?) =>
  direction === Direction.VERTICAL
    ? { width: 400, height: ['medium', 'large'].includes(size) ? 400 : 250 }
    : { width: ['medium', 'large'].includes(size) ? 1100 : 800, height: 200 };

const getSubMenuSize = (size: MenuSizeType) => {
  if (size === 'large') return 'medium';
  else if (size === 'medium') return 'regular';
  else return 'regular';
};

const createHTML = (args, containerSize?) => `
  <header class="menu-container menu-container--${containerSize}">
    <mg-menu ${renderAttributes({ label: 'menu', ...args })}>
      <mg-menu-item status="active">
        <span slot="label">1 - head-1</span>
        <mg-menu ${renderAttributes({ label: 'sub-menu 1', direction: Direction.VERTICAL, size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item status="disabled"><span slot="label">1 - head-2 long</span></mg-menu-item>
      <mg-menu-item href="#link">
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
        <mg-menu ${renderAttributes({ label: 'sub-menu 2', direction: Direction.VERTICAL, size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins with a longer title to go outide screen</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </header>
  <style>
    .menu-container.menu-container--vertical-small {
      width: 180px;
    }
  </style>
  `;

describe('mg-item-more', () => {
  describe('mg-menu', () => {
    test.each(sizes)(`should renders, case direction ${Direction.VERTICAL} size %s with small screen`, async size => {
      const page = await createPage(createHTML({ direction: Direction.VERTICAL, size }, `${Direction.VERTICAL}-${'small'}`));

      await expectImageSnapshot(page);
    });

    test.each([true, false])('should renders with overflow, case badge %s', async badge => {
      const page = await createPage(createHTML({ direction: Direction.HORIZONTAL, badge }), getFrameSize(Direction.HORIZONTAL));

      await page.setViewport({ width: 450, height: 200 });

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
