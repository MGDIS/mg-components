import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBadge } from '../../../../atoms/mg-badge/mg-badge';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import { MgMenu } from '../../mg-menu/mg-menu';
import { Status } from '../mg-menu-item.conf';
import { Direction } from '../../mg-menu/mg-menu.conf';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { forcePopoverId, mockConsoleError, mockWindowFrames, setupMutationObserverMock, setupResizeObserverMock } from '../../../../../utils/unit.test.utils';

mockConsoleError();
mockWindowFrames();

const menu = (args: Partial<MgMenu> & { slots?: unknown } & Pick<MgMenu, 'label'> = { label: 'child-menu' }) => <mg-menu {...args}>{args.slots}</mg-menu>;
const menuItem = (args, slot?) => (
  <mg-menu-item {...args} identifier={args.identifier === undefined ? 'identifier' : args.identifier} data-overflow-more={args.overflow}>
    {slot}
    {args.label && <span slot="label">{args.label}</span>}
    {args.metadata && <span slot="metadata">my metadata</span>}
    {args.icon && <mg-icon slot="image" icon="user"></mg-icon>}
    {args.badge && <mg-badge slot="information" label="badge label" value="1"></mg-badge>}
  </mg-menu-item>
);
const childMenu = (args: { label: string; status?: MgMenuItem['status']; direction?: MgMenu['direction']; badge?: boolean } = { label: 'child menu item' }, slots?) =>
  menu({ label: 'child menu', slots: menuItem(args, slots), direction: args.direction });
const templateDefault = (args, slots?) => menu({ label: 'menu', slots: menuItem(args, slots) });
const templateTwoMenuItems = (args, slots?) => menu({ label: 'menu', slots: [menuItem(args, slots), menuItem({ label: 'item 2' })] });

const getPage = async template => {
  const page = await newSpecPage({
    components: [MgMenuItem, MgMenu, MgIcon, MgBadge, MgPopover],
    template: () => template,
  });

  if (Boolean(page.rootInstance.itemLoaded?.emit)) page.rootInstance.itemLoaded.emit = jest.fn();

  jest.runAllTimers();
  await page.waitForChanges();

  [page.doc, ...Array.from(page.doc.querySelectorAll('mg-menu')).map(el => el.shadowRoot)].forEach(el =>
    Array.from(el.querySelectorAll('mg-menu-item')).forEach((item, index) => {
      forcePopoverId(item, `mg-popover-test_${index}`);
    }),
  );

  return page;
};

