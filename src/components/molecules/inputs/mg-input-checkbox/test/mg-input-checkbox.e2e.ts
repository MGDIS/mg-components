import { createPage } from '../../../../../utils/e2e.test.utils';

describe('mg-input-checkbox', () => {
  describe.each([
    `<mg-input-checkbox identifier="identifier" label="legend"></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" label-on-top></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" label-hide></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" help-text="HelpText Message"></mg-input-checkbox>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputCheckbox = document.querySelector('mg-input-checkbox');
      mgInputCheckbox.value = [{title: 'Batman', value: false}, {title: 'Robin', value: false}, {title: 'Joker', value: false}, {title: 'Bane', value: false}];
      </script>`);

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      let checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group input');
      await checkbox.press('Space');

      await page.keyboard.down('Tab');
      checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group:nth-of-type(2) input');
      await checkbox.press('Space');

      await page.keyboard.down('Tab');
      checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group:nth-of-type(3) input');
      await checkbox.press('Space');

      await page.keyboard.down('Tab');
      checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group:nth-of-type(4) input');
      await checkbox.press('Space');

      await page.waitForChanges();

      const screenshotChecked = await page.screenshot();
      expect(screenshotChecked).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-checkbox identifier="identifier" label="legend" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-checkbox>
      <script>
      const mgInputCheckbox = document.querySelector('mg-input-checkbox');
      mgInputCheckbox.value = [{title: 'Batman', value: false}, {title: 'Robin', value: false}, {title: 'Joker', value: false}, {title: 'Bane', value: false}];
      </script>`);

    const element = await page.find('mg-input-checkbox');

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
      await page.keyboard.down('Tab');
    }

    await page.waitForChanges();

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-checkbox identifier="identifier" label="legend" readonly></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" readonly label-on-top></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" disabled></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" input-vertical-list help-text="HelpText Message"></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" input-vertical-list help-text="HelpText Message" label-on-top></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" help-text='HelpText Message' required></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" help-text='HelpText Message' required readonly></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" help-text='HelpText Message' required disabled></mg-input-checkbox>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputCheckbox = document.querySelector('mg-input-checkbox');
      mgInputCheckbox.value = [{title: 'Batman', value: true}, {title: 'Robin', value: false}, {title: 'Joker', value: null}, {title: 'Bane', value: true, disabled: true}];
      </script>`);

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-checkbox identifier="identifier" label="legend" help-text="HelpText Message" required></mg-input-checkbox>`,
    `<mg-input-checkbox identifier="identifier" label="legend" help-text="Message d'aide" lang="fr" required></mg-input-checkbox>`,
  ])('%s', html => {
    test('Should render error when leaving an empty required input', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputCheckbox = document.querySelector('mg-input-checkbox');
      mgInputCheckbox.value = [{title: 'Batman', value: false}, {title: 'Robin', value: false}, {title: 'Joker', value: false}, {title: 'Bane', value: false}];
      </script>`);

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    '<mg-input-checkbox identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-checkbox>',
    '<mg-input-checkbox identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-checkbox>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>
        <script>
        const mgInputCheckbox = document.querySelector('mg-input-checkbox');
        mgInputCheckbox.value = [{title: 'Batman', value: true}, {title: 'Robin', value: false}, {title: 'Joker', value: null}, {title: 'Bane', value: true, disabled: true}];
        </script>`);

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
