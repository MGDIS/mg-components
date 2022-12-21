import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgActionMenu } from '../mg-action-menu';
import { setupResizeObserverMock } from '../../../../../utils/unit.test.utils';
import { MgBadge } from '../../../../atoms/mg-badge/mg-badge';

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgActionMenu, MgBadge],
    template: () => (
      <mg-action-menu {...args}>
        <ul>
          <li>
            <mg-button>Batman</mg-button>
          </li>
          <li>
            <mg-button>Joker</mg-button>
          </li>
          <li>
            <mg-button>
              Bane
              {args.badgeSlot && <mg-badge value="1" label="movies"></mg-badge>}
            </mg-button>
          </li>
        </ul>
      </mg-action-menu>
    ),
  });

  jest.runAllTimers();
  await page.waitForChanges();

  return page;
};

describe('mg-action-menu', () => {
  let fireMo;
  beforeEach(() => {
    jest.useFakeTimers();
    setupResizeObserverMock({
      observe: function () {
        fireMo = this.cb;
      },
      disconnect: function () {
        return null;
      },
      takeRecords: [],
    });
  });
  afterEach(() => jest.runOnlyPendingTimers());
  describe('render', () => {
    test.each([{}, { badgeSlot: true }])('should manage resize with observer, case %s', async args => {
      const menuSize = 100;
      const page = await getPage(args);
      expect(page.root).toMatchSnapshot();

      const spy = jest.spyOn(page.rootInstance, 'run');
      Object.defineProperty(page.doc.querySelector('ul'), 'offsetWidth', {
        get: jest.fn(() => menuSize),
      });
      Array.from(page.doc.querySelectorAll('li')).forEach(li => {
        Object.defineProperty(li, 'offsetWidth', {
          get: jest.fn(() => 80),
        });
      });

      expect(spy).not.toHaveBeenCalled();

      fireMo([{ contentRect: { width: menuSize }, target: { nodeName: 'UL' } }]);
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledWith(menuSize);
      expect(page.root).toMatchSnapshot();

      // fireMo([{ contentRect: { width: 800 }, target: { nodeName: 'UL' }}]);
      // await page.waitForChanges();

      // expect(spy).toHaveBeenCalledWith(800);
      // expect(page.root).toMatchSnapshot();
    });
  });

  test('should fire disconnect callback', async () => {
    const { root, doc } = await getPage({ label: 'batman menu' });

    expect(root).toMatchSnapshot();

    const mgActionMenu = doc.querySelector('mg-action-menu');

    mgActionMenu.remove();

    expect(root).toMatchSnapshot();
  });
});
