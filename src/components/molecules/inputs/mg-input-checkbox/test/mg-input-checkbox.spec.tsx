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
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane']},
    {label: 'label', identifier: "identifier", items: [{ title: 'batman', value: 'u' },{ title: 'robin', value: 'i', indeterminate: true, }, { title: 'jocker', value: 'o', disabled: true, }, { title: 'bane', value: 'a' }]},
    {label: 'label', identifier: "identifier", items: [{ title: 'batman', value: 'u' },{ title: 'robin', value: 'i', indeterminate: true, }, { title: 'jocker', value: 'o', disabled: true, }, { title: 'bane', value: 'a' }], readonly: true, value: [{title: 'batman', value: 'u'}]},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], labelOnTop: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], labelColon: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], labelHide: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], inputVerticalList: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], required: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], readonly: true, value: ['batman', 'jocker']},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], disabled: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], helpText: 'Hello jocker'},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], tooltip: "My Tooltip Message"},
  ])('Should render with args %s:', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(["", undefined])('Should not render with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value, items: ['batman']});
    }
    catch (err) {
      expect(err.message).toMatch('prop "label" is required')
    }
  });

  test.each(["", undefined])('Should not render with invalid label property : %s', async (value) => {
    try {
      await getPage({items:value});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-checkbox> prop "items" is required and all items must be the same type, string or Option.')
    }
  });

  test('Should trigger events, case validity check true', async ()=> {
    const args = {label: 'label', identifier: "identifier", helpText: "My help text", items: [{ title: 'batman', value: false },{ title: 'robin', value: true}, { title: 'jocker', value: false }, { title: 'bane', value: false }]};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing: false
    }))});

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.checked = true;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith([{title: 'batman', value: false}]);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeFalsy();
  });

  test('Should trigger events, case validity check false', async ()=> {
    const args = {label: 'label', identifier: "identifier", helpText: "My help text", items: [{ title: 'batman', value: false },{ title: 'robin', value: false, disabled: true}, { title: 'jocker', value: false }, { title: 'bane', value: false }], value: [{ title: 'batman', value: false }]};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');
    const input = allInputs[0];

    //mock validity
    allInputs.forEach(i => {
      i.checkValidity = jest.fn(() => false);
      Object.defineProperty(i, 'validity', { get: jest.fn(()=> ({
        valueMissing: true
      }))});
    });

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.checked = false;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith([]);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeFalsy();
  });

  test.each([
    {validity: true, valueMissing: false},
    {validity: false, valueMissing: true},
    {validity: false, valueMissing: false, value:[{ title: 'batman', value: false }]},
  ])('validity (%s), valueMissing (%s)', async ({validity, valueMissing, value})=> {
    const args = {label: 'label', identifier: "identifier", value, helpText: "My help text", items: [{ title: 'batman', value: false },{ title: 'robin', value: false, disabled: true}, { title: 'jocker', value: false }, { title: 'bane', value: false }]};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');
    const input = allInputs[0];

    //mock validity
    allInputs.forEach(i => {
      i.checkValidity = jest.fn(() => validity);
      Object.defineProperty(i, 'validity', { get: jest.fn(()=> ({
        valueMissing
      }))});
    });

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

