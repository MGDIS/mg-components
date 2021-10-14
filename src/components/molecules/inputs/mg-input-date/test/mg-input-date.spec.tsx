import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputDate } from '../mg-input-date';
import locale from '../../../../../locales';

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
    const inputValue = '2021-10-14';
    const args = {label: 'label', helpText: "My Help Text", identifier: "identifier", required: true};
    const page = await getPage(args);

    const element = await page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

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
    {validity: true, valueMissing: false, badInput: false},
    {validity: false, valueMissing: true, badInput: false},
    {validity: false, valueMissing: false, badInput: true},
  ])('validity (%s), valueMissing (%s), badInput (%s)', async ({validity, valueMissing, badInput})=> {
    const args = {label: 'label', helpText: "My Help Text", identifier: "identifier"};
    const page = await getPage(args);

    const element = await page.doc.querySelector('mg-input-date');
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
      expect(page.rootInstance.errorMessage).toEqual(locale.errors.required);
    }
    else if(badInput) {
      expect(page.rootInstance.errorMessage).toEqual(locale.errors.date.badInput);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });
});
