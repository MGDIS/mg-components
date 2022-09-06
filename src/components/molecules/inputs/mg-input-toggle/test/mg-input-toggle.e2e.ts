import { createPage } from '../../../../../utils/test.utils';

const defaultSlots = '<span slot="item-1">Choix A</span><span slot="item-2">Choix B</span>';

describe('mg-input-toggle', () => {
  test.each([
    `<mg-input-toggle label="label">${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" is-on-off><span slot="item-1">Non</span><span slot="item-2">Oui</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" is-icon is-on-off><mg-icon icon="cross" slot="item-1"></mg-icon><mg-icon icon="check" slot="item-2"></mg-icon></mg-input-toggle>`,
    `<mg-input-toggle label="label" identifier="toggle-long-text"><span slot="item-1">Choix A très long long long long long long long long long long long long long</span><span slot="item-2">Choix B très long long long long long long long long long long long long long</span></mg-input-toggle>`,
  ])('Keyboard navigation', async html => {
    const page = await createPage(`${html}
    <script>
    const mgInputToggle = document.querySelector('mg-input-toggle');
    mgInputToggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
    </script>`);

    const element = await page.find('mg-input-toggle');
    const toggle = await page.find('mg-input-toggle >>> button');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshotFocus = await page.screenshot();
    expect(screenshotFocus).toMatchImageSnapshot();

    await toggle.press('Space');

    await page.waitForChanges();

    const screenshotSelection = await page.screenshot();
    expect(screenshotSelection).toMatchImageSnapshot();

    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshotUnSelect = await page.screenshot();
    expect(screenshotUnSelect).toMatchImageSnapshot();
  });

  test.each([
    `<mg-input-toggle label="label" label-on-top help-text="HelpText Message">${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" input-vertical-list help-text="HelpText Message">${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" label-on-top input-vertical-list help-text="HelpText Message">${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" identifier="toggle-long-text"><span slot="item-1">Choix A très long long long long long long long long long long long long long</span><span slot="item-2">Choix B très long long long long long long long long long long long long long</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" identifier="toggle-long-text-readonly" readonly><span slot="item-1">Choix A avec text long long</span><span slot="item-2">Choix B avec text long long</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" label-hide>${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" is-on-off readonly><span slot="item-1">Off</span><span slot="item-2">On</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" placeholder="placeholder" help-text="HelpText Message">${defaultSlots}</mg-input-toggle>`,
  ])('Render without tooltip', async html => {
    const page = await createPage(`${html}
      <script>
      const mgInputToggle = document.querySelector('mg-input-toggle');
      mgInputToggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

    const element = await page.find('mg-input-toggle');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test.each([undefined, false, true])('Render and toggle value whith reverse checked logic', async value => {
    const page = await createPage(`${`<mg-input-toggle label="label">${defaultSlots}</mg-input-toggle>`}
      <script>
      const mgInputToggle = document.querySelector('mg-input-toggle');
      mgInputToggle.items = [{title: 'batman', value: true}, {title: 'joker', value: false}];
      mgInputToggle.value = ${value};
      </script>`);

    const element = await page.find('mg-input-toggle');
    const button = await page.find('mg-input-toggle >>> button');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();

    await button.click();

    const screenshot2 = await page.screenshot();
    expect(screenshot2).toMatchImageSnapshot();
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-toggle label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}">${defaultSlots}</mg-input-toggle>
      <script>
      const mgInputToggle = document.querySelector('mg-input-toggle');
      mgInputToggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

    const element = await page.find('mg-input-toggle');

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

    const screenshotTooltip = await page.screenshot();
    expect(screenshotTooltip).toMatchImageSnapshot();
  });

  test.each([
    `<mg-input-toggle label="label" readonly>${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true">${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true" readonly>${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true" readonly label-on-top>${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" disabled>${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true" disabled>${defaultSlots}</mg-input-toggle>`,
  ])('Should render with template', async html => {
    const page = await createPage(`${html}
      <script>
      const mgInputToggle = document.querySelector('mg-input-toggle');
      mgInputToggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

    const element = await page.find('mg-input-toggle');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-toggle label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message">${defaultSlots}</mg-input-toggle>`,
    `<mg-input-toggle label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top>${defaultSlots}</mg-input-toggle>`,
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>
      <script>
      const mgInputToggle = document.querySelector('mg-input-toggle');
      mgInputToggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

      const element = await page.find('mg-input-toggle');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
