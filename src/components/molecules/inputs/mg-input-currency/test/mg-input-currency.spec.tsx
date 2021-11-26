import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputCurrency } from '../mg-input-currency';
import { messages } from '../../../../../locales';
import { localeCurrency } from '../../../../../utils/locale.utils';

const getPage = (args) => newSpecPage({
  components: [MgInputCurrency],
  template: () => (<mg-input-currency {...args}></mg-input-currency>)
});

describe('mg-input-currency', () => {
  test.each([
    {label: 'label', identifier: "identifier"},
    {label: 'label', identifier: "identifier", labelOnTop: true},
    {label: 'label', identifier: "identifier", readonly: true},
    {label: 'label', identifier: "identifier", readonly: true, value: "1234567890"},
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

  test('Should trigger events', async ()=> {
    const inputValue = '1234567890';
    const args = {label: 'label', identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-currency');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> true);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing: false,
    }))});

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classList.has('is-focused')).toBeFalsy();
  });

  test.each([
    {validity: true, valueMissing: false},
    {validity: false, valueMissing: true},
  ])('validity (%s), valueMissing (%s)', async ({validity, valueMissing})=> {
    const args = {label: 'label', identifier: "identifier"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-currency');
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

  test.each([
    {label: "label", identifier: "identifier", min: 10, max: undefined, value: 5},
    {label: "label", identifier: "identifier", min: undefined, max: 10, value: 20},
    {label: "label", identifier: "identifier", min: 10, max: 20, value: 5},
    {label: "label", identifier: "identifier", min: 10, max: 20, value: 25},
  ])('Should return error when value does not match min and max setting (%s)', async (args)=> {
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-currency');
    const input = element.shadowRoot.querySelector('input');

    input.checkValidity = jest.fn(()=> true);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if(args.min !== undefined && args.max === undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.currency.min.replace('{min}', `${localeCurrency(args.min)}`).replace('{max}', `${localeCurrency(args.max)}`));
    }
    else if(args.min === undefined && args.max !== undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.currency.max.replace('{min}', `${localeCurrency(args.min)}`).replace('{max}', `${localeCurrency(args.max)}`));
    }
    else if(args.min !== undefined && args.max !== undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.currency.minMax.replace('{min}', `${localeCurrency(args.min)}`).replace('{max}', `${localeCurrency(args.max)}`));
    }

    expect(page.rootInstance.valid).toBeFalsy();
    expect(page.rootInstance.invalid).toBeTruthy();
  });

  test('Should filter entered value', async ()=> {
    let inputValue = '1';
    const args = {label: 'label', identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-currency');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> true);

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.value = 'a';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(null);

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));

    input.value = `${inputValue}a`;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));

  });
});
