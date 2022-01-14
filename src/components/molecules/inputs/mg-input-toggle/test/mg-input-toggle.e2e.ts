import { createPage } from "../../../../../utils/test.utils"

describe('mg-input-toggle', () => {

  describe.each([
    `<mg-input-toggle label="legend"></mg-input-toggle>`,
    `<mg-input-toggle label="legend"><span slot="item-1">Non</span><span slot="item-2">Oui</span></mg-input-toggle>`,
    `<mg-input-toggle label="legend" values-side-by-side><span slot="item-1">Non</span><span slot="item-2">Oui</span></mg-input-toggle>`,
    `<mg-input-toggle label="legend"><span slot="item-1" class="mg-input_button-toggle__item-container--icon"><mg-icon icon="cross"></mg-icon></span><span slot="item-2" class="mg-input_button-toggle__item-container--icon"><mg-icon icon="success"></mg-icon></span></mg-input-toggle>`,
  ])('without tooltip', (html)=>{
    test('render', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputtoggle = document.querySelector('mg-input-toggle');
      mgInputtoggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

      const element = await page.find('mg-input-toggle');

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
    });
  });

  describe.each([
    `<mg-input-toggle label="legend" label-on-top help-text="HelpText Message"></mg-input-toggle>`,
    `<mg-input-toggle label="legend" input-vertical-list help-text="HelpText Message"></mg-input-toggle>`,
    `<mg-input-toggle label="legend" label-on-top input-vertical-list help-text="HelpText Message"></mg-input-toggle>`,
    `<mg-input-toggle label="legend" label-hide></mg-input-toggle>`,
    `<mg-input-toggle label="legend" placeholder="placeholder" help-text="HelpText Message"></mg-input-toggle>`
  ])('without tooltip', (html)=>{
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputtoggle = document.querySelector('mg-input-toggle');
        mgInputtoggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
        </script>`);

      const element = await page.find('mg-input-toggle');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async (labelOnTop) => {
    const page = await createPage(`<mg-input-toggle label="legend" tooltip="Tooltip message" label-on-top=${labelOnTop}></mg-input-toggle>
      <script>
      const mgInputtoggle = document.querySelector('mg-input-toggle');
      mgInputtoggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

    const element = await page.find('mg-input-toggle');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-toggle label="legend" readonly></mg-input-toggle>`,
    `<mg-input-toggle label="legend" value="true"></mg-input-toggle>`,
    `<mg-input-toggle label="legend" value="true" readonly></mg-input-toggle>`,
    `<mg-input-toggle label="legend" value="true" readonly label-on-top></mg-input-toggle>`,
    `<mg-input-toggle label="legend" disabled></mg-input-toggle>`,
  ])('Should render with template', (html)=>{
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputtoggle = document.querySelector('mg-input-toggle');
        mgInputtoggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
        </script>`);

      const element = await page.find('mg-input-toggle');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  })

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-toggle label="legend" help-text="HelpText Message" required></mg-input-toggle>
      <script>
      const mgInputtoggle = document.querySelector('mg-input-toggle');
      mgInputtoggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

    const element = await page.find('mg-input-toggle');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
