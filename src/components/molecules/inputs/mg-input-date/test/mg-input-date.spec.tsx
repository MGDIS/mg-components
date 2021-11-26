import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputDate } from '../mg-input-date';
import { messages } from '../../../../../locales';

const getPage = (args) => newSpecPage({
  components: [MgInputDate],
  template: () => (<mg-input-date {...args}></mg-input-date>)
});

describe('mg-input-date', () => {

  /**
   * Snapshots
   */
  test.each([
    {label: 'label', identifier: "identifier"},
    {label: 'label', identifier: "identifier", labelOnTop: true},
    {label: 'label', identifier: "identifier", readonly: true},
    {label: 'label', identifier: "identifier", readonly: true, value: "2021-10-15"},
    {label: 'label', identifier: "identifier", tooltip: "My Tooltip Message"},
  ])('Should render with args %s:', async (args) => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  /**
   * Test
   */

   test.each(["", undefined])('Should throw an error with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value});
    }
    catch (err) {
      expect(err.message).toMatch('prop "label" is required')
    }
  });

   test('Should trigger events', async ()=> {
    const inputValue = '2021-10-14';
    const args = {label: 'label', identifier: "identifier", helpText: "My help text"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> true);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing: false,
      badInput: false
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
    {validity: true, valueMissing: false, badInput: false},
    {validity: false, valueMissing: true, badInput: false},
    {validity: false, valueMissing: false, badInput: true},
  ])('validity (%s), valueMissing (%s), badInput (%s)', async ({validity, valueMissing, badInput})=> {
    const args = {label: 'label', identifier: "identifier"};
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(()=> validity);
    Object.defineProperty(input, 'validity', { get: jest.fn(()=> ({
      valueMissing,
      badInput
    }))});

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if(validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    }
    else if (valueMissing){
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    }
    else if(badInput) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.badInput);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });
});
