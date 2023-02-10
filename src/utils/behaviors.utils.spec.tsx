import { h } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenuItem } from '../components/molecules/menu/mg-menu-item/mg-menu-item';
import { MgMenu } from '../components/molecules/menu/mg-menu/mg-menu';
import { OverflowBehavior } from './behaviors.utils';
import { setupResizeObserverMock } from './unit.test.utils';

const getPage = args =>
  newSpecPage({
    components: [MgMenu, MgMenuItem],
    template: () => (
      <mg-menu {...args}>
        <mg-menu-item>
          <span slot="label">Batman</span>
        </mg-menu-item>
        <mg-menu-item>
          <span slot="label">Joker</span>
        </mg-menu-item>
        <mg-menu-item>
          <span slot="label">Bane</span>
        </mg-menu-item>
      </mg-menu>
    ),
  });

describe('behavior.utils', () => {
  describe('OverflowBehavior', () => {
    let fireRo;
    beforeEach(() => {
      jest.useFakeTimers();
      setupResizeObserverMock({
        observe: function () {
          fireRo = this.cb;
        },
        disconnect: function () {
          return null;
        },
      });
    });
    afterEach(() => jest.runOnlyPendingTimers());

    describe('render', () => {
      test.each([50, 80, 100, 250])('should manage resize with observer, case %s', async width => {
        const page = await getPage({ label: 'batman' });
        const element = page.doc.querySelector('mg-menu');

        const items = Array.from(page.doc.querySelectorAll('mg-menu-item'));
        items.forEach(item => {
          Object.defineProperty(item, 'offsetWidth', {
            get: jest.fn(() => 80),
          });
        });

        const createMenuItem = (label: string) => {
          const menuItem = page.doc.createElement('mg-menu-item');
          const span = page.doc.createElement('span');
          span.innerText = label;
          menuItem.appendChild(span);
          return menuItem;
        };
        const createMenu = (label: string) => {
          const menu = page.doc.createElement('mg-menu');
          menu.label = label;
          return menu;
        };
        const renderMoreElement = () => {
          const moreMenu = 'more menu';
          const moreElement = createMenuItem(moreMenu);
          const moreMenuElement = createMenu(moreMenu);
          moreMenuElement.appendChild(createMenuItem('proxy batman'));
          moreMenuElement.appendChild(createMenuItem('proxy joker'));
          moreMenuElement.appendChild(createMenuItem('proxy bane'));
          moreElement.appendChild(moreMenuElement);
          Object.defineProperty(moreElement, 'offsetWidth', {
            get: jest.fn(() => 50),
          });
          element.append(moreElement);
          return moreElement;
        };

        new OverflowBehavior(element, renderMoreElement);

        fireRo([{ contentRect: { width } }]);

        expect(page.root).toMatchSnapshot();
      });
    });

    test('should fire disconnect callback', () => {
      const behavior = new OverflowBehavior(<div></div>, () => <span></span>);
      const spy = jest.spyOn((behavior as any).resizeObserver, 'disconnect');
      behavior.disconnect();

      expect(spy).toHaveBeenCalled();
    });
  });
});
