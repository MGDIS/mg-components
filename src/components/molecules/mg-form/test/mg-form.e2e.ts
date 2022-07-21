import { createPage } from '../../../../utils/test.utils';

const inputs = `<mg-input-checkbox identifier="mg-input-checkbox" label="mg-input-checkbox label"></mg-input-checkbox>
<mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
<mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>
<mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>
<mg-input-radio identifier="mg-input-radio" label="mg-input-radio label"></mg-input-radio>
<mg-input-select identifier="mg-input-select" label="mg-input-select label"></mg-input-select>
<mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
<mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>
<mg-input-toggle identifier="mg-input-toggle" label="mg-input-toggle label">
  <span slot="item-1">non</span>
  <span slot="item-2">oui</span>
</mg-input-toggle>`;

const inputsScript = `<script>
  const mgInputCheckbox = document.querySelector('mg-input-checkbox');
  const mgInputDate = document.querySelector('mg-input-date');
  const mgInputNumeric = document.querySelector('mg-input-numeric');
  const mgInputPassword = document.querySelector('mg-input-password');
  const mgInputRadio = document.querySelector('mg-input-radio');
  const mgInputSelect = document.querySelector('mg-input-select');
  const mgInputText = document.querySelector('mg-input-text');
  const mgInputTextarea = document.querySelector('mg-input-textarea');
  const mgInputToggle = document.querySelector('mg-input-toggle');

  mgInputCheckbox.value = [
    { title: 'oui', value: false },
    { title: 'non', value: false },
  ];
  mgInputRadio.items = ['blu', 'bli', 'bla', 'blo'];
  mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
  mgInputToggle.items = [
    { title: 'non', value: false },
    { title: 'oui', value: true },
  ];
</script>`;

const inputsScriptSetValues = `<script>
  mgInputCheckbox.value = [
    { title: 'oui', value: true },
    { title: 'non', value: false },
  ];
  mgInputDate.value = '2022-04-15';
  mgInputNumeric.value = 1234567890;
  mgInputPassword.value = 'p455w0rD';
  mgInputRadio.value = mgInputRadio.items[0];
  mgInputSelect.value = mgInputSelect.items[0];
  mgInputText.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  mgInputTextarea.value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  mgInputToggle.value = mgInputToggle.items[1].value;
</script>`;

const inputsScriptRequiredAll = `<script>
  mgInputCheckbox.required = true;
  mgInputDate.required = true;
  mgInputNumeric.required = true;
  mgInputPassword.required = true;
  mgInputRadio.required = true;
  mgInputSelect.required = true;
  mgInputText.required = true;
  mgInputTextarea.required = true;
</script>`;

const inputsScriptRequiredSome = `<script>
  mgInputCheckbox.required = true;
  mgInputNumeric.required = true;
  mgInputRadio.required = true;
  mgInputText.required = true;
</script>`;

describe('mg-form', () => {
  describe.each([`<mg-form>`, `<mg-form disabled>`, `<mg-form readonly>`])('params %s', startTag => {
    test('Should render', async () => {
      const page = await createPage(`${startTag}
        ${inputs}
        </mg-form>
        ${inputsScript}
        ${inputsScriptSetValues}`);

      const element = await page.find('mg-form');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });

  describe.each(['<mg-form>', '<mg-form lang="fr">'])('With different locale', startTag => {
    describe.each([inputsScriptRequiredAll, inputsScriptRequiredSome])('Should render required and errors', inputsScriptRequired => {
      test('Should render errors', async () => {
        const page = await createPage(`${startTag}
        ${inputs}
        </mg-form>
        ${inputsScript}
        ${inputsScriptRequired}`);

        const element = await page.find('mg-form');
        expect(element).toHaveClass('hydrated');

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

        await element.callMethod('displayError');
        await page.waitForChanges();

        const screenshotErrors = await page.screenshot();
        expect(screenshotErrors).toMatchImageSnapshot();
      });
    });
  });
});
