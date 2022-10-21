import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import { MgMenu } from '../../mg-menu/mg-menu';
import { sizes, Status } from '../mg-menu-item.conf';

const defaultSlot = (args: Pick<MgMenuItem, 'identifier' | 'label' | 'status'> = { identifier: 'child', label: 'child', status: undefined }, slot?) => (
  <mg-menu label="child-menu">
    <mg-menu-item {...args}> {slot} </mg-menu-item>
  </mg-menu>
);

const getPage = async (args, withLastItem = false, withSlot?, slot?) => {
  const page = await newSpecPage({
    components: [MgMenuItem, MgMenu],
    template: () => (
      <mg-menu label="menu">
        <mg-menu-item {...args}>{withSlot && (slot || defaultSlot())}</mg-menu-item>
        {withLastItem && <mg-menu-item label="last-item" identifier="last-item"></mg-menu-item>}
      </mg-menu>
    ),
  });

  jest.runAllTimers();
  await page.waitForChanges();

  return page;
};

describe('mg-menu', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  describe('render', () => {
    test.each([
      { identifier: 'batman', label: 'batman' },
      { identifier: 'batman', label: 'batman', icon: { icon: 'user' } },
      { identifier: 'batman', label: 'batman', icon: { icon: 'user' }, badge: { value: 1, label: 1 } },
      { identifier: 'batman', label: 'batman', badge: { value: 1, label: 1 } },
      { identifier: 'batman', label: 'batman', href: '#link' },
    ])('with args %s', async args => {
      const { root } = await getPage(args);

      expect(root).toMatchSnapshot();
    });

    test('with 2 menu-items, last items get style modifier', async () => {
      const { root } = await getPage({ identifier: 'batman', label: 'batman' }, true);

      expect(root).toMatchSnapshot();
    });

    test.each([Status.ACTIVE, Status.DISABLED, Status.HIDDEN, Status.VISIBLE])('with status %s', async status => {
      const page = await getPage({ identifier: 'batman', label: 'batman', status });
      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.status = element.status === Status.ACTIVE ? Status.VISIBLE : Status.ACTIVE;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each(sizes)('with size %s', async sizes => {
      const { root } = await getPage({ identifier: 'batman', label: 'batman', sizes });

      expect(root).toMatchSnapshot();
    });

    test.each([undefined, 0, 5])('with menuIndex %s', async menuIndex => {
      const { root } = await getPage({ identifier: 'batman', label: 'batman', menuIndex });

      expect(root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('with expanded %s', async expanded => {
      const page = await getPage({ identifier: 'batman', label: 'batman', expanded });

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('with expanded and sub-menu %s', async expanded => {
      const page = await getPage({ identifier: 'batman', label: 'batman', expanded }, false, true);

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each([undefined, ' '])('throw errors missing arg identifier %s', async identifier => {
      expect.assertions(1);

      try {
        await getPage({ identifier, label: 'batman' });
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "identifier" is required.');
      }
    });
    test.each([undefined, ' '])('throw errors missing arg identifier %s', async label => {
      expect.assertions(1);

      try {
        await getPage({ identifier: 'batman', label });
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "label" is required.');
      }
    });

    test('throw errors missing arg identifier %s', async () => {
      expect.assertions(1);

      try {
        await getPage({ identifier: 'batman', label: 'label', size: ' ' });
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "size" must be one of : regular, medium, large.');
      }
    });

    test('with expanded and sub-menu %s', async () => {
      expect.assertions(1);

      try {
        await getPage({ identifier: 'batman', label: 'label', href: '#link' }, false, true);
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "href" is unauthorizied when element is a parent.');
      }
    });
  });

  describe.each([
    expanded => getPage({ identifier: 'batman', label: 'batman', expanded }),
    expanded => getPage({ identifier: 'batman', label: 'batman', expanded }, false, true),
    expanded =>
      getPage(
        { identifier: 'batman', label: 'batman', expanded },
        false,
        true,
        defaultSlot(undefined, defaultSlot({ identifier: 'child', label: 'child', status: Status.ACTIVE })),
      ),
  ])('mouse navigation', template => {
    test.each([undefined, true, false])('should manage toggle expand with template %s', async expanded => {
      const page = await template(expanded);

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.shadowRoot.querySelector('*').dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('keyboard navigation', () => {
    test('should manage keyboard navigation', async () => {
      const page = await getPage({ identifier: 'batman', label: 'batman' }, false, true);
      const interactiveElement = page.doc.querySelector('mg-menu-item').shadowRoot.querySelector('*');

      expect(page.root).toMatchSnapshot();

      // focus on fist menu-item
      interactiveElement.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // expand fist menu-item
      interactiveElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // close fist menu-item
      interactiveElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
