import { KeyInput } from 'puppeteer';
import { createPage, renderAttributes, renderProperties } from '../../../../utils/e2e.test.utils';
import { createID } from '../../../../utils/components.utils';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';

const createHTML = (args, id = `mg-action-more-${createID()}`) =>
  `<mg-action-more ${renderAttributes(args)} id="${id}" style="margin-left: 2rem;"></mg-action-more><script>${renderProperties(args, `#${id}`)}</script>`;

const mouseEventHandler = () => 'hello batman';

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
    href: '#',
  },
];

describe('mg-action-more', () => {
  describe('render', () => {
    test('should render', async () => {
      const html = [
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
          icon: {
            icon: 'plus',
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
      ]
        .map(args => `<div>${createHTML(args)}</div>`)
        .join('');

      const page = await createPage(`<h1>mg-action-more</h1>${html}`);

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test.each(['mouse', 'keyboard'])('should toggle button menu, case %s', async navigation => {
      const page = await createPage(createHTML({ items }), { width: 150, height: 250 });

      let screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      if (navigation === 'mouse') {
        const mgButton = await page.find('mg-action-more >>> mg-button');
        await mgButton.click();
        await page.waitForChanges();

        screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

        const mgMenuItem = await page.find('mg-action-more >>> mg-menu-item');
        await mgMenuItem.triggerEvent('click');
        await page.waitForChanges();

        screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      } else {
        for await (const key of ['Tab', 'Enter', 'Tab', 'Enter']) {
          await page.keyboard.press(key as unknown as KeyInput);
          await page.waitForChanges();

          screenshot = await page.screenshot();
          expect(screenshot).toMatchImageSnapshot();
        }
      }
    });

    test('should toggle button chevron menu', async () => {
      const page = await createPage(
        `${createHTML({
          items,
          displayChevron: true,
          button: {
            isIcon: false,
            variant: 'secondary',
          },
        })}`,
        { width: 150, height: 250 },
      );

      let screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      const mgButton = await page.find('mg-action-more >>> mg-button');
      await mgButton.click();

      await page.waitForChanges();
      await page.waitForTimeout(300); // wait chevron animation ended

      screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
