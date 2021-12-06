import { createPage } from "../../../../../utils/test.utils"

describe('mg-input-textarea', () => {

  describe.each([
    `<mg-input-textarea label="label"></mg-input-textarea>`,
    `<mg-input-textarea label="label" label-on-top></mg-input-textarea>`,
    `<mg-input-textarea label="label" label-hide></mg-input-textarea>`,
    `<mg-input-textarea label="label" label-colon placeholder="placeholder" help-text="HelpText Message"></mg-input-textarea>`
  ])('without tooltip', (html)=>{
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-textarea');
      const input = await page.find('mg-input-textarea >>> textarea');

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
    const page = await createPage(`<mg-input-textarea label="label" tooltip="Tooltip message"></mg-input-textarea>`);

    const element = await page.find('mg-input-textarea');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-textarea label="label" readonly></mg-input-textarea>`,
    `<mg-input-textarea label="label" value="blu"></mg-input-textarea>`,
    `<mg-input-textarea label="label" value="blu" readonly></mg-input-textarea>`,
    `<mg-input-textarea label="label" value="blu" readonly label-on-top></mg-input-textarea>`,
    `<mg-input-textarea label="label" disabled></mg-input-textarea>`,
  ])('Should render with template', (html)=>{
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-textarea');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  })

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-textarea label="label" required></mg-input-textarea>`);

    const element = await page.find('mg-input-textarea');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render error when leaving input with a non matching pattern value', async () => {
    const page = await createPage(`<mg-input-textarea label="label" pattern="[a-z]*" pattern-error-message="Vous ne pouvez saisir que des les lettres minuscules."></mg-input-textarea>`);

    const element = await page.find('mg-input-textarea');
    const input = await page.find('mg-input-textarea >>> textarea');

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
