import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenu } from '../mg-menu';
import { Direction } from '../mg-menu.conf';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { mockPopperArrowError } from '../../../mg-popover/test/mg-popover.spec';
import { forcePopoverId, setupMutationObserverMock, setupResizeObserverMock } from '../../../../../utils/unit.test.utils';
import { OverflowBehaviorElements } from '../../../../../utils/behaviors.utils';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';

mockPopperArrowError();

const getPage = async (args, withSubmenu = true) => {
  const page = await newSpecPage({
    components: [MgMenu, MgMenuItem, MgPopover],
    template: () => (
      <mg-menu {...args}>
        <mg-menu-item>
          <span slot="label">batman</span>
          {withSubmenu && (
            <mg-menu label="batman - submenu" direction={Direction.VERTICAL}>
              <mg-menu-item>
                <span slot="label">batman begins</span>
                <mg-menu label="batman begins - submenu" direction={Direction.VERTICAL}>
                  <mg-menu-item>
                    <span slot="label">movie</span>
                  </mg-menu-item>
                </mg-menu>
              </mg-menu-item>
              <mg-menu-item>
                <span slot="label">joker: the dark knight</span>
              </mg-menu-item>
              <mg-menu-item>
                <span slot="label">bane: the dark knight rise</span>
              </mg-menu-item>
            </mg-menu>
          )}
        </mg-menu-item>
        <mg-menu-item>
          <span slot="label">joker</span>
          {args.badge && <mg-badge value={1} label="bad guy"></mg-badge>}
          <div>
            <h2>This is a joker card</h2>
            <p>If you don't know the joker, you can watch the movie.</p>
          </div>
        </mg-menu-item>
        <mg-menu-item>
          <span slot="label">bane</span>
        </mg-menu-item>
      </mg-menu>
    ),
  });

  jest.runOnlyPendingTimers();
  await page.waitForChanges();

  [page.doc, ...Array.from(page.doc.querySelectorAll('mg-menu')).map(el => el.shadowRoot)].forEach(el =>
    Array.from(el.querySelectorAll('mg-menu-item')).forEach((item, index) => {
      forcePopoverId(item, `mg-popover-test_${index}`);
    }),
  );

  return page;
};

