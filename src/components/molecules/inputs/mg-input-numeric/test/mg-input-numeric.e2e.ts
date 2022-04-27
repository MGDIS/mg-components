import { createPage } from '../../../../../utils/test.utils';

describe('mg-input-numeric', () => {
  describe.each([
    `<mg-input-numeric label="label"></mg-input-numeric>`,
    `<mg-input-numeric label="label" label-on-top></mg-input-numeric>`,
    `<mg-input-numeric label="label" label-hide></mg-input-numeric>`,
    `<mg-input-numeric label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-numeric>`,
    `<mg-input-numeric label="label" type="integer"></mg-input-numeric>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-numeric');
      const input = await page.find('mg-input-numeric >>> input');

      // Hide caret for screenshots
      await page.$eval('mg-input-numeric', elm => {
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

      await input.press('1');
      await input.press('2');
      await input.press('3');
      await input.press('4');
      await input.press('5');
      await input.press(',');
      await input.press('6');
      await input.press('7');

      await page.waitForChanges();

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  });

  test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
    const page = await createPage(`<mg-input-numeric label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-numeric>`);

    const element = await page.find('mg-input-numeric');

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
    `<mg-input-numeric label="label" readonly></mg-input-numeric>`,
    `<mg-input-numeric label="label" value="123,45"></mg-input-numeric>`,
    `<mg-input-numeric label="label" value="123,45" readonly></mg-input-numeric>`,
    `<mg-input-numeric label="label" disabled></mg-input-numeric>`,
    `<mg-input-numeric label="label" value="123,45" disabled></mg-input-numeric>`,
  ])('Should render with template', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-numeric');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test('Should render currency symbol', async () => {
    const page = await createPage(`<mg-input-numeric label="label" type="currency"></mg-input-numeric>`);

    const element = await page.find('mg-input-numeric');
    const input = await page.find('mg-input-numeric >>> input');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');

    await input.press('1');
    await input.press('2');
    await input.press('3');
    await input.press('4');
    await input.press('5');
    await input.press(',');
    await input.press('6');
    await input.press('7');

    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render error when leaving an empty required input', async () => {
    const page = await createPage(`<mg-input-numeric label="label" required></mg-input-numeric>`);

    const element = await page.find('mg-input-numeric');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');
    await page.keyboard.down('Tab');

    await page.waitForChanges();

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each([
    `<mg-input-numeric label="label" min="120"></mg-input-numeric>`,
    `<mg-input-numeric label="label" max="100"></mg-input-numeric>`,
    `<mg-input-numeric label="label" min="10" max="100"></mg-input-numeric>`,
  ])('Should render error when value does not respect min max attributes', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-input-numeric');
      const input = await page.find('mg-input-numeric >>> input');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');

      await input.press('1');
      await input.press('1');
      await input.press('0');

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  test('Should not allow invalid characters', async () => {
    const page = await createPage(`<mg-input-numeric label="label"></mg-input-numeric>`);

    const element = await page.find('mg-input-numeric');
    const input = await page.find('mg-input-numeric >>> input');

    expect(element).toHaveClass('hydrated');

    await page.keyboard.down('Tab');

    await input.press('1');
    await input.press('KeyB'); // Should not be included
    await input.press('2');
    await input.press('KeyL'); // Should not be included
    await input.press('3');
    await input.press('KeyU'); // Should not be included
    await input.press('4');
    await input.press('5');
    await input.press('6');
    await input.press('7');
    await input.press('8');
    await input.press('9');
    await input.press('0');
    await input.press('1');
    await input.press('2');
    await input.press('3');
    await input.press('4'); // Should not be included
    await input.press(',');
    await input.press('.'); // Should not be included
    await input.press('4');
    await input.press('5');
    await input.press('6'); // Should not be included

    const value = await input.getProperty('value');
    expect(value).toEqual('1234567890123,45');
  });

  describe.each([
    '<mg-input-numeric label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-numeric>',
    '<mg-input-numeric label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-numeric>',
  ])('inside a div.mg-form-group', html => {
    test('render', async () => {
      const page = await createPage(`<div class="mg-form-group">${html}</div>`);

      const element = await page.find('mg-input-numeric');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([true, false])('using append-input slot, case readonly %s', readonly => {
    test.each([
      `<mg-button slot="append-input" label="search">
        <mg-icon icon="calculator"></mg-icon> Calculate
      </mg-button>`,
      '<span slot="append-input">km</span>',
    ])('render', async slot => {
      const page = await createPage(`
        <mg-input-numeric label="label" readonly="${readonly}" value="1">
          ${slot}
        </mg-input-numeric>
      `);

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each(['full', 16, 4, 2])('with custom width: %s', width => {
    test.each([false, true])('with label on top: %s', async labelOnTop => {
      const page = await createPage(`<mg-input-numeric label="label" width="${width}" label-on-top="${labelOnTop}"></mg-input-numeric>`);

      const element = await page.find('mg-input-numeric');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
