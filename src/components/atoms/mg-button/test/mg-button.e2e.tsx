import { createPage } from "../../../../utils/test-utils"
import { variants } from '../mg-button.conf';

describe.each(variants)('mg-button %s', (variant) => {
  test('Should render', async () => {

    const page = await createPage(`<mg-button variant="${variant}">${variant}</mg-button>`);

    const element = await page.find('mg-button');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

  });
});
