import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenu } from '../mg-menu';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';

const getPage = async (args, withSubmenu = true) => {
  const page = await newSpecPage({
    components: [MgMenu, MgMenuItem],
    template: () => (
      <mg-menu {...args}>
        <mg-menu-item>
          <span slot="label">batman</span>
          {withSubmenu && (
            <mg-menu label="batman - submenu">
              <mg-menu-item>
                <span slot="label">batman begins</span>
                <mg-menu label="batman begins - submenu">
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

  jest.runAllTimers();
  await page.waitForChanges();

  return page;
};

describe('mg-menu', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
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
    test('should manage outside click', async () => {
      const page = await getPage({ label: 'batman menu', direction });

      expect(page.root).toMatchSnapshot();

      const firstItem: HTMLMgMenuItemElement = page.root.querySelector('[title="batman"]').closest('mg-menu-item');

      firstItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each(['click', 'focus'])(`should manage sibling menu-item expanded props in ${direction} menu, case %s event`, async event => {
      const page = await getPage({ label: 'batman menu', direction });

      expect(page.root).toMatchSnapshot();

      // open batman item
      const batmanItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="batman"]').closest('mg-menu-item');

      batmanItem.shadowRoot.querySelector('button').dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

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
