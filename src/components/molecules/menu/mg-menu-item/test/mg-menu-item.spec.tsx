import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBadge } from '../../../../atoms/mg-badge/mg-badge';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import { MgMenu } from '../../mg-menu/mg-menu';
import { sizes, Status } from '../mg-menu-item.conf';
import { setupResizeObserverMock } from '../../../../../utils/unit.test.utils';

const menu = (label = 'child-menu', slots) => <mg-menu label={label}>{slots}</mg-menu>;
const menuItem = (args, slot?) => (
  <mg-menu-item {...args}>
    {slot}
    {args.label && <span slot="label">{args.label}</span>}
    {args.metadata && <span slot="metadata">my metadata</span>}
    {args.icon && <mg-icon slot="illustration" icon="user"></mg-icon>}
    {args.badge && <mg-badge slot="information" label="badge label" value="1"></mg-badge>}
  </mg-menu-item>
);
const childMenu = (args: { label: string; status?: MgMenuItem['status'] } = { label: 'child menu item' }, slots?) => menu('child menu', menuItem(args, slots));
const templateDefault = (args, slots?) => menu('menu', menuItem(args, slots));
const templateTwoMenuItems = (args, slots?) => menu('menu', [menuItem(args, slots), menuItem({ label: 'item 2' })]);

const getPage = async template => {
  const page = await newSpecPage({
    components: [MgMenuItem, MgMenu, MgIcon, MgBadge],
    template: () => template,
  });

  jest.runAllTimers();
  await page.waitForChanges();

  return page;
};

describe('mg-menu-item', () => {
  let fireMo;
  beforeEach(() => {
    jest.useFakeTimers();
    setupResizeObserverMock({
      observe: function () {
        fireMo = this.cb;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: [],
    });
  });
  afterEach(() => jest.runOnlyPendingTimers());
  describe('render', () => {
    test.each([{ label: 'Batman' }, { label: 'Batman', icon: true }, { label: 'Batman', badge: true }, { label: 'Batman', metadata: true }, { label: 'Batman', href: '#link' }])(
      'with args %s',
      async args => {
        const { root } = await getPage(templateDefault(args));

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

    test.each(sizes)('with size %s', async sizes => {
      const { root } = await getPage(templateDefault({ label: 'Batman', sizes }));

      expect(root).toMatchSnapshot();
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

    test('throw errors missing arg identifier %s', async () => {
      expect.assertions(1);

      try {
        await getPage(templateDefault({ label: 'label', size: ' ' }));
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "size" must be one of : regular, medium, large.');
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
});
