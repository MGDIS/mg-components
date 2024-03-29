import { createPage } from '../../../../utils/e2e.test.utils';

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

const slot2 = `
  <div>Content</div>
  <div slot="header-right" style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
    <mg-badge variant="primary" value="1" label="label"></mg-badge>
    <div>
      <mg-button variant="secondary">
        <mg-icon icon="file-upload"></mg-icon> Upload
      </mg-button>
      <mg-button is-icon variant="secondary" label="delete">
        <mg-icon icon="trash"></mg-icon>
      </mg-button>
    </div>
  </div>
`;

describe('mg-panel', () => {
  describe.each([
    `<mg-panel label="label" panel-title="panel title" >${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expanded>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" title-editable>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title">${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title" title-editable>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" >${slot2}</mg-panel>`,
    `<mg-panel label="label" panel-title="very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title" title-editable>${slot2}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expand-toggle-disabled expanded title-editable>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expand-toggle-disabled title-editable>${slot}</mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expanded style="--mg-panel-content-padding: 0"><div>Content without padding.</div></mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expanded style="--mg-panel-background: none; --mg-panel-border-radius: 0; --mg-panel-box-shadow: none"><div>Transparent mg-panel</div></mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expanded><div>header right items should be vertically aligned</div><div slot="header-right"><mg-tag>Label</mg-tag><mg-icon icon="check-circle" variant="success"></mg-icon></div></mg-panel>`,
    `<mg-panel label="label" panel-title="panel title" expanded style="--mg-panel-background: var(--color-danger)"><mg-card>Content whith child card.</mg-card></mg-panel>`,
  ])('template', html => {
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

      const editButton = await page.find('mg-panel >>> mg-button[is-icon]');
      await editButton.click();

      await page.waitForChanges();

      // Hide caret for screenshots
      await page.$eval('mg-panel', elm => {
        const input = elm.shadowRoot.querySelector('mg-input-text').shadowRoot.querySelector('input');
        input.style.caretColor = 'transparent';
      });

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

      const validateButton = await page.find('mg-panel >>> mg-input-text mg-button:last-of-type');
      await validateButton.click();

      await page.waitForChanges();

      const screenshot3 = await page.screenshot();
      expect(screenshot3).toMatchImageSnapshot();
    });

    test.each([
      `<mg-panel identifier="identifier" panel-title="panel" title-editable title-pattern="^(?!(joker)$)[a-z A-Z0-9\s]+$" title-pattern-error-message="You can't enter a bad guy !">${slot}</mg-panel>`,
    ])('Should NOT update panel title, case input new value does NOT match pattern', async html => {
      const page = await createPage(html);

      const editButton = await page.find('mg-panel >>> mg-button[is-icon]');
      await editButton.click();

      await page.waitForChanges();

      // Hide caret for screenshots
      await page.$eval('mg-panel', elm => {
        const input = elm.shadowRoot.querySelector('mg-input-text').shadowRoot.querySelector('input');
        input.style.caretColor = 'transparent';
      });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      const input = await page.find('mg-panel >>> mg-input-text >>> input');

      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('KeyJ');
      await input.press('KeyO');
      await input.press('KeyK');
      await input.press('KeyE');
      await input.press('KeyR');

      const validateButton = await page.find('mg-panel >>> mg-input-text mg-button:last-of-type');
      await validateButton.click();

      await page.waitForChanges();

      const screenshot2 = await page.screenshot();
      expect(screenshot2).toMatchImageSnapshot();
    });
  });
});
