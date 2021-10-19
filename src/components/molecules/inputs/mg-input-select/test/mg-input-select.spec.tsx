import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputSelect } from '../mg-input-select';
import locale from '../../../../../locales';

const getPage = (args) => newSpecPage({
  components: [MgInputSelect],
  template: () => (<mg-input-select {...args}></mg-input-select>)
});

describe('mg-input-select', () => {
  test.each([
    {label: 'label', identifier: "identifier"},
    {label: 'label', identifier: "identifier", items: ['blu', 'bli', 'blo', 'bla']},
    {label: 'label', identifier: "identifier", items: [{ title: 'blu', value: 'u' },{ title: 'bli', value: 'i' }, { title: 'blo', value: 'o' }, { title: 'bla', value: 'a' }]},
    {label: 'label', identifier: "identifier", items: ['blu', 'bli', 'blo', 'bla'], labelOnTop: true},
    {label: 'label', identifier: "identifier", readonly: true},
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

  test.each([
    [['blu', {title:'blu', value:'blu'}]],
    [['blu', {blu:'blu'}]],
    [[{title:'blu', value:'blu'}, {blu:'blu'}]],
  ])('Should throw error with invalid items property : %s', async (items) => {
    try {
      await getPage({label:'Label', items});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-select> prop "items" all items must be the same type, string or Option.')
    }
  });

  test('Should trigger events', async ()=> {
    const inputValue = 'Blu';
    const args = {label: 'label', identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = await page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

    jest.spyOn(page.rootInstance.inputChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classes.has('is-focused')).toBeTruthy();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.inputChange.emit).toHaveBeenCalledWith(inputValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.classes.has('is-focused')).toBeFalsy();
  });

  test.each([
    {validity: true, valueMissing: false},
    {validity: false, valueMissing: true},
  ])('validity (%s), valueMissing (%s)', async ({validity, valueMissing})=> {
    const args = {label: 'label', identifier: "identifier", patternErrorMessage: "Non"};
    const page = await getPage(args);

    const element = await page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
      expect(page.rootInstance.errorMessage).toEqual(locale.errors.required);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });

});
