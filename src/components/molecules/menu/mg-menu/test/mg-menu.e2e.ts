import { KeyInput } from 'puppeteer';
import { OverflowBehaviorElements } from '../../../../../utils/behaviors.utils';
import { createPage, DesignSystemE2EPage, renderAttributes } from '../../../../../utils/e2e.test.utils';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { Direction, MenuSizeType, sizes } from '../mg-menu.conf';

enum Position {
  PRESS = 'press',
  DOWN = 'down',
}

enum Key {
  TAB = 'Tab',
  SHIFT = 'Shift',
  ENTER = 'Enter',
}

const expectImageSnapshot = async (page: DesignSystemE2EPage) => {
  await page.waitForChanges();
  await page.waitForTimeout(200);
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
};

const getSubMenuSize = (size: MenuSizeType) => {
  if (size === 'large') return 'medium';
  else if (size === 'medium') return 'regular';
  else return 'regular';
};

const getFrameSize = (direction, size?) =>
  direction === Direction.VERTICAL
    ? { width: 400, height: ['medium', 'large'].includes(size) ? 400 : 250 }
    : { width: ['medium', 'large'].includes(size) ? 1100 : 800, height: 200 };

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

describe('mg-menu', () => {
  describe.each([Direction.HORIZONTAL, Direction.VERTICAL])('direction %s', direction => {
    test.each(sizes)(`should renders, case direction ${direction} size %s with large screen`, async size => {
      const page = await createPage(createHTML({ direction, size, badge: true }), getFrameSize(direction, size));

      const element = await page.find('mg-menu');
      expect(element).toHaveClass('hydrated');

      await expectImageSnapshot(page);
    });
  });

  describe('navigation horizontal', () => {
    test(`should success mouse navigation, case direction ${Direction.HORIZONTAL}`, async () => {
      const page = await createPage(createHTML({ direction: Direction.HORIZONTAL }), getFrameSize(Direction.HORIZONTAL));
      await expectImageSnapshot(page);

      const actions = [
        { position: 1, expanded: true },
        { position: 5, expanded: true },
        { position: 5, expanded: false },
        { position: 1, expanded: true },
      ];
      for await (const action of actions) {
        let item = await page.find(`header > mg-menu > mg-menu-item:nth-of-type(${action.position}) >>> button`);
        await item.click();
        await page.waitForChanges();

        expect(item.getAttribute('aria-expanded')).toBe(`${action.expanded}`);
        item = await page.find(`header > mg-menu > mg-menu-item:not(:nth-of-type(${action.position})) >>> button[aria-expanded="true"]`);
        expect(item).toBe(null);
      }

      // menu-item close
      await page.$eval('body', elm => {
        elm.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await page.waitForChanges();
      await expectImageSnapshot(page);
    });

    test(`should success keyboard navigation, case direction ${Direction.HORIZONTAL}`, async () => {
      const page = await createPage(createHTML({ direction: Direction.HORIZONTAL }), getFrameSize(Direction.HORIZONTAL));
      await expectImageSnapshot(page);

      const actions = [
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.ENTER, openeItem: 5 },
        { position: Position.PRESS, key: Key.TAB, openeItem: 5 },
        { position: Position.PRESS, key: Key.SHIFT, openeItem: 5 },
        { position: Position.PRESS, key: Key.ENTER, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
      ];

      for await (const action of actions) {
        if (action.key === Key.SHIFT) {
          await page.keyboard.down(Key.SHIFT);
          await page.keyboard.press(Key.TAB);
          await page.keyboard.up(Key.SHIFT);
        } else {
          await page.keyboard[action.position](action.key as unknown as KeyInput);
        }
        await page.waitForChanges();
        let item;
        if (action.openeItem > 0) {
          item = await page.find(`header > mg-menu > mg-menu-item:nth-of-type(${action.openeItem}) >>> button[aria-expanded="true"]`);
          expect(item).not.toBe(null);
          item = await page.find(`header > mg-menu > mg-menu-item:not(:nth-of-type(${action.openeItem})) >>> button[aria-expanded="true"]`);
        } else {
          item = await page.find(`header > mg-menu > mg-menu-item >>> button[aria-expanded="true"]`);
        }
        expect(item).toBe(null);
      }
    });
  });

  describe('navigation vertical', () => {
    test(`should success mouse navigation, case direction ${Direction.VERTICAL}`, async () => {
      const page = await createPage(createHTML({ direction: Direction.VERTICAL }), getFrameSize(Direction.VERTICAL));
      await expectImageSnapshot(page);

      const positions = [1, 5, 5, 1];
      for await (const position of positions) {
        const item = await page.find(`header > mg-menu > mg-menu-item:nth-of-type(${position}) >>> button`);
        await item.click();
        await page.waitForChanges();
        await expectImageSnapshot(page);
      }

      await page.$eval('body', elm => {
        elm.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await page.waitForChanges();
      await expectImageSnapshot(page);
    });
    test(`should success keyboard navigation, case direction ${Direction.VERTICAL}`, async () => {
      const page = await createPage(createHTML({ direction: Direction.VERTICAL }), getFrameSize(Direction.VERTICAL));
      await expectImageSnapshot(page);

      const actions = [
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.ENTER },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.SHIFT },
        { position: Position.PRESS, key: Key.ENTER },
        { position: Position.PRESS, key: Key.TAB },
      ];

      for await (const action of actions) {
        if (action.key === Key.SHIFT) {
          await page.keyboard.down(Key.SHIFT);
          await page.keyboard.press(Key.TAB);
          await page.keyboard.up(Key.SHIFT);
        } else {
          await page.keyboard[action.position](action.key as unknown as KeyInput);
        }
        await page.waitForChanges();
        await expectImageSnapshot(page);
      }
    });
  });

  describe('overflow', () => {
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
