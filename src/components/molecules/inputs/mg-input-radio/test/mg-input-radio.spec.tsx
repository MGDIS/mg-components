import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputRadio } from '../mg-input-radio';
import { messages } from '../../../../../locales';

const getPage = (args) => newSpecPage({
  components: [MgInputRadio],
  template: () => (<mg-input-radio {...args}></mg-input-radio>)
});

describe('mg-input-radio', () => {
  test.each([
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane']},
    {label: 'label', identifier: "identifier", items: [{ title: 'batman', value: 'u' },{ title: 'robin', value: 'i' }, { title: 'jocker', value: 'o' }, { title: 'bane', value: 'a' }]},
    {label: 'label', identifier: "identifier", items: [{ title: 'batman', value: 1 },{ title: 'robin', value: 2 }, { title: 'jocker', value: 3 }, { title: 'bane', value: 4 }]},
    {label: 'label', identifier: "identifier", items: [{ title: 'batman', value: true },{ title: 'robin', value: false }, { title: 'jocker', value: false }, { title: 'bane', value: false }]},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], labelOnTop: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], labelHide: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], inputVerticalList: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], required: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], readonly: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], disabled: true},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], helpText: 'Hello jocker'},
    {label: 'label', identifier: "identifier", items: ['batman', 'robin', 'jocker', 'bane'], tooltip: "My Tooltip Message"},
  ])('Should render with args %s:', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(["", undefined])('Should throw error with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value, items: ['batman', 'robin', 'jocker', 'bane']});
    }
    catch (err) {
      expect(err.message).toMatch('prop "label" is required')
    }
  });

  test.each([
    [['batman', {title:'batman', value:'batman'}]],
    [['batman', {batman:'batman'}]],
    [[true, false]],
    [[1, 2, 3]],
    [[true, 1, 'batman']],
    [[{title:'batman', value:'batman'}, {batman:'batman'}]],
    [[{title:'batman', value: undefined}, {title:'batman', value: 'test'}]],
  ])('Should throw error with invalid items property : %s', async (items) => {
    try {
      await getPage({label:'Label', items});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-radio> prop "items" is required and all items must be the same type, string or RadioOption.')
    }
  });


    test.each([
      {items: ['batman', 'robin', 'jocker', 'bane'], inputValue: 'batman'},
      {items: [{ title: 'batman', value: 'u' },{ title: 'robin', value: 'i' }, { title: 'jocker', value: 'o' }, { title: 'bane', value: 'a' }], inputValue: 'a'},
      {items: [{ title: 'batman', value: 1 },{ title: 'robin', value: 2 }, { title: 'jocker', value: 3 }, { title: 'bane', value: 4 }], inputValue: 1},
      {items: [{ title: 'batman', value: true },{ title: 'robin', value: false }], inputValue: true}
    ])('Should trigger events for items (%s) with inputValue (%s)', async ({items, inputValue})=> {
    const args = {label: 'label', items , identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-radio');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> true);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing: false,
    }))});

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue.toString();
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);
  });

  test.each([
    {validity: true, valueMissing: false},
    {validity: false, valueMissing: true},
  ])('validity (%s), valueMissing (%s)', async ({validity, valueMissing})=> {
    const args = {label: 'label', items: ['batman', 'robin', 'jocker', 'bane'], identifier: "identifier", patternErrorMessage: "Non"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-radio');
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