describe('mg-menu-item', () => {
  let fireMo = [];
  beforeEach(() => {
    fireMo = [];
    jest.useFakeTimers();
    setupMutationObserverMock({
      observe: function () {
        fireMo.push(this.cb);
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
  });
  afterEach(() => jest.clearAllTimers());
  describe('render', () => {
    test.each([
      { label: 'Batman' },
      { label: 'Batman', icon: true },
      { label: 'Batman', badge: true },
      { label: 'Batman', metadata: true },
      { label: 'Batman', href: '#link' },
      { label: 'Batman', overflow: true },
    ])('with args %s', async args => {
      const { root } = await getPage(templateDefault(args));

      expect(root).toMatchSnapshot();
    });

    test.each([{ label: 'Batman' }, { label: 'Batman', icon: true }, { label: 'Batman', badge: true }, { label: 'Batman', metadata: true }, { label: 'Batman', href: '#link' }])(
      'with size large, %s',
      async args => {
        const { root } = await getPage(menu({ label: 'Batman', size: 'large', slots: menuItem(args) }));

        expect(root).toMatchSnapshot();
      },
    );

    test('with 2 menu-items, last items get style modifier', async () => {
      const { root } = await getPage(templateTwoMenuItems({ label: 'Batman' }));

      expect(root).toMatchSnapshot();
    });

    test.each([Status.ACTIVE, Status.DISABLED, Status.HIDDEN, Status.VISIBLE])('with status %s', async status => {
      const page = await getPage(templateDefault({ label: 'Batman', status }));
      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.status = element.status === Status.ACTIVE ? Status.VISIBLE : Status.ACTIVE;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, 0, 5])('with menuIndex %s', async menuIndex => {
      const { root } = await getPage(templateDefault({ label: 'Batman', menuIndex }));

      expect(root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('with expanded %s', async expanded => {
      const page = await getPage(templateDefault({ label: 'Batman', expanded }));

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('with expanded and sub-menu %s', async expanded => {
      const page = await getPage(templateDefault({ label: 'Batman', expanded }, childMenu()));

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('with vertical sub-menu', async () => {
      const page = await getPage(
        templateDefault({ label: 'Batman' }, childMenu({ label: 'level 2', direction: Direction.VERTICAL }, childMenu({ label: 'level 3', direction: Direction.VERTICAL }))),
      );

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test('throw errors missing slot label %s', async () => {
      expect.assertions(1);

      try {
        await getPage(templateDefault({ label: undefined }));
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> slot "label" is required.');
      }
    });

    test('throw errors missing slot label %s', async () => {
      expect.assertions(1);

      try {
        await getPage(templateDefault({ label: ' ' }));
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> slot "label" must have text content.');
      }
    });

    test('with expanded and sub-menu %s', async () => {
      expect.assertions(1);

      try {
        await getPage(templateDefault({ label: 'label', href: '#link' }, childMenu()));
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "href" is unauthorizied when element is a parent.');
      }
    });

    test('with expanded type mismatch', async () => {
      expect.assertions(1);

      try {
        await getPage(menuItem({ label: 'label', expanded: { name: 'batman' } }));
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "expanded" must be a boolean.');
      }
    });
  });

  describe.each([
    expanded => templateDefault({ label: 'Batman', expanded }),
    expanded => templateDefault({ label: 'Batman', expanded }, childMenu()),
    expanded => templateDefault({ label: 'Batman', expanded }, childMenu({ label: 'level 2' }, childMenu({ label: 'level 3' }))),
    expanded => templateDefault({ label: 'Batman', expanded }, childMenu({ label: 'level 2' }, childMenu({ label: 'level 3', status: Status.ACTIVE }))),
    expanded =>
      templateDefault(
        { label: 'Batman', expanded },
        <div>
          <h3>Demo title</h3>
          <p>some content</p>
        </div>,
      ),
  ])('mouse navigation', template => {
    test.each([undefined, true, false])('should manage toggle expand with template %s', async expanded => {
      const page = await getPage(template(expanded));

      const element = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.shadowRoot.querySelector('button').dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('events', () => {
    describe('click', () => {
      test.each([{}, { child: true }, { status: Status.DISABLED }, { href: '/' }])('should manage prevent click action %s', async props => {
        const page = await getPage(templateDefault({ label: 'Batman', ...props }, props.child === true && childMenu()));

        const element = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');

        const event = new CustomEvent('click', { bubbles: true });

        const spyPreventDefault = jest.spyOn(event, 'preventDefault');
        const spyStopPropagation = jest.spyOn(event, 'stopPropagation');

        element.shadowRoot.querySelector(props.href !== undefined ? 'a' : 'button').dispatchEvent(event);
        await page.waitForChanges();

        if (props.child) {
          const subElement = page.doc.querySelector('mg-menu mg-menu > mg-menu-item');

          subElement.shadowRoot.querySelector(props.href !== undefined ? 'a' : 'button').dispatchEvent(event);
          await page.waitForChanges();

          expect(spyPreventDefault).not.toHaveBeenCalled();
          expect(spyStopPropagation).not.toHaveBeenCalled();
        } else if (props.status !== undefined) {
          expect(spyPreventDefault).toHaveBeenCalled();
          expect(spyStopPropagation).toHaveBeenCalled();
        } else {
          expect(spyPreventDefault).not.toHaveBeenCalled();
          expect(spyStopPropagation).not.toHaveBeenCalled();
        }
      });
    });

    describe('popover', () => {
      test.each([true, false])('should toggle expanded from popover display-change event', async display => {
        const page = await getPage(templateDefault({ label: 'Batman', expanded: !display }, childMenu()));

        const element = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');

        const popover = element.shadowRoot.querySelector('mg-popover');

        popover.dispatchEvent(new CustomEvent('display-change', { detail: display }));
        await page.waitForChanges();

        expect(element.expanded).toBe(display);
      });

      test('should prevent "expanded" to be update to "false" when click inside content slot', async () => {
        const page = await getPage(
          menu({
            label: 'main menu',
            slots: menuItem(
              { label: 'Batman', expanded: true },
              <div>
                <button>Hello batman</button>
              </div>,
            ),
          }),
        );

        expect(page.root).toMatchSnapshot();

        jest.runAllTimers();

        const mgMenuItem = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');
        const contentButton = mgMenuItem.querySelector('button');

        contentButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(mgMenuItem.expanded).toBe(true);
      });
    });

    describe('status-change', () => {
      test('should emit new status, when prop status change', async () => {
        const { rootInstance, doc } = await getPage(menuItem({ label: 'Batman' }));

        const item = doc.querySelector('mg-menu-item');

        const spy = jest.spyOn(rootInstance.statusChange, 'emit');
        item.status = Status.ACTIVE;

        expect(spy).toHaveBeenCalledWith(Status.ACTIVE);
      });

      test.each([Status.ACTIVE, Status.VISIBLE])('Should update status with child item "change-status" event, from status %s', async status => {
        const nextStatus = status === Status.ACTIVE ? Status.VISIBLE : Status.ACTIVE;
        const page = await getPage(menuItem({ label: 'Batman' }, childMenu({ label: 'child menu', status })));

        const item = page.doc.querySelector('mg-menu-item');
        const childItem: HTMLMgMenuItemElement = page.doc.querySelector('mg-menu-item mg-menu-item');

        expect(item).toHaveProperty('status', status);
        expect(childItem).toHaveProperty('status', status);

        childItem.status = nextStatus;

        await page.waitForChanges();

        expect(item).toHaveProperty('status', nextStatus);
        expect(childItem).toHaveProperty('status', nextStatus);
      });
    });

    describe('item-loaded', () => {
      test('Should emit "item-loaded" event at the end of the render process', async () => {
        const page = await getPage(menuItem({ label: 'Batman' }));

        expect(page.rootInstance.itemLoaded.emit).toHaveBeenCalled();
      });
    });
  });

  describe('MutationObserver', () => {
    test.each([true, false])('should update notification badge with args %s', async badge => {
      const page = await getPage(menuItem({ label: 'Batman' }, childMenu({ label: 'child menu', badge })));

      spyOn(page.rootInstance, 'updateDisplayNotificationBadge');

      expect(page.rootInstance.updateDisplayNotificationBadge).not.toHaveBeenCalled();

      fireMo[2]([]);
      await page.waitForChanges();

      expect(page.rootInstance.updateDisplayNotificationBadge).toHaveBeenCalledTimes(1);
      expect(page.root).toMatchSnapshot();
    });

    test.each([
      { from: Status.ACTIVE, to: Status.VISIBLE },
      { from: Status.VISIBLE, to: Status.ACTIVE },
    ])('Should update status with child title "attribute" mutation, from status %s', async ({ from, to }) => {
      const page = await getPage(menuItem({ label: 'Batman', status: from }, childMenu({ label: 'child menu', status: to })));

      const menuItemElement = page.doc.querySelector('mg-menu-item');
      const childMenuItemElement = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item') as HTMLMgMenuItemElement;

      expect(menuItemElement).toHaveProperty('status', to === Status.ACTIVE ? to : from);
      expect(childMenuItemElement).toHaveProperty('status', to);

      childMenuItemElement.setAttribute('hidden', '');
      fireMo[0]([{ attributeName: 'hidden' }]);

      await page.waitForChanges();

      expect(menuItemElement).toHaveProperty('status', from);
      expect(page.root).toMatchSnapshot();
    });

    test.each(['label', 'metadata'])('Should update status with child "characterData" mutation, from status %s', async slot => {
      const to = 'joker';
      const from = name => `my ${name}`;
      const page = await getPage(menuItem({ label: slot === 'label' ? from(slot) : 'Label', metadata: slot === 'metadata' }));

      const menuItemSlotElement = page.doc.querySelector(`mg-menu-item [slot="${slot}"]`);

      expect(menuItemSlotElement).toHaveProperty('title', from(slot));

      menuItemSlotElement.textContent = to;
      fireMo[0]([{ type: 'characterData' }]);

      await page.waitForChanges();

      expect(menuItemSlotElement).toHaveProperty('title', to);
      expect(page.root).toMatchSnapshot();
    });

    test('Should update display notifiaction badge with "attribute" mutation, from status %s', async () => {
      const page = await getPage(menuItem({ label: 'batman' }, childMenu({ label: 'submenu', badge: true })));

      const mgMenuItem = page.doc.querySelector(`mg-menu-item`);
      const badgeNotification = mgMenuItem.querySelector('[slot="information"]');

      expect(mgMenuItem).toHaveProperty('hidden', false);
      expect(badgeNotification).not.toBe(null);
      expect(page.root).toMatchSnapshot();

      const childMenuItem = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item');
      childMenuItem.setAttribute('hidden', 'true');
      fireMo[2]([{ type: 'attributes' }]);

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
