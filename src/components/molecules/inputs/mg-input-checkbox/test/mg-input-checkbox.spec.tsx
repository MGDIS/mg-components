import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { cloneDeep } from '../../../../../utils/test.utils';
import { MgInputCheckbox } from '../mg-input-checkbox';
import { messages } from '../../../../../locales';
import { CheckboxValue } from '../../../../../types/components.types';

const getPage = args =>
  newSpecPage({
    components: [MgInputCheckbox],
    template: () => <mg-input-checkbox {...args}></mg-input-checkbox>,
  });

describe('mg-input-checkbox', () => {
  const items: CheckboxValue[] = [
    { title: 'batman', value: true },
    { title: 'robin', value: false, disabled: true },
    { title: 'joker', value: false },
    { title: 'bane', value: null },
  ];

  test.each([
    { label: 'label', identifier: 'identifier', value: cloneDeep(items) },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), readonly: true },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), labelOnTop: true },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), labelHide: true },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), inputVerticalList: true },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), required: true },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), disabled: true },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), helpText: 'Hello joker' },
    { label: 'label', identifier: 'identifier', value: cloneDeep(items), tooltip: 'Batman is a DC Comics license' },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', undefined])('Should not render with invalid label property : %s', async value => {
    try {
      await getPage({ label: value, value: cloneDeep(items) });
    } catch (err) {
      expect(err.message).toMatch('prop "label" is required');
    }
  });

  test('Should not render with invalid label property : %s', async () => {
    try {
      await getPage({ label: 'label', value: ['batman', 'joker', 'bane'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
    }
  });

  test('Should trigger events, case validity check true', async () => {
    const value: CheckboxValue[] = cloneDeep(items);
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text', value };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const input = element.shadowRoot.querySelectorAll('input')[2];

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

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.checked = true;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    const emittedValue = cloneDeep(items);
    emittedValue[2].value = input.checked;
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(emittedValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus
  });

  test('Should trigger events, case validity check false', async () => {
    const value: CheckboxValue[] = cloneDeep(items);
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text', value };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');
    const input = allInputs[0];

    //mock validity
    allInputs.forEach(i => {
      i.checkValidity = jest.fn(() => false);
      Object.defineProperty(i, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });
    });

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    input.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    input.checked = false;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));

    const emittedValue = cloneDeep(items);
    emittedValue[0].value = input.checked;
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(emittedValue);

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus
  });

  test.each([
    { validity: true, valueMissing: false, value: cloneDeep(items) },
    { validity: false, valueMissing: true, value: cloneDeep(items) },
    { validity: false, valueMissing: false, value: cloneDeep(items) },
  ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing, value }) => {
    const args = { label: 'label', identifier: 'identifier', value, helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');
    const input = allInputs[0];

    //mock validity
    allInputs.forEach(i => {
      i.checkValidity = jest.fn(() => validity);
      Object.defineProperty(i, 'validity', {
        get: jest.fn(() => ({
          valueMissing,
        })),
      });
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
