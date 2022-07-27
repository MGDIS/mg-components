import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTabs } from '../mg-nav';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgTabs],
    template: () => <mg-nav {...args}>{slots && slots.map(content => content && content())}</mg-nav>,
  });

const badge = { value: 2, label: 'messages' };

const key = { next: 'ArrowRight', prev: 'ArrowLeft' };

describe('mg-nav', () => {
  describe('template', () => {
    test.each([
      [['Batman', 'Joker', 'Bane']],
      [
        [
          { label: 'Batman', icon: 'check', badge },
          { label: 'Joker', icon: 'cross', badge, status: 'disabled' },
          { label: 'Bane', icon: 'trash', badge, status: 'hidden' },
        ],
      ],
    ])('render', async items => {
      const { root } = await getPage({ label: 'Sample label', items, identifier: 'identifier' });
      expect(root).toMatchSnapshot();
    });

    test('display only slots with name "tab_content-*"', async () => {
      const { root } = await getPage({ label: 'Sample label', items: ['Batman', 'Joker'], identifier: 'identifier' });
      expect(root).toMatchSnapshot();
    });

    test('display tabs with activeProps set by props', async () => {
      const { root } = await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2', 'Tab 3'], identifier: 'identifier', activeTab: 2 });
      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each(['', undefined])('Should throw error with invalid label property : %s', async value => {
      try {
        await getPage({ label: value, items: ['Batman', 'Joker'] });
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "label" is required');
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
      try {
        await getPage({ label: 'Sample label', items });
      } catch (error) {
        expect(error.message).toMatch('<mg-nav> prop "items" is required and all items must be the same type: TabItem.');
      }
    });

    test.each([0, 3])('should trown an error with invalid tabItem props', async activeTab => {
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'], activeTab });
      } catch (error) {
        expect(error.message).toMatch('<mg-nav> prop "activeTab" must be between 1 and tabs length.');
      }
    });

    test('should trown an error with invalid tabItem props', async () => {
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'], size: 'batman' });
      } catch (error) {
        expect(error.message).toMatch(`<mg-nav> prop "size" must be one of : ${sizes.join(', ')}`);
      }
    });
  });

  describe('navigation', () => {
    test('should go to next tab on click event', async () => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      let activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      const nextTab = page.doc.querySelector('#id-2');
      nextTab.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(2);

      activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
    });

    test('should go to next tab on click event', async () => {
      const page = await getPage({
        items: [
          { label: 'Batman', icon: 'check', badge },
          { label: 'Joker', icon: 'cross', badge },
        ],
        identifier: 'id',
      });
      expect(page.root).toMatchSnapshot();

      let activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      const nextTab = page.doc.querySelector('#id-2 mg-icon');
      nextTab.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(2);

      activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
    });

    test('should go to next tab on keyboard event', async () => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      page.doc.querySelectorAll('button').forEach(button => (button.focus = jest.fn()));

      let activeTab: HTMLLIElement = page.doc.querySelector('.mg-nav__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(2);

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.prev }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(1);
    });

    test.each(['hidden', 'disabled'])("should go to next visible tab, and keep focus if it's the last one on keyboard event", async status => {
      const items = [
        { label: 'Batman', status: 'visible' },
        { label: 'Batman', status: 'visible' },
        { label: 'Batman', status },
      ];
      const page = await getPage({ label: 'Sample label', items, identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      page.doc.querySelectorAll('button').forEach(button => (button.focus = jest.fn()));

      let activeTab: HTMLLIElement = page.doc.querySelector('.mg-nav__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(2);

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.activeTabChange.emit).toHaveBeenCalledWith(2);
    });

    test.each(['Space', 'Enter'])('should NOT go to next tab on keyboard event %s', async key => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-nav');
      element.querySelectorAll('button').forEach(button => (button.focus = jest.fn()));

      let activeTab: HTMLLIElement = element.querySelector('.mg-nav__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      jest.spyOn(page.rootInstance.activeTabChange, 'emit');

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = element.querySelector('.mg-nav__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
      expect(page.rootInstance.activeTabChange.emit).not.toHaveBeenCalled();
    });
  });
});
