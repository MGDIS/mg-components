import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTabs } from '../mg-tabs';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgTabs],
    template: () => <mg-tabs {...args}>{slots && slots.map(content => content && content())}</mg-tabs>,
  });

const defaultSlots = [() => <div slot="tab_content-1">Content 1</div>, () => <div slot="tab_content-2">Content 2</div>];

describe('mg-tabs', () => {
  describe('template', () => {
    test.each([
      [['Batman', 'Joker']],
      [
        [
          { label: 'Batman', icon: 'check', badge: 2 },
          { label: 'Joker', icon: 'cross', badge: 2 },
        ],
      ],
    ])('render', async tabs => {
      const page = await getPage({ tabs, identifier: 'identifier' }, defaultSlots);
      expect(page).toMatchSnapshot();
    });

    test('display only slots with name "tab_content-*"', async () => {
      const page = await getPage({ tabs: ['Batman', 'Joker'], identifier: 'identifier' }, [...defaultSlots, () => <div>dummy content</div>]);
      expect(page).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each([
      [undefined, 'batman'],
      [['batman', { batman: 'batman' }]],
      [[true, false]],
      [[1, 2, 3]],
      [[true, 1, 'batman']],
      [[{ label: 'batman', icon: 'batman' }, { batman: 'batman' }]],
      [[{ label: undefined, icon: 'batman' }, { label: 'batman' }]],
    ])('Should throw error with invalid tabs property', async tabs => {
      try {
        await getPage({ tabs }, defaultSlots);
      } catch (error) {
        expect(error.message).toMatch('<mg-tabs> prop "tabs" is required and all items must be the same type: TabItem.');
      }
    });

    test.each([[[]], [[defaultSlots[0]]], [[undefined, defaultSlots[1]], [[...defaultSlots, defaultSlots[0]]]]])('should trown an error with invalid slots', async slots => {
      try {
        await getPage({ tabs: ['Tab 1', 'Tab 2'] }, slots);
      } catch (error) {
        expect(error.message).toMatch('<mg-tabs> Must have slots counts equal to tabs count.');
      }
    });
  });

  describe('navigation', () => {
    test('should go to next tab on click event', async () => {
      const page = await getPage({ tabs: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');

      let activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-0');

      const nextTab = element.querySelector('#id-1');
      nextTab.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
    });

    test.each([
      { next: 'ArrowRight', prev: 'ArrowLeft' },
      { next: 'ArrowDown', prev: 'ArrowUp' },
    ])('should go to next tab on keyboard event', async key => {
      const page = await getPage({ tabs: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      element.querySelectorAll('li').forEach(li => (li.focus = jest.fn()));

      let activeTab: HTMLLIElement = element.querySelector('.mg-tabs-links__link--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
      expect(activeTab.focus).toHaveBeenCalled();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.prev }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-0');
      expect(activeTab.focus).toHaveBeenCalled();
    });

    test.each([
      { next: 'ArrowRight', prev: 'ArrowRight' },
      { next: 'ArrowDown', prev: 'ArrowDown' },
    ])("should go to next tab, and key focus if it's the last one on keyboard event", async key => {
      const page = await getPage({ tabs: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      element.querySelectorAll('li').forEach(li => (li.focus = jest.fn()));

      let activeTab: HTMLLIElement = element.querySelector('.mg-tabs-links__link--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.next }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key.prev }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-1');
      expect(activeTab.focus).toHaveBeenCalledTimes(1);
    });

    test.each(['Space', 'Enter'])('should NOT go to next tab one on keyboard event %s', async key => {
      const page = await getPage({ tabs: ['batman', 'joker'], identifier: 'id' }, defaultSlots);
      expect(page).toMatchSnapshot();

      const element = page.doc.querySelector('mg-tabs');
      element.querySelectorAll('li').forEach(li => (li.focus = jest.fn()));

      let activeTab: HTMLLIElement = element.querySelector('.mg-tabs-links__link--active');

      activeTab.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
      await page.waitForChanges();

      expect(page).toMatchSnapshot();

      activeTab = element.querySelector('.mg-tabs-links__link--active');
      expect(activeTab).toHaveProperty('id', 'id-0');
      expect(activeTab.focus).not.toHaveBeenCalled();
    });
  });
});
