import { createPage } from "../../../../../utils/test.utils"

describe('mg-input-select', () => {

  describe.each([
    `<mg-input-select label="label"></mg-input-select>`,
  ])('without tooltip', (html)=>{
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

      await page.keyboard.down("Space");

      const screenshotList = await page.screenshot();
      expect(screenshotList).toMatchImageSnapshot();

      await page.keyboard.down("ArrowDown");
      await page.keyboard.down("ArrowDown");

      const screenshotSelection = await page.screenshot();
      expect(screenshotSelection).toMatchImageSnapshot();

      await page.keyboard.down("Enter");

      const screenshotSelected = await page.screenshot();
      expect(screenshotSelected).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-select label="label" label-on-top></mg-input-select>`,
    `<mg-input-select label="label" label-hide></mg-input-select>`,
    `<mg-input-select label="label" label-colon placeholder="placeholder" help-text="HelpText Message"></mg-input-select>`
  ])('without tooltip', (html)=>{
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

  test('render with tooltip', async () => {
    const page = await createPage(`<mg-input-select label="label" tooltip="Tooltip message"></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`);

    const element = await page.find('mg-input-select');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-select label="label" readonly></mg-input-select>`,
    `<mg-input-select label="label" value="blu"></mg-input-select>`,
    `<mg-input-select label="label" value="blu" readonly></mg-input-select>`,
    `<mg-input-select label="label" value="blu" readonly label-on-top></mg-input-select>`,
    `<mg-input-select label="label" disabled></mg-input-select>`,
  ])('Should render with template', (html)=>{
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
  })

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
    await page.keyboard.down("Space");

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

});
