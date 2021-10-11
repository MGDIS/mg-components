import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';

const getPage = (args) => newSpecPage({
  components: [MgInputText],
  template: () => (<mg-input-text {...args}></mg-input-text>)
});

describe('mg-input-text', () => {
  test.each([
    {label: 'label', reference: "reference"},
    {label: 'label', labelOnTop: true, reference: "reference"},
    {label: 'label', tooltip: "My Tooltip Message", reference: "reference"},
    {label: 'label', helpText: "My Help Text", reference: "reference"},
    {label: 'label', displayCharacterLeft: false, reference: "reference"},
    {label: 'label', readOnly: true, reference: "reference"},
  ])('Should render with args %s:', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(["", undefined])('Should not render with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-text> prop "label" is required')
    }
  });

  test.each(["", undefined])('Should throw an error when pattern is used with patternErrorMessage: %s', async (value) => {
    try {
      const { root } = await getPage({label: "blu", pattern:'[a-z]*', patternErrorMessage: value});
      expect(root).toMatchSnapshot();
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-text> prop "pattern" must be paired with the prop "patternErrorMessage"')
    }
  });

  test('Should trigger events', async ()=> {
    const inputValue = 'Blu';
    const args = {label: 'label', helpText: "My Help Text", reference: "reference", required: true};
    const page = await getPage(args);

    const element = await page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.focus).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.root.value).toEqual(inputValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.focus).toBeFalsy();
  });

  test.each([
    {validity: true, valueMissing: false, patternMismatch: false},
    {validity: false, valueMissing: true, patternMismatch: false},
    {validity: false, valueMissing: false, patternMismatch: true},
  ])('Should manage validity (%s), valueMissing (%s), patternMismatch (%s)', async ({validity, valueMissing, patternMismatch})=> {
    const args = {label: 'label', helpText: "My Help Text", reference: "reference", patternErrorMessage: "Non"};
    const page = await getPage(args);

    const element = await page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> validity);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing,
      patternMismatch
    }))});

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if(validity) {
      expect(page.rootInstance.errorMessage).toEqual('');
    }
    else if (valueMissing){
      expect(page.rootInstance.errorMessage).toEqual('Ce champs est obligatoire.');
    }
    else if(patternMismatch) {
      expect(page.rootInstance.errorMessage).toEqual(args.patternErrorMessage);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);

  });

});

