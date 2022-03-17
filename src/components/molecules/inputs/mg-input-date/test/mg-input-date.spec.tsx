import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputDate } from '../mg-input-date';
import { messages } from '../../../../../locales';
import { localeDate } from '../../../../../utils/locale.utils';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputDate],
    template: () => <mg-input-date {...args}></mg-input-date>,
  });
  jest.runAllTimers();
  return page;
};

const date = {
  first: '2021-01-01',
  middle: '2022-01-01',
  last: '2023-01-01',
};

describe('mg-input-date', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  /**
   * Snapshots
   */
  test.each([
    { label: 'label', identifier: 'identifier' },
    { label: 'label', identifier: 'identifier', labelHide: true },
    { label: 'label', identifier: 'identifier', labelOnTop: true },
    { label: 'label', identifier: 'identifier', readonly: true },
    { label: 'label', identifier: 'identifier', readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', readonly: true, value: '2021-10-15' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  /**
   * Test
   */

  test.each(['', undefined])('Should throw an error with invalid label property : %s', async value => {
    try {
      await getPage({ label: value });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required');
    }
  });

  test.each(['', 2021, '31-12-2022', '2022-02-24T08:01:44.460Z'])('Should throw an error with invalid value property : %s', async value => {
    try {
      await getPage({ label: 'label', value });
    } catch (err) {
      expect(err.message).toMatch("<mg-input-date> props 'value' doesn't match pattern: yyyy-mm-dd");
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
    const inputValue = '2021-10-14';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => true);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: false,
        badInput: false,
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
    { validity: true, valueMissing: false, badInput: false },
    { validity: false, valueMissing: true, badInput: false },
    { validity: false, valueMissing: false, badInput: true },
    { validity: false, valueMissing: false, badInput: true, min: date.first },
  ])('validity (%s), valueMissing (%s), badInput (%s)', async ({ validity, valueMissing, badInput, min }) => {
    const args = { label: 'label', identifier: 'identifier', min };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => validity);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing,
        badInput,
      })),
    });

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if (validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    } else if (valueMissing) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    } else if (badInput) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.badInput.replace('{min}', min !== undefined ? localeDate(min) : '01/01/1900'));
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });

  test.each([
    { label: 'label', identifier: 'identifier', min: date.middle, max: undefined, value: date.first },
    { label: 'label', identifier: 'identifier', min: undefined, max: date.middle, value: date.last },
    { label: 'label', identifier: 'identifier', min: date.middle, max: date.last, value: date.first },
    { label: 'label', identifier: 'identifier', min: date.first, max: date.middle, value: date.last },
  ])('Should return error when value does not match min and max setting (%s)', async args => {
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    const rangeUnderflow = new Date(args.value) < new Date(args.min);
    const rangeOverflow = new Date(args.value) > new Date(args.max);

    //mock validity
    input.checkValidity = jest.fn(() => !(rangeUnderflow || rangeOverflow));
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        rangeUnderflow,
        rangeOverflow,
      })),
    });

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if (args.min !== undefined && args.max === undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.min.replace('{min}', localeDate(date.middle)));
    } else if (args.min === undefined && args.max !== undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.max.replace('{max}', localeDate(date.middle)));
    } else if (args.min !== undefined && args.max !== undefined && args.value === date.first) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.minMax.replace('{min}', localeDate(date.middle)).replace('{max}', localeDate(date.last)));
    } else if (args.min !== undefined && args.max !== undefined && args.value === date.last) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.minMax.replace('{min}', localeDate(date.first)).replace('{max}', localeDate(date.middle)));
    }

    expect(page.rootInstance.valid).toBeFalsy();
    expect(page.rootInstance.invalid).toBeTruthy();
  });
  test.each([
    { min: '', max: undefined },
    { min: '2022/01/01', max: undefined },
    { min: '01/01/2022', max: undefined },
    { min: '2022', max: undefined },
    { min: undefined, max: '' },
    { min: undefined, max: '2022/01/01' },
    { min: undefined, max: '01/01/2022' },
    { min: undefined, max: '2022' },
  ])('Should return error when value does not match min and max setting (%s)', async minMax => {
    try {
      await getPage({
        label: 'label',
        identifier: 'identifier',
        ...minMax,
      });
    } catch (err) {
      expect(err.message).toBe("<mg-input-date> props 'min/max' doesn't match pattern: yyyy-mm-dd");
    }
  });
});
