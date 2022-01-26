import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-toggle', () => {
  test.each([
    `<mg-input-toggle label="label"></mg-input-toggle>`,
    `<mg-input-toggle label="label"><span slot="item-1">Non</span><span slot="item-2">Oui</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" is-on-off><span slot="item-1">Non</span><span slot="item-2">Oui</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" is-icon is-on-off><span slot="item-1" class="toggle-item-container__item-icon"><mg-icon icon="cross"></mg-icon></span><span slot="item-2" class="toggle-item-container__item-icon"><mg-icon icon="check"></mg-icon></span></mg-input-toggle>`,
    `<mg-input-toggle label="label" identifier="toggle-long-text-on-top" label-on-top><span slot="item-1">Choix A très long</span><span slot="item-2">Choix B très long</span></mg-input-toggle>`,
  ])('Keyboard navigation', async html => {
    const page = await createPage(`${html}
    <style>#toggle-long-text-on-top {width: 100px;}</style>
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

    await page.keyboard.down('ArrowRight');

    await page.waitFor(300);

    const screenshotSelection = await page.screenshot();
    expect(screenshotSelection).toMatchImageSnapshot();

    await page.keyboard.down('Tab');

    const screenshotUnSelect = await page.screenshot();
    expect(screenshotUnSelect).toMatchImageSnapshot();
  });

  test.each([
    `<mg-input-toggle label="label" label-on-top help-text="HelpText Message"></mg-input-toggle>`,
    `<mg-input-toggle label="label" input-vertical-list help-text="HelpText Message"></mg-input-toggle>`,
    `<mg-input-toggle label="label" label-on-top input-vertical-list help-text="HelpText Message"></mg-input-toggle>`,
    `<mg-input-toggle label="label" identifier="toggle-long-text-readonly" readonly><span slot="item-1">Choix A avec text long long</span><span slot="item-2">Choix B avec text long long</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" label-hide></mg-input-toggle>`,
    `<mg-input-toggle label="label" is-on-off readonly><span slot="item-1">Off</span><span slot="item-2">On</span></mg-input-toggle>`,
    `<mg-input-toggle label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-toggle>`,
  ])('Render without tooltip', async html => {
    const page = await createPage(`${html}
      <style>#toggle-long-text-readonly {width: 100px;}</style>
      <script>
      const mgInputtoggle = document.querySelector('mg-input-toggle');
      mgInputtoggle.items = [{title: 'batman', value: false}, {title: 'joker', value: true}];
      </script>`);

    const element = await page.find('mg-input-toggle');

    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-toggle label="label" tooltip="Tooltip message" label-on-top=${labelOnTop}></mg-input-toggle>
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

  test.each([
    `<mg-input-toggle label="label" readonly></mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true"></mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true" readonly></mg-input-toggle>`,
    `<mg-input-toggle label="label" value="true" readonly label-on-top></mg-input-toggle>`,
    `<mg-input-toggle label="label" disabled></mg-input-toggle>`,
  ])('Should render with template', async html => {
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