describe('mg-menu', () => {
  let fireRo;
  beforeEach(() => {
    jest.useFakeTimers();
    setupResizeObserverMock({
      observe: function () {
        fireRo = this.cb;
      },
      disconnect: function () {
        return null;
      },
    });
    setupMutationObserverMock({
      observe: () => null,
      disconnect: () => null,
      takeRecords: () => [],
    });
  });

  afterEach(() => jest.clearAllTimers());

  describe('render', () => {
    test.each([{ label: 'batman menu' }, { label: 'batman menu', direction: 'horizontal' }, { label: 'batman menu', direction: 'vertical' }])('with args %s', async args => {
      const { root } = await getPage(args);

      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    const baseProps = { label: 'batman menu' };
    test.each([
      { props: { direction: 'horizontal' }, error: '<mg-menu> prop "label" is required.' },
      { props: { ...baseProps, direction: 'test' }, error: '<mg-menu> prop "direction" must be one of : horizontal, vertical.' },
      { props: { ...baseProps, direction: Direction.VERTICAL, moreitem: { icon: 'user' } }, error: '<mg-menu> prop "moreitem" must be paired with direction horizontal.' },
      { props: { ...baseProps, moreitem: {} }, error: '<mg-menu> prop "moreitem" must match MoreItemType.' },
      { props: { ...baseProps, moreitem: { mgIcon: {} } }, error: '<mg-menu> prop "moreitem" must match MoreItemType.' },
      { props: { ...baseProps, moreitem: { slotLabel: {} } }, error: '<mg-menu> prop "moreitem" must match MoreItemType.' },
    ])('Should throw error when props are invalid, case %s', async ({ props, error }) => {
      expect.assertions(1);

      try {
        await getPage(props);
      } catch (err) {
        expect(err.message).toMatch(error);
      }
    });
  });

  describe.each(['horizontal', 'vertical'])('events', direction => {
    test(`should manage outside click, case direction ${direction}`, async () => {
      const page = await getPage({ label: 'batman menu', direction });

      const firstItem: HTMLMgMenuItemElement = page.root.querySelector('[title="batman"]').closest('mg-menu-item');
      expect(firstItem.expanded).toBe(false);

      firstItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(firstItem.expanded).toBe(true);

      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(firstItem.expanded).toBe(direction === 'vertical');
    });

    test.each(['click', 'focus'])(`should manage sibling menu-item expanded props in ${direction} menu, case %s event`, async event => {
      const page = await getPage({ label: 'batman menu', direction });
      // open batman item
      const batmanItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="batman"]').closest('mg-menu-item');
      expect(batmanItem.expanded).toBe(false);
      if (direction === 'horizontal') {
        expect(batmanItem.shadowRoot.querySelector('mg-popover')).not.toBe(null);
      }

      batmanItem.shadowRoot.querySelector('button').dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(batmanItem.expanded).toBe(true);

      // open batman first child item
      const batmanChildItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="batman begins"]').closest('mg-menu-item');

      batmanChildItem.shadowRoot.querySelector('button').dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(batmanItem.expanded).toBe(true);
      expect(batmanChildItem.expanded).toBe(true);

      // open joker item must close batman first child item
      const jokerItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="joker"]').closest('mg-menu-item');

      jokerItem.shadowRoot.querySelector('button').dispatchEvent(new CustomEvent(event, { bubbles: true }));
      await page.waitForChanges();

      expect(batmanItem.expanded).toBe(false);
      expect(batmanChildItem.expanded).toBe(false);
      expect(jokerItem.expanded).toBe(event === 'click');
    });
  });

  describe('overflow', () => {
    test.each([undefined, { mgIcon: { icon: 'user' } }, { slotLabel: { label: 'batman' } }, { slotLabel: { display: true } }, { size: 'large' }])(
      'with args %s',
      async moreitem => {
        const page = await getPage({ label: 'batman menu', moreitem });
        const menuSize = 215;
        const menu = page.doc.querySelector('mg-menu');

        expect(page.root).toMatchSnapshot();

        Object.defineProperty(menu, 'offsetWidth', {
          get: jest.fn(() => menuSize),
        });
        Object.defineProperty(menu.shadowRoot.querySelector(`[${OverflowBehaviorElements.MORE}]`), 'offsetWidth', {
          get: jest.fn(() => 50),
        });
        const items = Array.from(page.doc.querySelectorAll('mg-menu-item'));
        items.forEach(item => {
          Object.defineProperty(item, 'offsetWidth', {
            get: jest.fn(() => 80),
          });

          // has JSDom don't clone child props and label is required on mg-menu we force it
          const newNode = item.cloneNode(true);
          item.cloneNode = (): Node => {
            Array.from((newNode as unknown as HTMLElement).querySelectorAll('mg-menu')).forEach(menu => {
              menu.label = 'test override';
            });
            return newNode;
          };
          item.dispatchEvent;
        });

        // render more menu with last menu item displayed in more menu
        fireRo([{ contentRect: { width: menuSize } }]);
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        // test click on visible more menu item
        const lastVisbleItem = page.doc.querySelector(`[${OverflowBehaviorElements.BASE_INDEX}="2"]`) as HTMLMgMenuItemElement;
        const spy = jest.spyOn(lastVisbleItem, 'dispatchEvent');

        const lastVisbleItemProxy = page.doc.querySelector(`[${OverflowBehaviorElements.PROXY_INDEX}="2"]`) as HTMLMgMenuItemElement;
        lastVisbleItemProxy.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(spy).toHaveBeenCalled();

        // test status change on visible item to active
        lastVisbleItem.status = Status.ACTIVE;
        expect(lastVisbleItemProxy.status).toBe(Status.ACTIVE);
      },
    );

    test.each([Direction.HORIZONTAL, Direction.HORIZONTAL])('should fire disconnect callback', async direction => {
      const { rootInstance, doc } = await getPage({ label: 'batman menu', direction });

      if (direction === Direction.HORIZONTAL) {
        const spy = jest.spyOn(rootInstance.overflowBehavior, 'disconnect');
        doc.querySelector('mg-menu').remove();
        expect(spy).toHaveBeenCalled();
      } else {
        expect(rootInstance.overflowBehavior).toBe(undefined);
      }
    });
  });
});
