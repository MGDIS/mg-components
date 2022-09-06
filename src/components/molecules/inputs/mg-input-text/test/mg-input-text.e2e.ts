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

      // Hide caret for screenshots
      await page.$eval('mg-input-text', elm => {
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
    const page = await createPage(`<mg-input-text label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-text>`);

    const element = await page.find('mg-input-text');

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
    `<mg-input-text label="label" readonly></mg-input-text>`,
    `<mg-input-text label="label" value="blu"></mg-input-text>`,
    `<mg-input-text label="label" value="blu" readonly></mg-input-text>`,
    `<mg-input-text label="label" value="blu" readonly label-on-top></mg-input-text>`,
    `<mg-input-text label="label" disabled></mg-input-text>`,
    `<mg-input-text label="label" value="blu" disabled></mg-input-text>`,
    `<mg-input-text label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-text>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([`<mg-input-text label="label" required></mg-input-text>`, `<mg-input-text label="label" required lang="fr"></mg-input-text>`])('%s', html => {
    test('Should render error when leaving an empty required input', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
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

    await page.waitForChanges();

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

  describe.each([true, false])('using append-input slot, case readonly %s', readonly => {
    test.each([
      {
        type: 'search',
        slot: `<mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon> Search
      </mg-button>`,
        icon: 'magnifying-glass',
      },
      {
        type: 'text',
        slot: '<span slot="append-input">@dc.comics</span>',
      },
      {
        type: 'text',
        slot: `<mg-button is-icon slot="append-input" label="cancel" variant="secondary">
        <mg-icon icon="cross"></mg-icon>
      </mg-button>
      <mg-button is-icon slot="append-input" label="validate" variant="secondary">
        <mg-icon icon="check"></mg-icon>
      </mg-button>
      `,
      },
    ])('render', async ({ type, slot, icon }) => {
      const page = await createPage(`
        <mg-input-text label="label" ${icon && 'icon="' + icon + '"'} placeholder="placeholder" type="${type}" readonly="${readonly}" value="bruce">
          ${slot}
        </mg-input-text>
      `);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([16, 4, 2])('with custom width: %s', width => {
    test.each([false, true])('with label on top: %s', async labelOnTop => {
      const page = await createPage(`<mg-input-text label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-text>`);

      const element = await page.find('mg-input-text');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
