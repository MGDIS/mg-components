import { createPage } from '../../../../utils/test.utils';
import { icons, sizes, variants } from '../mg-icon.conf';

const setViewportSize = (size: string): number => {
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
  describe.each(Object.keys(icons))('icon %s', icon => {
    describe.each(sizes)('size %s', size => {
      test('renders', async () => {
        // Needed style for viewport < 20px
        const page = await createPage(`<style>mg-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}</style><mg-icon icon="${icon}" size="${size}"></mg-icon>`);

        const element = await page.find('mg-icon');
        expect(element).toHaveClass('hydrated');

        const viewport = setViewportSize(size);
        await page.setViewport({ width: viewport, height: viewport });

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });
    });
  });

  describe.each(variants)('variant %s', variant => {
    describe.each(sizes)('size %s', size => {
      test('renders', async () => {
        const page = await createPage(`<mg-icon icon="check-circle" size="${size}" variant="${variant}"></mg-icon>`);

        const element = await page.find('mg-icon');
        expect(element).toHaveClass('hydrated');

        const viewport = setViewportSize(size) + 6;
        await page.setViewport({ width: viewport, height: viewport });

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });
    });
  });
});
