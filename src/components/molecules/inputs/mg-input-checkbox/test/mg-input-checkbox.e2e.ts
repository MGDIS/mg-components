import { createPage } from "../../../../../utils/test.utils"

describe('mg-checkbox', () => {
  describe.each([
    `<mg-input-checkbox label="legend"></mg-input-checkbox>`,
  ])('without tooltip', (html)=>{
    test('render', async () => {
      const page = await createPage(`${html}
      <script>
      const mgInputCheckbox = document.querySelector('mg-input-checkbox');
      mgInputCheckbox.value = [{title: 'batman', value: true}, {title: 'robin', value: false}, {title: 'joker', value: null}, {title: 'bane', value: true, disabled: true}];
      </script>`);

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each([
    `<mg-input-checkbox label="legend" label-on-top help-text="HelpText Message"></mg-input-checkbox>`,
    `<mg-input-checkbox label="legend" input-vertical-list help-text="HelpText Message"></mg-input-checkbox>`,
    `<mg-input-checkbox label="legend" label-on-top input-vertical-list help-text="HelpText Message"></mg-input-checkbox>`,
    `<mg-input-checkbox label="legend" label-hide></mg-input-checkbox>`,
    `<mg-input-checkbox label="legend" tooltip="Batman is DC Comics license." required help-text="HelpText Message"></mg-input-checkbox>`,
    `<mg-input-checkbox label="legend" tooltip="Batman is DC Comics license." required label-on-top help-text="HelpText Message"></mg-input-checkbox>`
  ])('without tooltip', (html)=>{
    test('render', async () => {
      const page = await createPage(`${html}
        <script>
        const mgInputCheckbox = document.querySelector('mg-input-checkbox');
        mgInputCheckbox.value = [{title: 'batman', value: true}, {title: 'robin', value: false}, {title: 'joker', value: null}, {title: 'bane', value: true, disabled: true}];
        </script>`);

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
