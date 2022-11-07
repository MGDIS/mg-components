import { createPage } from '../../../../../utils/e2e.test.utils';

describe('mg-input-password', () => {
  describe.each([
    `<mg-input-password identifier="identifier" label="label"></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" label-on-top></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" label-hide></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-password>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-password');
      const input = await page.find('mg-input-password >>> input');

      // Hide caret for screenshots
      await page.$eval('mg-input-password', elm => {
        const input = elm.shadowRoot.querySelector('input');
        input.style.caretColor = 'transparent';
      });

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      await page.waitForChanges();

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-password identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-password>`);

    const element = await page.find('mg-input-password');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      // Ensure to display tooltip
      await page.setViewport({ width: 600, height: 65 });
      // when label on top tooltip is on fist tab (next to label)
      await page.keyboard.down('Tab');
    }

    await page.waitForChanges();

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-password identifier="identifier" label="label" readonly></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu"></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" readonly></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" readonly label-on-top></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" disabled></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" disabled></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" help-text="HelpText Message" required></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" help-text="HelpText Message" required readonly></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" help-text="HelpText Message" required disabled></mg-input-password>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-password');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-password identifier="identifier" label="label" required></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" required lang="fr"></mg-input-password>`,
  ])('%s', html => {
    test('Should render error when leaving an empty required input', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-password');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    '<mg-input-password identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-password>',
    '<mg-input-password identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-password>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>`);

      const element = await page.find('mg-input-password');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([16])('with custom width: %s', width => {
    test.each([false, true])('with label on top: %s', async labelOnTop => {
      const page = await createPage(`<mg-input-password identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-password>`);

      const element = await page.find('mg-input-password');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test.each([false, true])('Ensure component fit in width 200px with label-on-top: %s', async labelOnTop => {
    const page = await createPage(`<mg-input-password identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-password>`);

    const element = await page.find('mg-input-password');

    expect(element).toHaveClass('hydrated');

    await page.setViewport({ width: 200, height: 100 });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
