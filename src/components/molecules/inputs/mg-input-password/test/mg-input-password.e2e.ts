import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-password', () => {
  describe.each([
    `<mg-input-password label="label"></mg-input-password>`,
    `<mg-input-password label="label" label-on-top></mg-input-password>`,
    `<mg-input-password label="label" label-hide></mg-input-password>`,
    `<mg-input-password label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-password>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-password');
      const input = await page.find('mg-input-password >>> input');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-password label="label" tooltip="Tooltip message" label-on-top=${labelOnTop}></mg-input-password>`);

    const element = await page.find('mg-input-password');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-password label="label" readonly></mg-input-password>`,
    `<mg-input-password label="label" value="blu"></mg-input-password>`,
    `<mg-input-password label="label" value="blu" readonly></mg-input-password>`,
    `<mg-input-password label="label" value="blu" readonly label-on-top></mg-input-password>`,
    `<mg-input-password label="label" disabled></mg-input-password>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-password');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-password label="label" required></mg-input-password>`);

    const element = await page.find('mg-input-password');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});