import { h } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { setupMutationObserverMock, setupResizeObserverMock } from '../../../../utils/unit.test.utils';
import { MgItemMore } from '../mg-item-more';
import { MgMenuItem } from '../../menu/mg-menu-item/mg-menu-item';
import { MgMenu } from '../../menu/mg-menu/mg-menu';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgMenu, MgMenuItem, MgItemMore],
    template: () => (
      <mg-menu {...args}>
        <mg-menu-item href={args.isHref ? '#' : undefined} id={args.hasId ? 'my-id-1' : undefined}>
          <span slot="label">Batman</span>
        </mg-menu-item>
        <mg-menu-item id={args.hasId ? 'my-id-2' : undefined}>
          <span slot="label">Joker</span>
        </mg-menu-item>
        <mg-menu-item id={args.hasId ? 'my-id-3' : undefined}>
          <span slot="label">Bane</span>
        </mg-menu-item>
      </mg-menu>
    ),
  });

  jest.runAllTimers();

  await page.waitForChanges();

  return page;
};

describe('mg-item-more', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
    setupMutationObserverMock({
      disconnect: () => null,
      observe: () => null,
      takeRecords: () => null,
    });
  });
  afterEach(() => jest.runOnlyPendingTimers());

  describe('render', () => {
    test.each([undefined, { icon: { icon: 'user' } }, { slotlabel: { display: true, label: 'more batman menu' } }, { size: 'large' }, { hasId: true }])(
      'should manage resize with observer, case %s',
      async args => {
        const page = await getPage({ label: 'batman', ...args });

        expect(page.root).toMatchSnapshot();
      },
    );
  });

  describe('errors', () => {
    test.each([
      { props: { itemmore: { size: {} } }, error: '<mg-item-more> prop "size" must match MgItemMore[\'size\'] type' },
      { props: { itemmore: { icon: '' } }, error: '<mg-item-more> prop "icon" must match MgItemMore[\'icon\'] type' },
      { props: { itemmore: { icon: { icon: undefined } } }, error: '<mg-item-more> prop "icon" must match MgItemMore[\'icon\'] type' },
      { props: { itemmore: { slotlabel: {} } }, error: '<mg-item-more> prop "slotlabel" must match MgItemMore[\'slotlabel\'] type' },
      { props: { itemmore: { slotlabel: { label: undefined } } }, error: '<mg-item-more> prop "slotlabel" must match MgItemMore[\'slotlabel\'] type' },
      { props: { itemmore: { slotlabel: { display: '' } } }, error: '<mg-item-more> prop "slotlabel" must match MgItemMore[\'slotlabel\'] type' },
    ])('should throw an error, case %s', async ({ props, error }) => {
      expect.assertions(1);

      try {
        await getPage({ label: 'batman', ...props });
      } catch (err) {
        expect(err.message).toMatch(error);
      }
    });
  });

  describe('events', () => {
    test('should update proxy status when base item status-change event was trigger', async () => {
      const page = await getPage({ label: 'batman' });

      expect(page.root).toMatchSnapshot();

      const mgMenuItemBase = page.doc.querySelector('mg-menu-item');
      const mgMenuItemProxy = page.doc.querySelector('mg-item-more').shadowRoot.querySelector('mg-menu mg-menu-item');
      expect(mgMenuItemProxy).toHaveProperty('status', Status.VISIBLE);
      mgMenuItemBase.dispatchEvent(new CustomEvent('status-change', { bubbles: true, detail: Status.ACTIVE }));

      await page.waitForChanges();
      expect(mgMenuItemProxy).toHaveProperty('status', Status.ACTIVE);
      expect(page.root).toMatchSnapshot();
    });

    test.each([false, true])('should trigger base item click event when proxy item was clicked', async isHref => {
      const page = await getPage({ label: 'batman', isHref });

      const mgMenuItemBase = page.doc.querySelector('mg-menu-item');
      const mgMenuItemProxy = page.doc.querySelector('mg-item-more').shadowRoot.querySelector('mg-menu mg-menu-item');
      const spy = jest.spyOn(mgMenuItemBase.shadowRoot.querySelector(isHref ? 'a' : 'button'), 'dispatchEvent');

      mgMenuItemProxy.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(spy).toBeCalledTimes(1);

      expect(page.root).toMatchSnapshot();
    });
  });

  test('should fire disconnect callback', async () => {
    const page = await getPage({ label: 'batman' });

    expect(page.root).toMatchSnapshot();

    page.doc.querySelector('mg-item-more').remove();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
