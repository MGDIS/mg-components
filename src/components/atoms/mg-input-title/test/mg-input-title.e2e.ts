import { createPage } from '../../../../utils/test.utils';

describe('mg-input-title', () => {
  describe.each([
    { isLegend: false, required: false, identifier: 'identifier' },
    { isLegend: false, required: true, identifier: 'identifier' },
    { isLegend: true, required: false, identifier: 'identifier' },
    { isLegend: true, required: true, identifier: 'identifier' },
  ])('Screenshot with args %s', ({ isLegend, required }) => {
    test('Should render', async () => {
      const page = await createPage(`<mg-input-title is-legend="${isLegend}" required=${required}>Label</mg-input-title>`);

      const element = await page.find('mg-input-title');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
