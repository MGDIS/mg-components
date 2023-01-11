import { createPage, renderAttributes } from '../../../../../utils/e2e.test.utils';
import { Direction } from '../../mg-menu/mg-menu.conf';
import { sizes, Status } from '../mg-menu-item.conf';

const slotContent = '<div><h3>Demo title</h3><p>some content</p></div>';
const slotMenuItem = '<mg-menu label="submenu"><mg-menu-item><span slot="label">Batman begins</span></mg-menu-item></mg-menu>';
const slotImage = '<mg-icon icon="user" slot="image"></mg-icon>';
const slotInformation = '<mg-badge value="2" label="hello" slot="information"></mg-badge>';
const slotMetadata = '<span slot="metadata">is a hero</span>';

const createHTML = (args, slot = '', direction = Direction.HORIZONTAL) => `
<mg-menu ${renderAttributes({ label: 'batmenu', direction })}">
  <mg-menu-item ${renderAttributes(args)}>
    <span slot="label">${args.href ? 'batman link' : 'batman'}</span>
    ${slot}
  </mg-menu-item>
</mg-menu>
`;

describe('mg-menu-item', () => {
  describe.each([Direction.HORIZONTAL, Direction.VERTICAL])('render', direction => {
    test('should render whith status', async () => {
      const html = [Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED]
        .map(status => {
          const template = [undefined, '#link']
            .map(href =>
              [true, false]
                .map(submenu => sizes.map(size => (submenu && href !== undefined ? '' : createHTML({ status, size, href }, submenu && slotMenuItem, direction))).join(''))
                .join(''),
            )
            .join('');
          return `<h2>${status}<h2/><div>${template}<div>`;
        })
        .join('');

      const page = await createPage(`<h1>${direction} mg-menu - Status</h1>` + html);

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test('should render whith slots', async () => {
      const html = [
        { label: 'submenu', slot: slotMenuItem },
        { label: 'image', slot: slotImage },
        { label: 'information', slot: slotInformation },
        { label: 'information AND image', slot: slotInformation + slotImage },
      ]
        .map(({ label, slot }) => {
          const template = [true, false]
            .map(submenu =>
              [true, false]
                .map(metadata =>
                  sizes
                    .map(size => (submenu && label === 'submenu' ? '' : createHTML({ size }, `${metadata ? slotMetadata : ''} ${submenu ? slot + slotMenuItem : slot}`, direction)))
                    .join(''),
                )
                .join(''),
            )
            .join('');
          return `<h2>${label}<h2/><div>${template}<div>`;
        })
        .join('');

      const page = await createPage(`<h1>${direction} mg-menu - Slots</h1>` + html);

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([true, false])(`should renders direction=${direction}, props expanded=%s`, async expanded => {
      const page = await createPage(createHTML({ expanded }, slotMenuItem, direction));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      await page.setViewport({ width: 300, height: 200 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test('should render content slot', async () => {
      const page = await createPage(createHTML({ expanded: true }, slotContent, direction));

      const element = await page.find('mg-menu-item');
      expect(element).toHaveClass('hydrated');

      await page.setViewport({ width: 300, height: 200 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
