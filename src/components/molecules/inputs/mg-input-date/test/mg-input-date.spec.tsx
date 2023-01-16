import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputDate } from '../mg-input-date';
import messages from '../../../../../locales/en/messages.json';
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
    { label: 'label', identifier: 'identifier', readonly: true, value: '2022-06-02' },
    { label: 'label', identifier: 'identifier', required: true, value: '2022-06-02', helpText: 'My help text' },
    { label: 'label', identifier: 'identifier', required: true, readonly: true, value: '2022-06-02', helpText: 'My help text' },
    { label: 'label', identifier: 'identifier', required: true, disabled: true, value: '2022-06-02', helpText: 'My help text' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', labelOnTop: true },
    { label: 'label', identifier: 'identifier', readonly: true, value: '2022-06-02', lang: 'fr' },
    { label: 'label', identifier: 'identifier', readonly: true, value: '2022-06-02', lang: 'xx' },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  /**
   * Test
   */

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
    }
  });

  test.each(['', ' ', undefined])('Should throw an error with invalid label property : %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required.');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
    }
  });

  test.each([2021, '31-12-2022', '2022-02-24T08:01:44.460Z'])('Should throw an error with invalid value property : %s', async value => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', value });
    } catch (err) {
      expect(err.message).toMatch("<mg-input-date> props 'value' doesn't match pattern: yyyy-mm-dd");
    }
  });

  test('Should emit null value when receive an empty string', async () => {
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

    input.value = '';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(null);
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

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
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
        expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.badInput.replace('{min}', localeDate(min !== undefined ? min : '1900-01-01', 'en')));
      }
      expect(page.rootInstance.valid).toEqual(validity);
      expect(page.rootInstance.invalid).toEqual(!validity);
      if (valueMissing) {
        expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled FALSE
        element[nextState] = true;
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled TRUE
      }
    });
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
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.min.replace('{min}', localeDate(date.middle, 'en')));
    } else if (args.min === undefined && args.max !== undefined) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.max.replace('{max}', localeDate(date.middle, 'en')));
    } else if (args.min !== undefined && args.max !== undefined && args.value === date.first) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.minMax.replace('{min}', localeDate(date.middle, 'en')).replace('{max}', localeDate(date.last, 'en')));
    } else if (args.min !== undefined && args.max !== undefined && args.value === date.last) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.date.minMax.replace('{min}', localeDate(date.first, 'en')).replace('{max}', localeDate(date.middle, 'en')));
    }

    expect(page.rootInstance.valid).toEqual(false);
    expect(page.rootInstance.invalid).toEqual(true);
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
    expect.assertions(1);
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

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => false);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: true,
      })),
    });

    await element.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => false);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing: true,
      })),
    });

    await element.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should remove error on input', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
    Object.defineProperty(input, 'validity', {
      get: jest
        .fn()
        .mockReturnValueOnce({
          valueMissing: true,
        })
        .mockReturnValueOnce({
          valueMissing: true,
        })
        .mockReturnValueOnce({
          valueMissing: false,
        })
        .mockReturnValueOnce({
          valueMissing: false,
        }),
    });

    await element.displayError();

    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

    input.value = '1982-06-02';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toBeUndefined();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(false);
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-date');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true).mockReturnValueOnce(true);
    Object.defineProperty(input, 'validity', {
      get: jest
        .fn()
        .mockReturnValueOnce({
          valueMissing: true,
        })
        .mockReturnValueOnce({
          valueMissing: true,
        })
        .mockReturnValueOnce({
          valueMissing: false,
        })
        .mockReturnValueOnce({
          valueMissing: false,
        }),
    });

    await element.displayError();
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);

    element.required = false;
    await page.waitForChanges();

    // Error message should disapear and change the hasDisplayedError status
    expect(page.rootInstance.hasDisplayedError).toEqual(false);
    expect(page.rootInstance.errorMessage).toBeUndefined();

    element.required = true;
    await page.waitForChanges();

    // If back on required the message is still not displayed
    expect(page.rootInstance.hasDisplayedError).toEqual(false);
    expect(page.rootInstance.errorMessage).toBeUndefined();
  });
});
