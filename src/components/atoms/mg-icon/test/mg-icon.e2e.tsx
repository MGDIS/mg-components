import { createPage } from '../../../../utils/e2e.test.utils';
import { icons, sizes, variants } from '../mg-icon.conf';

const getIconWidth = (size: string): number => {
  switch (size) {
    case 'small':
      return 12;
    case 'large':
      return 24;
    case 'extra-large':
      return 36;
    default:
      return 16;
  }
};

describe('mg-icon', () => {
  test('renders icons', async () => {
    const html = Object.keys(icons)
      .map(icon => `<mg-icon icon="${icon}"></mg-icon>`)
      .join('');
    const page = await createPage(html);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('renders sizes', async () => {
    const html = sizes.map(size => `<mg-icon icon="thumb-up" size="${size}"></mg-icon>`).join('');
    const page = await createPage(html);

    await page.setViewport({ width: 88, height: 36 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('renders variants', async () => {
    let html = '';
    let width = 0;
    for (const variant of variants) {
      for (const size of sizes) {
        width += getIconWidth(size) + 6;
        html += `<mg-icon icon="check-circle" variant="${variant}" size="${size}"></mg-icon>`;
      }
    }

    const page = await createPage(html);

    await page.setViewport({ width, height: 42 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
