import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-text', () => {
  describe.each([
    `<mg-input-text label="label"></mg-input-text>`,
    `<mg-input-text label="label" label-on-top></mg-input-text>`,
    `<mg-input-text label="label" label-hide></mg-input-text>`,
    `<mg-input-text label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-text>`,
  ])('without tooltip', html => {
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

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-text label="label" tooltip="Tooltip message" label-on-top=${labelOnTop}></mg-input-text>`);

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
    `<mg-input-text label="label" value="blu" readonly label-on-top></mg-input-text>`,
    `<mg-input-text label="label" disabled></mg-input-text>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

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

    await input.press('KeyB');
    await input.press('KeyL');
    await input.press('KeyU');
    await input.press('1');

    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    '<mg-input-text label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-text>',
    '<mg-input-text label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-text>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>`);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe('type search', () => {
    test('render', async () => {
      const page = await createPage(`
        <mg-input-text label="label" icon="magnifying-glass" placeholder="placeholder">
          <mg-button slot="append-input" label="search" is-input-group>
            <mg-icon icon="magnifying-glass"></mg-icon> Search
          </mg-button>
        </mg-input-text>
      `);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
