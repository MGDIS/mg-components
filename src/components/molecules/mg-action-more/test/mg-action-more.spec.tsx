import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';
import { MgActionMore } from '../mg-action-more';

const getPage = args =>
  newSpecPage({
    components: [MgActionMore],
    template: () => <mg-action-more {...args}></mg-action-more>,
  });

const mouseEventHandler = jest.fn();

const items = [
  {
    label: 'batman',
    mouseEventHandler,
  },
  {
    label: 'robin',
    mouseEventHandler,
    status: Status.HIDDEN,
  },
  {
    label: 'joker',
    mouseEventHandler,
    badge: {
      value: 2,
      label: 'badge',
    },
  },
  {
    label: 'bane',
    mouseEventHandler,
    icon: 'user',
  },
];

describe('mg-action-more', () => {
  describe.each([
    {
      items,
    },
    {
      items,
      button: {
        label: 'dc-comics',
        variant: 'primary',
        isIcon: false,
      },
    },
    {
      items,
      displayChevron: true,
      button: {
        variant: 'flat',
        isIcon: false,
      },
    },
  ])('render', args => {
    test(`Should render with args ${args}`, async () => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    });

    test('Should toggle menu on click', async () => {
      const page = await getPage(args);
      expect(page.root).toMatchSnapshot();

      const mgMoreAction = page.doc.querySelector('mg-action-more');
      const mgButton = mgMoreAction.shadowRoot.querySelector('mg-button');
      mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each([
      { args: {}, error: `<mg-action-more> prop "item" is required and all values must be the same type, MgActionMoreItemType.` },
      { args: { items: ['batman'] }, error: `<mg-action-more> prop "item" is required and all values must be the same type, MgActionMoreItemType.` },
      { args: { items: [{ label: 'batman' }] }, error: `<mg-action-more> prop "item" is required and all values must be the same type, MgActionMoreItemType.` },
      {
        args: { items: [{ label: 'batman', mouseEventHandler: 'batman' }] },
        error: `<mg-action-more> prop "item" is required and all values must be the same type, MgActionMoreItemType.`,
      },
      { args: { items: [{ mouseEventHandler: 'batman' }] }, error: `<mg-action-more> prop "item" is required and all values must be the same type, MgActionMoreItemType.` },
      { args: { items: [{ label: 'batman', mouseEventHandler }], button: {} }, error: `<mg-action-more> prop button must match MgActionMoreButtonType.` },
      { args: { items: [{ label: 'batman', mouseEventHandler }], button: { variant: 'primary' } }, error: `<mg-action-more> prop button must match MgActionMoreButtonType.` },
      { args: { items: [{ label: 'batman', mouseEventHandler }], button: { isIcon: true } }, error: `<mg-action-more> prop button must match MgActionMoreButtonType.` },
      { args: { items: [{ label: 'batman', mouseEventHandler }], icon: 'user' }, error: `<mg-action-more> prop icon must match MgActionMoreIconType.` },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], displayChevron: true },
        error: `<mg-action-more> prop "displayChevron" can't be used with a 'button" prop "isIcon" attribute.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], button: { isIcon: true, variant: 'flat' }, displayChevron: true },
        error: `<mg-action-more> prop "displayChevron" can't be used with a 'button" prop "isIcon" attribute.`,
      },
    ])('with args %s', async ({ args, error }) => {
      expect.assertions(1);
      try {
        await getPage(args);
      } catch (err) {
        expect(err.message).toMatch(error);
      }
    });
  });

  describe('navigation', () => {
    test(`Should run item mouseEventHandler by clicking on menu-item`, async () => {
      const page = await getPage({ items });
      expect(page.root).toMatchSnapshot();

      const mgMoreAction = page.doc.querySelector('mg-action-more');
      const mgButton = mgMoreAction.shadowRoot.querySelector('mg-button');
      mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgMenuItem = mgMoreAction.shadowRoot.querySelector('mg-menu-item');
      mgMenuItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(mouseEventHandler).toHaveBeenCalled();
      expect(page.root).toMatchSnapshot();
    });
  });
});
