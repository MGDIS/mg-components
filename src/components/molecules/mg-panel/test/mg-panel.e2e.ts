import { createPage } from '../../../../utils/test.utils';

const slot = `
  <div>Content</div>
  <div slot="header-right">
    <mg-button variant="secondary">
      <mg-icon icon="file-upload"></mg-icon> Upload
    </mg-button>
    <mg-button is-icon variant="secondary" label="delete">
      <mg-icon icon="trash"></mg-icon>
    </mg-button>
  </div>
`;

describe('mg-panel', () => {
  describe.each([
    `<mg-panel label="label" panel-title="panel title" >${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expanded>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" title-editable>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title">${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title" title-editable>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expand-toggle-disabled expanded>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expand-toggle-disabled>${slot}</mg-panel>`,
  ])('without tooltip', html => {
    test('render', async () => {
      const page = await createPage(html);

      const element = await page.find('mg-panel');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Space');

      await page.waitForChanges();

      const screenshotType = await page.screenshot();
      expect(screenshotType).toMatchImageSnapshot();
    });
  });

  describe('navigation', () => {
    test.each([
      `<mg-panel identifier="identifier" panel-title="panel title" title-editable>${slot}</mg-panel>`,
      `<mg-panel identifier="identifier" panel-title="very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title" title-editable>${slot}</mg-panel>`,
    ])('Should navigate throw editabled panel', async html => {
      const page = await createPage(html);

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      const editButton = await page.find('mg-panel >>> #identifier-edit-button');
      await editButton.click();

      await page.waitForChanges();

      const screenshot2 = await page.screenshot();
      expect(screenshot2).toMatchImageSnapshot();

      const input = await page.find('mg-panel >>> mg-input-text >>> input');

      await input.press('Space');
      await input.press('KeyU');
      await input.press('KeyP');
      await input.press('KeyD');
      await input.press('KeyA');
      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyD');

      const validateButton = await page.find('mg-panel >>> #identifier-edition-button-validate');
      await validateButton.click();

      await page.waitForChanges();

      const screenshot3 = await page.screenshot();
      expect(screenshot3).toMatchImageSnapshot();
    });
  });
});
