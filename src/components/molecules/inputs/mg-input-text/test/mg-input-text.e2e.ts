import { createPage } from "../../../../../utils/test.utils"

describe('mg-input-text', () => {

  describe.each([
    `<mg-input-text label="label"></mg-input-text>`,
    `<mg-input-text label="label" label-on-top></mg-input-text>`,
    `<mg-input-text label="label" label-hide></mg-input-text>`,
    `<mg-input-text label="label" label-colon placeholder="placeholder" help-text="HelpText Message"></mg-input-text>`
  ])('without tooltip', (html)=>{
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-text');
      const input = await page.find('mg-input-text >>> input');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      await input.press("KeyB");
      await input.press("KeyL");
      await input.press("KeyU");

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  })

  test('render with tooltip', async () => {
    const page = await createPage(`<mg-input-text label="label" tooltip="Tooltip message"></mg-input-text>`);

    const element = await page.find('mg-input-text');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-text label="label" readonly></mg-input-text>`,
    `<mg-input-text label="label" value="blu"></mg-input-text>`,
    `<mg-input-text label="label" value="blu" readonly></mg-input-text>`,
    `<mg-input-text label="label" disabled></mg-input-text>`,
  ])('Should render with template', (html)=>{
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  })

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-text label="label" required></mg-input-text>`);

    const element = await page.find('mg-input-text');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render error when leaving input with a non matching pattern value', async () => {
    const page = await createPage(`<mg-input-text label="label" pattern="[a-z]*" pattern-error-message="Vous ne pouvez saisir que des lettres minuscules."></mg-input-text>`);

    const element = await page.find('mg-input-text');
    const input = await page.find('mg-input-text >>> input');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');

    await input.press("KeyB");
    await input.press("KeyL");
    await input.press("KeyU");
    await input.press("1");

    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

});
