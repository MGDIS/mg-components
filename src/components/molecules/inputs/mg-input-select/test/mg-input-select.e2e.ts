import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-select', () => {
  describe.each([`<mg-input-select label="label"></mg-input-select>`])('without tooltip', html => {
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

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      await page.keyboard.down('Space');

      const screenshotList = await page.screenshot();
      expect(screenshotList).toMatchImageSnapshot();

      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');

      const screenshotSelection = await page.screenshot();
      expect(screenshotSelection).toMatchImageSnapshot();

      await page.keyboard.down('Enter');

      const screenshotSelected = await page.screenshot();
      expect(screenshotSelected).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-select label="label" label-on-top></mg-input-select>`,
    `<mg-input-select label="label" label-hide></mg-input-select>`,
    `<mg-input-select label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-select>`,
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
    const page = await createPage(`<mg-input-select label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

    const element = await page.find('mg-input-select');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) await page.keyboard.down('Tab'); // when label on top tooltip is on fist tab (next to label)

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-select label="label" readonly></mg-input-select>`,
    `<mg-input-select label="label" value="blu"></mg-input-select>`,
    `<mg-input-select label="label" value="blu" readonly></mg-input-select>`,
    `<mg-input-select label="label" value="blu" readonly label-on-top></mg-input-select>`,
    `<mg-input-select label="label" disabled></mg-input-select>`,
    `<mg-input-select label="label" value="blu" disabled></mg-input-select>`,
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

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-select label="label" required></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

    const element = await page.find('mg-input-select');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render a grouped list', async () => {
    const page = await createPage(`<mg-input-select label="label"></mg-input-select>
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

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    '<mg-input-select label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-select>',
    '<mg-input-select label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-select>',
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
        <mg-input-select label="label" width="${width}" label-on-top="${labelOnTop}"></mg-input-select>
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

  describe.each([undefined, 300])('Ensure component fit in width: %s', async width => {
    test.each([false, true])('label-on-top: %s', async labelOnTop => {
      const page = await createPage(`
      <mg-input-select label="label" label-on-top="${labelOnTop}"></mg-input-select>
      <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'];
      </script>
    `);

      const element = await page.find('mg-input-select');

      expect(element).toHaveClass('hydrated');

      if (width !== undefined) await page.setViewport({ width, height: 600 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
