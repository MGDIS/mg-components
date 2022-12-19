import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenu } from '../mg-menu';
import { Direction } from '../mg-menu.conf';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { mockPopperArrowError } from '../../../mg-popover/test/mg-popover.spec';

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

  Array.from(page.doc.querySelectorAll('mg-menu-item')).forEach((item, index) => {
    const popover = item.shadowRoot.querySelector('mg-popover');
    if (popover) {
      const id = `mg-popover-test_${index}`;
      popover.shadowRoot.querySelector('.mg-popover')?.setAttribute('id', id);
      item.shadowRoot.querySelector('button')?.setAttribute('aria-controls', id);
    }
  });

  return page;
};

describe('mg-menu', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.clearAllTimers());
  describe('render', () => {
    test.each([{ label: 'batman menu' }, { label: 'batman menu', direction: 'horizontal' }, { label: 'batman menu', direction: 'vertical' }])('with args %s', async args => {
      const { root } = await getPage(args);

      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test('Should throw error when missing label', async () => {
      const args = { direction: 'horizontal' };

      expect.assertions(1);

      try {
        await getPage(args);
      } catch (err) {
        expect(err.message).toMatch('<mg-menu> prop "label" is required.');
      }
    });

    test('Should throw error when direction has invalid value', async () => {
      const args = { label: 'batman menu', direction: 'test' };

      expect.assertions(1);

      try {
        await getPage(args);
      } catch (err) {
        expect(err.message).toMatch('<mg-menu> prop "direction" must be one of : horizontal, vertical.');
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
});
