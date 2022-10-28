import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-radio', () => {
  describe.each([`<mg-input-radio identifier="identifier" label="legend"></mg-input-radio>`])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`);

      const element = await page.find('mg-input-radio');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      const radio = await page.find('mg-input-radio >>> .mg-input__input-group input');
      await radio.press('Space');

      await page.waitForChanges();

      const screenshotList = await page.screenshot();
      expect(screenshotList).toMatchImageSnapshot();

      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');

      await page.waitForChanges();

      const screenshotSelection = await page.screenshot();
      expect(screenshotSelection).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-radio identifier="identifier" label="legend" label-on-top help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" input-vertical-list help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" label-on-top input-vertical-list help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" label-hide></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-radio>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>`);

      const element = await page.find('mg-input-radio');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-radio identifier="identifier" label="legend" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-radio>
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`);

    const element = await page.find('mg-input-radio');

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

  test('render longer intems list inline', async () => {
    const page = await createPage(`<mg-input-radio identifier="identifier" label="legend"></mg-input-radio>
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane', 'ironman', 'spiderman', 'captain america', 'thor', 'vision', 'antman', 'black widow', 'black panther'];
      </script>`);

    const element = await page.find('mg-input-radio');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-radio identifier="identifier" label="legend" readonly></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" readonly></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" readonly label-on-top></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" disabled></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" disabled></mg-input-radio>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>`);

      const element = await page.find('mg-input-radio');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-radio identifier="identifier" label="legend" required></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" required lang="fr"></mg-input-radio>`,
  ])('%s', html => {
    test('Should render error when leaving an empty required input', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`);

      const element = await page.find('mg-input-radio');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    '<mg-input-radio identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-radio>',
    '<mg-input-radio identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-radio>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`);

      const element = await page.find('mg-input-radio');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([undefined, 200])('Ensure component fit in width: %s', width => {
    test.each([false, true])('label-on-top: %s', async labelOnTop => {
      const page = await createPage(`<mg-input-radio identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-radio>
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>
      `);

      const element = await page.find('mg-input-radio');

      expect(element).toHaveClass('hydrated');

      if (width !== undefined) await page.setViewport({ width, height: 100 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
