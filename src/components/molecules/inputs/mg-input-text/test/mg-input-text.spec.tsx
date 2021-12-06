import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';
import { messages } from '../../../../../locales';

const getPage = (args) => newSpecPage({
  components: [MgInputText],
  template: () => (<mg-input-text {...args}></mg-input-text>)
});

describe('mg-input-text', () => {
  test.each([
    {label: 'label', identifier: "identifier"},
    {label: 'label', identifier: "identifier", labelHide: true},
    {label: 'label', identifier: "identifier", labelOnTop: true},
    {label: 'label', identifier: "identifier", readonly: true},
    {label: 'label', identifier: "identifier", readonly: true, value: "blu"},
    {label: 'label', identifier: "identifier", tooltip: "My Tooltip Message"},
  ])('Should render with args %s:', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(["", undefined])('Should throw error with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value});
    }
    catch (err) {
      expect(err.message).toMatch('prop "label" is required')
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
    const args = {label: 'label', identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> true);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing: false,
      patternMismatch: false
    }))});

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeFalsy();
  });

  test.each([
    {validity: true, valueMissing: false, patternMismatch: false},
    {validity: false, valueMissing: true, patternMismatch: false},
    {validity: false, valueMissing: false, patternMismatch: true},
  ])('validity (%s), valueMissing (%s), patternMismatch (%s)', async ({validity, valueMissing, patternMismatch})=> {
    const args = {label: 'label', identifier: "identifier", patternErrorMessage: "Non"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-text');
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
      expect(page.rootInstance.errorMessage).toBeUndefined();
    }
    else if (valueMissing){
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    }
    else if(patternMismatch) {
      expect(page.rootInstance.errorMessage).toEqual(args.patternErrorMessage);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });

});

