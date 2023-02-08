import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTabs } from '../mg-tabs';
import { sizes, Status } from '../mg-tabs.conf';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgTabs],
    template: () => <mg-tabs {...args}>{slots && slots.map(content => content && content())}</mg-tabs>,
  });

const createSlots = (slotNumber = 2) => {
  const slots = [];
  for (let i = 1; slotNumber > slots.length; i++) {
    slots.push(() => <div slot={`tab_content-${i}`}>{`Content ${i}`}</div>);
  }
  return slots;
};

const badge = { value: 2, label: 'messages' };

const key = { next: 'ArrowRight', prev: 'ArrowLeft' };

describe('mg-tabs', () => {
  describe.each(sizes)('template', size => {
    test.each([
      [['Batman', 'Joker', 'Bane']],
      [
        [
          { label: 'Batman', icon: 'check', badge },
          { label: 'Joker', icon: 'cross', badge: { ...badge, role: 'information' }, status: Status.DISABLED },
          { label: 'Bane', icon: 'trash', badge, status: Status.HIDDEN },
        ],
      ],
    ])('render', async items => {
      const { root } = await getPage({ label: 'Sample label', items, identifier: 'identifier', size }, createSlots(3));
      expect(root).toMatchSnapshot();
    });

    test('display only slots with name "tab_content-*"', async () => {
      const { root } = await getPage({ label: 'Sample label', items: ['Batman', 'Joker'], identifier: 'identifier' }, [...createSlots(), () => <div>dummy content</div>]);
      expect(root).toMatchSnapshot();
    });

    test.each([
      {
        items: ['Tab 1', 'Tab 2', 'Tab 3'],
        activeTab: 2,
      },
      {
        items: [{ label: 'Batman' }, { label: 'Joker', status: Status.ACTIVE }, { label: 'Bane' }],
      },
      {
        items: [{ label: 'Batman' }, { label: 'Joker' }, { label: 'Bane' }],
        activeTab: 2,
      },
      {
        items: [{ label: 'Batman' }, { label: 'Joker', status: Status.ACTIVE }, { label: 'Bane' }],
        activeTab: 2,
      },
      {
        items: [{ label: 'Batman' }, { label: 'Joker', status: Status.ACTIVE }, { label: 'Bane' }],
        activeTab: 3,
      },
    ])(`display ${size} tabs with activeProps set by props`, async props => {
      const { root } = await getPage({ label: 'Sample label', identifier: 'identifier', ...props }, createSlots(3));
      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each(['', ' ', undefined])('Should throw error with invalid label property: %s', async label => {
      expect.assertions(1);
      try {
        await getPage({ label, items: ['Batman', 'Joker'] }, createSlots());
      } catch (err) {
        expect(err.message).toMatch('<mg-tabs> prop "label" is required.');
      }
    });

    test.each([
      [undefined, 'batman'],
      [['batman', { batman: 'batman' }]],
      [[true, false]],
      [[1, 2, 3]],
      [[true, 1, 'batman']],
      [[{ label: 'batman', icon: 'batman' }, { batman: 'batman' }]],
      [[{ label: undefined, icon: 'batman' }, { label: 'batman' }]],
    ])('Should throw error with invalid items property', async items => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Sample label', items }, createSlots());
      } catch (err) {
        expect(err.message).toMatch('<mg-tabs> prop "items" is required and all items must be the same type: TabItem.');
      }
    });

    test.each([[[]], [createSlots(1)], [[undefined, createSlots(2)[1]], [createSlots(3)]]])('should trown an error with invalid slots', async slots => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'] }, slots);
      } catch (err) {
        expect(err.message).toMatch('<mg-tabs> Must have slots counts equal to tabs count.');
      }
    });

    test.each([0, 3])('should trown an error with invalid tabItem props', async activeTab => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'], activeTab }, createSlots());
      } catch (err) {
        expect(err.message).toMatch('<mg-tabs> prop "activeTab" must be between 1 and tabs length.');
      }
    });

    test('should trown an error with invalid tabItem props', async () => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'], size: 'batman' }, createSlots());
      } catch (err) {
        expect(err.message).toMatch(`<mg-tabs> prop "size" must be one of: ${sizes.join(', ')}`);
      }
    });
  });

  describe('navigation', () => {
    test.each([[['batman', 'joker']], [[{ label: 'Batman' }, { label: 'Joker' }]]])('should go to next tab on click event', async items => {
      const page = await getPage({ label: 'Sample label', items, identifier: 'id' }, createSlots());
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      let activeTab = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      const nextTab = element.shadowRoot.getElementById('id-2');
      nextTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(2);

      activeTab = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
    });

    test.each([Status.HIDDEN, Status.DISABLED])('should prevent click on tab with status %s', async status => {
      const page = await getPage({ label: 'Sample label', items: [{ label: 'Batman' }, { label: 'Joker', status }], identifier: 'id' }, createSlots());
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      let activeTab = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      const nextTab = element.shadowRoot.getElementById('id-2');
      nextTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.activeTabChange.emit).not.toHaveBeenCalled();

      activeTab = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
    });

    test('should go to next tab on keyboard event', async () => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, createSlots());
      const activeTabChangeSpy = jest.spyOn(page.rootInstance.activeTabChange, 'emit');
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      const buttons = Array.from(element.shadowRoot.querySelectorAll('button'));
      buttons.forEach(button => {
        button.focus = jest.fn();
      });

      let activeTab: HTMLElement = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));

      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();

      for await (const action of [
        { key: key.next, from: 0, to: 1 },
        { key: key.next, from: 1, to: 0 },
        { key: key.prev, from: 0, to: 1 },
        { key: key.prev, from: 1, to: 0 },
      ]) {
        element.shadowRoot.querySelector(`[data-index="${action.from + 1}"]`).dispatchEvent(new KeyboardEvent('keydown', { key: action.key }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        activeTab = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
        expect(activeTab).toHaveProperty('id', 'id-1');
        expect(buttons[action.to].focus).toHaveBeenCalledTimes(action.key === key.next ? 1 : 2);
        expect(activeTabChangeSpy).not.toHaveBeenCalled();
      }
    });

    test.each([Status.HIDDEN, Status.DISABLED])('should go to next VISIBLE tab on keyboard event', async status => {
      const page = await getPage({ label: 'Sample label', items: [{ label: 'Batman' }, { label: 'Joker' }, { label: 'Bane', status }], identifier: 'id' }, createSlots(3));
      const activeTabChangeSpy = jest.spyOn(page.rootInstance.activeTabChange, 'emit');
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      const buttons = Array.from(element.shadowRoot.querySelectorAll('button'));
      buttons.forEach(button => {
        button.focus = jest.fn();
      });

      let activeTab: HTMLElement = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();

      await page.waitForChanges();

      for await (const actions of [
        [
          { key: key.next, from: 0, to: 1 },
          { key: key.next, from: 1, to: 2 },
        ],
        [{ key: key.prev, from: 0, to: 2 }],
      ]) {
        for await (const action of actions) {
          element.shadowRoot.querySelector(`[data-index="${action.from + 1}"]`).dispatchEvent(new KeyboardEvent('keydown', { key: action.key }));
          await page.waitForChanges();

          expect(page.root).toMatchSnapshot();

          activeTab = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');
          expect(activeTab).toHaveProperty('id', 'id-1');
          if (action.to === 2) {
            const button = buttons[action.key === key.next ? action.from - 1 : action.from + 1];
            if (status === Status.HIDDEN) {
              expect(buttons[action.to].focus).not.toHaveBeenCalled();
              expect(button.focus).toHaveBeenCalledTimes(action.key === key.next ? 1 : 2);
            } else {
              expect(buttons[action.to].focus).toHaveBeenCalledTimes(action.key === key.next ? 1 : 2);
              if (action.key === key.next) {
                expect(button.focus).not.toHaveBeenCalled();
              } else {
                expect(button.focus).toHaveBeenCalledTimes(1);
              }
            }
          } else {
            expect(buttons[action.to].focus).toHaveBeenCalledTimes(1);
          }
          expect(activeTabChangeSpy).not.toHaveBeenCalled();
        }
      }
    });

    test('should manage Tab key', async () => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, createSlots());
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      const spys = Array.from(element.shadowRoot.querySelectorAll('button')).map(button => jest.spyOn(button, 'setAttribute'));

      const activeTab: HTMLElement = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(spys[0]).toHaveBeenCalledTimes(2);
      expect(spys[0]).toHaveBeenLastCalledWith('tabindex', '0');
      expect(spys[1]).toHaveBeenCalledTimes(2);
      expect(spys[1]).toHaveBeenLastCalledWith('tabindex', '-1');

      expect(page.root).toMatchSnapshot();
    });

    test('should manage mixed navigation', async () => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, createSlots());
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      const spys = Array.from(element.shadowRoot.querySelectorAll('button')).map(button => jest.spyOn(button, 'setAttribute'));

      const activeTab: HTMLElement = element.shadowRoot.querySelector('.mg-tabs__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(spys[0]).toHaveBeenCalledTimes(2);
      expect(spys[0]).toHaveBeenLastCalledWith('tabindex', '0');
      expect(spys[1]).toHaveBeenCalledTimes(2);
      expect(spys[1]).toHaveBeenLastCalledWith('tabindex', '-1');

      expect(page.root).toMatchSnapshot();
    });
  });
});
