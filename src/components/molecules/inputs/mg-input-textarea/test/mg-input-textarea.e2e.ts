import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-textarea', () => {
  describe.each([
    `<mg-input-textarea identifier="identifier" label="label"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" label-on-top></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" label-hide></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-textarea>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-textarea');
      const input = await page.find('mg-input-textarea >>> textarea');

      // Hide caret for screenshots
      await page.$eval('mg-input-textarea', elm => {
        const input = elm.shadowRoot.querySelector('textarea');
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
    const page = await createPage(`<mg-input-textarea identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-textarea>`);

    const element = await page.find('mg-input-textarea');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      // when label on top tooltip is on fist tab (next to label)
      await page.keyboard.down('Tab');
    }

    await page.waitForChanges();

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-textarea identifier="identifier" label="label" readonly></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" readonly></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" readonly label-on-top></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" disabled></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" disabled></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="resizable" resizable="both"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" help-text="HelpText Message" required></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" help-text="HelpText Message" required readonly></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" help-text="HelpText Message" required disabled></mg-input-textarea>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-textarea');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-textarea identifier="identifier" label="label" required></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" required lang="fr"></mg-input-textarea>`,
  ])('%s', html => {
    test('Should render error when leaving an empty required input', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-textarea');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test('Should render error when leaving input with a non matching pattern value', async () => {
    const page = await createPage(
      `<mg-input-textarea identifier="identifier" label="label" pattern="[a-z]*" pattern-error-message="Vous ne pouvez saisir que des lettres minuscules."></mg-input-textarea>`,
    );

    const element = await page.find('mg-input-textarea');
    const input = await page.find('mg-input-textarea >>> textarea');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');

    await input.press('KeyB');
    await input.press('KeyL');
    await input.press('KeyU');
    await input.press('1');

    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    '<mg-input-textarea identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-textarea>',
    '<mg-input-textarea identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-textarea>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>`);

      const element = await page.find('mg-input-textarea');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([16])('with custom width: %s', width => {
    test.each([false, true])('with label on top: %s', async labelOnTop => {
      const page = await createPage(`<mg-input-textarea identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-textarea>`);

      const element = await page.find('mg-input-textarea');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
