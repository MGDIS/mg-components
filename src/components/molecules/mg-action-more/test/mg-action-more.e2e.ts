import { KeyInput } from 'puppeteer';
import { createPage, renderAttributes } from '../../../../utils/e2e.test.utils';
import { createID } from '../../../../utils/components.utils';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';

const createHTML = (args, index = 0) => {
  const id = createID();
  const script = `<script>
const mgActionMore${index} = document.getElementById('${id}');
mgActionMore${index}.items = ${JSON.stringify(args.items)};
mgActionMore${index}.button = ${JSON.stringify(args.button)};
mgActionMore${index}.icon = ${JSON.stringify(args.icon)};
</script>`;
  return `<mg-action-more ${renderAttributes(args)}" id=${id}></mg-action-more>${script}`;
};

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
        .map((args, index) => `<div>${createHTML(args, index)}</div>`)
        .join('');

      const page = await createPage(`<h1>mg-action-more</h1>${html}`);

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test.each(['mouse', 'keyboard'])('should toggle button menu, case %s', async naviqation => {
      const page = await createPage(
        `${createHTML({
          items,
        })}`,
      );

      let screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.setViewport({ width: 150, height: 250 });

      if (naviqation === 'mouse') {
        const mgButton = await page.find('mg-action-more >>> mg-button');
        await mgButton.click();

        screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

        const mgMenuItem = await page.find('mg-action-more >>> mg-menu-item');
        await mgMenuItem.click();

        screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      } else {
        for await (const key of ['Tab', 'Enter', 'Tab', 'Enter']) {
          await page.keyboard.press(key as KeyInput);
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
      );

      let screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.setViewport({ width: 150, height: 250 });

      const mgButton = await page.find('mg-action-more >>> mg-button');
      await mgButton.click();

      await page.waitForTimeout(300); // wait chevron animation ended

      screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
