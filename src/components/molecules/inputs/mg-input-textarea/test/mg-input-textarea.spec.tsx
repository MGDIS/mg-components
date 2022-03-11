import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputTextarea } from '../mg-input-textarea';
import { messages } from '../../../../../locales';

const getPage = args =>
  newSpecPage({
    components: [MgInputTextarea],
    template: () => <mg-input-textarea {...args}></mg-input-textarea>,
  });

describe('mg-input-textarea', () => {
  test.each([
    { label: 'label', identifier: 'identifier' },
    { label: 'label', identifier: 'identifier', labelHide: true },
    { label: 'label', identifier: 'identifier', labelOnTop: true },
    { label: 'label', identifier: 'identifier', readonly: true },
    { label: 'label', identifier: 'identifier', readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', readonly: true, value: 'blu' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', undefined])('Should throw error with invalid label property : %s', async value => {
    try {
      await getPage({ label: value });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    try {
      await getPage({ label: 'batman', labelOnTop: true, labelHide: true });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
    }
  });

  test.each(['', undefined])('Should throw an error when pattern is used with patternErrorMessage: %s', async value => {
    try {
      const { root } = await getPage({ label: 'blu', pattern: '[a-z]*', patternErrorMessage: value });
      expect(root).toMatchSnapshot();
    } catch (err) {
      expect(err.message).toMatch('<mg-input-textarea> prop "pattern" must be paired with the prop "patternErrorMessage"');
    }
  });

  test('Should trigger events', async () => {
    const inputValue = 'Blu';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
      })),
    });

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
    { validity: true, valueMissing: false },
    { validity: false, valueMissing: true },
    { validity: false, valueMissing: false, value: 'Blu', pattern: '[a-z]*', patternErrorMessage: 'Non' },
  ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing, value, pattern, patternErrorMessage }) => {
    const args = { label: 'label', identifier: 'identifier', value, pattern, patternErrorMessage };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-textarea');
    const input = element.shadowRoot.querySelector('textarea');

    //mock validity
    input.checkValidity = jest.fn(() => validity);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing,
      })),
    });

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if (validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    } else if (valueMissing) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    } else if (pattern !== undefined) {
      expect(page.rootInstance.errorMessage).toEqual(patternErrorMessage);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });
});
