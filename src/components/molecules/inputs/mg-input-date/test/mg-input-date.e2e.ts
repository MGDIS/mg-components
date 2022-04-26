import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-date', () => {
  describe.each([
    `<mg-input-date label="label"></mg-input-date>`,
    `<mg-input-date label="label" label-on-top></mg-input-date>`,
    `<mg-input-date label="label" label-hide></mg-input-date>`,
    `<mg-input-date label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-date>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-date');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      await page.keyboard.down('0');
      await page.keyboard.down('2');
      await page.keyboard.down('0');
      await page.keyboard.down('6');
      await page.keyboard.down('1');
      await page.keyboard.down('9');
      await page.keyboard.down('8');
      await page.keyboard.down('2');

      await page.waitForChanges();

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-date label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-date>`);

    const element = await page.find('mg-input-date');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      // Ensure to display tooltip
      await page.setViewport({ width: 600, height: 65 });
      // when label on top tooltip is on fist tab (next to label)
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
    }

    await page.waitForChanges();

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-date label="label" readonly></mg-input-date>`,
    `<mg-input-date label="label" value="1982-06-02"></mg-input-date>`,
    `<mg-input-date label="label" value="1982-06-02" readonly></mg-input-date>`,
    `<mg-input-date label="label" disabled></mg-input-date>`,
    `<mg-input-date label="label" value="1982-06-02" disabled></mg-input-date>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-date');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-date label="label" required></mg-input-date>`);

    const element = await page.find('mg-input-date');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render error when leaving input with a wrong date', async () => {
    const page = await createPage(`<mg-input-date label="label"></mg-input-date>`);

    const element = await page.find('mg-input-date');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');

    await page.keyboard.down('0');
    await page.keyboard.down('2');
    await page.keyboard.down('0');
    await page.keyboard.down('6');

    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    '<mg-input-date label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-date>',
    '<mg-input-date label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-date>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>`);

      const element = await page.find('mg-input-date');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
