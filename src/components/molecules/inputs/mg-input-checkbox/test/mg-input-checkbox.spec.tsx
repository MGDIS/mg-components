import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputCheckbox } from '../mg-input-checkbox';
import { messages } from '../../../../../locales';

const getPage = (args) => newSpecPage({
  components: [MgInputCheckbox],
  template: () => (<mg-input-checkbox {...args}></mg-input-checkbox>)
});

describe('mg-input-checkbox', () => {
  test.each([
    {label: 'label', identifier: "identifier"},
    {label: 'label', identifier: "identifier", labelOnTop: true},
    {label: 'label', identifier: "identifier", readonly: true},
    {label: 'label', identifier: "identifier", readonly: true, value: true},
    {label: 'label', identifier: "identifier", readonly: true, value: false},
    {label: 'label', identifier: "identifier", tooltip: "My Tooltip Message"},
    {label: 'label', identifier: "identifier", tooltip: "My Tooltip Message", indeterminate: true},
    {label: 'label', identifier: "identifier", tooltip: "My Tooltip Message", indeterminate: true, readonly: true},
    {label: 'label', identifier: "identifier", tooltip: "My Tooltip Message", indeterminate: true, value: null},
  ])('Should render with args %s:', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(["", undefined])('Should not render with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value});
    }
    catch (err) {
      expect(err.message).toMatch('prop "label" is required')
    }
  });

  test('Should trigger events', async ()=> {
    const inputValue = false;
    const args = {label: 'label', identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> true);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing: false
    }))});

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue.toString();
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeFalsy();
  });

  test.each([
    {validity: true, valueMissing: false},
    {validity: false, valueMissing: true},
    {validity: false, valueMissing: false, value:"Blu"},
  ])('validity (%s), valueMissing (%s)', async ({validity, valueMissing, value})=> {
    const args = {label: 'label', identifier: "identifier", value};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> validity);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing,
    }))});

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if(validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    }
    else if (valueMissing){
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });

});

