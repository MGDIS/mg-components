import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenu } from '../mg-menu';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgMenu, MgMenuItem],
    template: () => (
      <mg-menu {...args}>
        <mg-menu-item identifier="1" label="batman">
          <mg-menu label="batman - submenu">
            <mg-menu-item identifier="1-1" label="batman begins"></mg-menu-item>
            <mg-menu-item identifier="1-2" label="joker: the dark knight"></mg-menu-item>
            <mg-menu-item identifier="1-3" label="bane: the dark knight rise"></mg-menu-item>
          </mg-menu>
        </mg-menu-item>
        <mg-menu-item identifier="2" label="joker">
          <div>
            <h2>This is a joker card</h2>
            <p>If you don't know the joker, you can watch the movie.</p>
          </div>
        </mg-menu-item>
        <mg-menu-item identifier="3" label="bane"></mg-menu-item>
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
    test('should manage focused-item event in %s menu', async () => {
      const args = { label: 'batman menu', direction };
      const page = await getPage(args);

      expect(page.root).toMatchSnapshot();

      // click on last item
      const lastItem = page.root.querySelector('mg-menu-item:last-of-type') as HTMLMgMenuItemElement;

      lastItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      lastItem.dispatchEvent(new CustomEvent('focused-item', { bubbles: true, detail: lastItem.menuIndex }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // click on first item
      const firstItem = page.root.querySelector('mg-menu-item') as HTMLMgMenuItemElement;

      firstItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      firstItem.dispatchEvent(new CustomEvent('focused-item', { bubbles: true, detail: firstItem.menuIndex }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('should manage outside click', async () => {
      const args = { label: 'batman menu', direction };
      const page = await getPage(args);

      expect(page.root).toMatchSnapshot();

      const firstItem = page.root.querySelector('mg-menu-item:last-of-type');

      firstItem.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      document.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
