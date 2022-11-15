import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-input-title', () => {
  describe.each([
    { isLegend: false, required: false },
    { isLegend: false, required: true },
    { isLegend: true, required: false },
    { isLegend: true, required: true },
  ])('Screenshot with args %s', ({ isLegend, required }) => {
    test('Should render', async () => {
      const page = await createPage(`<mg-input-title identifier="identifier" is-legend="${isLegend}" required=${required}>Label</mg-input-title>`);

      const element = await page.find('mg-input-title');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
