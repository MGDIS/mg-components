import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputPassword } from '../mg-input-password';
import { messages } from '../../../../../locales';

const getPage = args =>
  newSpecPage({
    components: [MgInputPassword],
    template: () => <mg-input-password {...args}></mg-input-password>,
  });

describe('mg-input-password', () => {
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
      expect(err.message).toMatch('prop "label" is required');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    try {
      await getPage({ label: 'batman', labelOnTop: true, labelHide: true });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
    }
  });

  test('Should trigger events', async () => {
    const inputValue = 'Blu';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-password');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
        patternMismatch: false,
      })),
    });

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.value = inputValue;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);
  });

  test.each([
    { validity: true, valueMissing: false },
    { validity: false, valueMissing: true },
    { validity: false, valueMissing: false },
  ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
    const args = { label: 'label', identifier: 'identifier', patternErrorMessage: 'Non' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-password');
    const input = element.shadowRoot.querySelector('input');

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
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });
});