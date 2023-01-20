import { createPage } from '../../../../utils/e2e.test.utils';

describe('mg-input-title', () => {
  test('Should render', async () => {
    const props = [
      { isLegend: false, required: false },
      { isLegend: false, required: true },
      { isLegend: true, required: false },
      { isLegend: true, required: true },
    ];
    const html = props
      .map(({ isLegend, required }) => `<div><mg-input-title identifier="identifier" is-legend="${isLegend}" required=${required}>Label</mg-input-title></div>`)
      .join('');
    const page = await createPage(html, { width: 50, height: 75 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
