import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTabs } from '../mg-tabs';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgTabs],
    template: () => <mg-tabs {...args}>{slots && slots.map(content => content && content())}</mg-tabs>,
  });

const defaultSlots = [() => <div slot="tab_content-1">Content 1</div>, () => <div slot="tab_content-2">Content 2</div>];

const badge = { value: 2, label: 'messages' };

describe('mg-tabs', () => {
  describe('template', () => {
    test.each([
      [['Batman', 'Joker']],
      [
        [
          { label: 'Batman', icon: 'check', badge },
          { label: 'Joker', icon: 'cross', badge },
        ],
      ],
    ])('render', async items => {
      const { root } = await getPage({ label: 'Sample label', items, identifier: 'identifier' }, defaultSlots);
      expect(root).toMatchSnapshot();
    });

    test('display only slots with name "tab_content-*"', async () => {
      const { root } = await getPage({ label: 'Sample label', items: ['Batman', 'Joker'], identifier: 'identifier' }, [...defaultSlots, () => <div>dummy content</div>]);
      expect(root).toMatchSnapshot();
    });

    test('display tabs with activeProps set by props', async () => {
      const { root } = await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2', 'Tab 3'], identifier: 'identifier', activeTab: 2 }, [...defaultSlots, defaultSlots[0]]);
      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each(['', undefined])('Should throw error with invalid label property : %s', async value => {
      try {
        await getPage({ label: value, items: ['Batman', 'Joker'] }, defaultSlots);
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
        await getPage({ label: 'Sample label', items }, defaultSlots);
      } catch (error) {
        expect(error.message).toMatch('<mg-tabs> prop "items" is required and all items must be the same type: TabItem.');
      }
    });

    test.each([[[]], [[defaultSlots[0]]], [[undefined, defaultSlots[1]], [[...defaultSlots, defaultSlots[0]]]]])('should trown an error with invalid slots', async slots => {
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'] }, slots);
      } catch (error) {
        expect(error.message).toMatch('<mg-tabs> Must have slots counts equal to tabs count.');
      }
    });

    test.each([0, 3])('should trown an error with invalid tabItem props', async activeTab => {
      try {
        await getPage({ label: 'Sample label', items: ['Tab 1', 'Tab 2'], activeTab }, defaultSlots);
      } catch (error) {
        expect(error.message).toMatch('<mg-tabs> prop "activeTab" must be between 1 and tabs length.');
      }
    });
  });

  describe('navigation', () => {
    test('should go to next tab on click event', async () => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page.root).toMatchSnapshot();

      let activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');

      const nextTab = page.doc.querySelector('#id-2');
      nextTab.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
    });

    test('should go to next tab on click event', async () => {
      const page = await getPage(
        {
          items: [
            { label: 'Batman', icon: 'check', badge },
            { label: 'Joker', icon: 'cross', badge },
          ],
          identifier: 'id',
        },
        defaultSlots,
      );
      expect(page.root).toMatchSnapshot();

      let activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');

      const nextTab = page.doc.querySelector('#id-2 mg-icon');
      nextTab.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
    });

    test('should go to next tab on keyboard event', async () => {
      const key = { next: 'ArrowRight', prev: 'ArrowLeft' };
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page.root).toMatchSnapshot();

      page.doc.querySelectorAll('button').forEach(button => (button.focus = jest.fn()));

      let activeTab: HTMLLIElement = page.doc.querySelector('.mg-tabs__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
      expect(activeTab.focus).toHaveBeenCalled();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.prev }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
      expect(activeTab.focus).toHaveBeenCalled();
    });

    test("should go to next tab, and keep focus if it's the last one on keyboard event", async () => {
      const key = { next: 'ArrowRight', prev: 'ArrowRight' };
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page.root).toMatchSnapshot();

      page.doc.querySelectorAll('button').forEach(button => (button.focus = jest.fn()));

      let activeTab: HTMLLIElement = page.doc.querySelector('.mg-tabs__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.prev }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = page.doc.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-2');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);
    });

    test.each(['Space', 'Enter'])('should NOT go to next tab on keyboard event %s', async key => {
      const page = await getPage({ label: 'Sample label', items: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      element.querySelectorAll('button').forEach(button => (button.focus = jest.fn()));

      let activeTab: HTMLLIElement = element.querySelector('.mg-tabs__navigation-button--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs__navigation-button--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
    });
  });
});
