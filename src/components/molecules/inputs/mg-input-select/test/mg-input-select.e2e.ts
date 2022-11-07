import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-select', () => {
  describe.each([`<mg-input-select identifier="identifier" label="label"></mg-input-select>`])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      await page.keyboard.down('Space');

      await page.waitForChanges();

      const screenshotList = await page.screenshot();
      expect(screenshotList).toMatchImageSnapshot();

      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');

      await page.waitForChanges();

      const screenshotSelection = await page.screenshot();
      expect(screenshotSelection).toMatchImageSnapshot();

      await page.keyboard.down('Enter');

      await page.waitForChanges();

      const screenshotSelected = await page.screenshot();
      expect(screenshotSelected).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-select identifier="identifier" label="label" label-on-top></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" label-hide></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-select>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
        </script>`);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-select identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

    const element = await page.find('mg-input-select');

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
    `<mg-input-select identifier="identifier" label="label" readonly></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu"></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" readonly></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" readonly label-on-top></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" disabled></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" disabled></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" required help-text="HelpText Message"></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" required readonly help-text="HelpText Message"></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" required disabled help-text="HelpText Message"></mg-input-select>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
        </script>`);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-select identifier="identifier" label="label" required></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" required lang="fr"></mg-input-select>`,
  ])('%s', html => {
    test('Should render error when leaving an empty required input', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test('Should render a grouped list', async () => {
    const page = await createPage(`<mg-input-select identifier="identifier" label="label"></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = [
        { title: 'blu', value: 'blu', group: 'Le groupe A' },
        { title: 'blu', value: 'blublu', group: 'Le groupe B' },
        { title: 'bli', value: 'bli', group: 'Le groupe A' },
        { title: 'bli', value: 'blibli', group: 'Le groupe B' },
        { title: 'bla', value: 'blabla' },
        { title: 'blo', value: 'bloblo' },
      ];
      </script>`);

    const element = await page.find('mg-input-select');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Space');

    await page.waitForChanges();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    '<mg-input-select identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-select>',
    '<mg-input-select identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-select>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each(['full', 16])('with custom width: %s', width => {
    test.each([false, true])('with label on top: %s', async labelOnTop => {
      const page = await createPage(`
        <mg-input-select identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-select>
        <script>
          const mgInputSelect = document.querySelector('mg-input-select');
          mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
        </script>
      `);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([undefined, 300])('Ensure component fit in width: %s', width => {
    test.each([false, true])('label-on-top: %s', async labelOnTop => {
      const page = await createPage(`
      <mg-input-select identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-select>
      <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'];
      </script>
    `);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      if (width !== undefined) await page.setViewport({ width, height: 100 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
