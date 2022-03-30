import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputNumeric } from '../mg-input-numeric';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import { messages } from '../../../../../locales';
import { localeCurrency, localeNumber } from '../../../../../utils/locale.utils';
import { types } from '../mg-input-numeric.conf';

const getPage = (args, slot?) => {
  const page = newSpecPage({
    components: [MgInputNumeric, MgButton, MgIcon],
    template: () => <mg-input-numeric {...args}>{slot}</mg-input-numeric>,
  });
  jest.runAllTimers();
  return page;
};

describe('mg-input-numeric', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  describe.each(types)('type %s', type => {
    test.each([
      { label: 'label', identifier: 'identifier', type },
      { label: 'label', identifier: 'identifier', type, labelHide: true },
      { label: 'label', identifier: 'identifier', type, labelOnTop: true },
      { label: 'label', identifier: 'identifier', type, readonly: true },
      { label: 'label', identifier: 'identifier', type, readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
      { label: 'label', identifier: 'identifier', type, readonly: true, value: '1234567890' },
      { label: 'label', identifier: 'identifier', type, disabled: true, value: '1234567890' },
      { label: 'label', identifier: 'identifier', type, tooltip: 'My Tooltip Message' },
      { label: 'label', identifier: 'identifier', type, tooltip: 'My Tooltip Message', labelOnTop: true },
    ])('Should render with args %s:', async args => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    });

    test.each([
      <mg-button slot="append-input" label="search" identifier="button-identifier">
        <mg-icon icon="calculator"></mg-icon> Calculate
      </mg-button>,
      <span slot="append-input">km</span>,
    ])('Should render with slot.', async slot => {
      const args = { label: 'label', identifier: 'identifier', type };
      const { root } = await getPage(args, slot);
      expect(root).toMatchSnapshot();
    });

    test.each(['', undefined])('Should throw error with invalid label property : %s', async value => {
      try {
        await getPage({ label: value, type });
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

    test('Should throw an error with non positive integer length value', async () => {
      try {
        await getPage({ label: 'label', integerLength: 0 });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-numeric> prop "integer-length" must be a positive number.');
      }
    });

    test('Should throw an error with non positive decimal length value', async () => {
      try {
        await getPage({ label: 'label', decimalLength: 0 });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-numeric> prop "decimal-length" must be a positive number, consider using prop "type" to "integer" instead.');
      }
    });

    test('Should trigger events', async () => {
      const inputValue = '1234567890';
      const args = { label: 'label', identifier: 'identifier', type, helpText: 'My help text' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

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

      input.value = inputValue;
      input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
      await page.waitForChanges();
      expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(parseFloat(inputValue));
    });

    describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
      test.each([
        { validity: true, valueMissing: false },
        { validity: false, valueMissing: true },
      ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
        const args = { label: 'label', identifier: 'identifier', type };
        const page = await getPage(args);

        const element = page.doc.querySelector('mg-input-numeric');
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
        if (valueMissing) {
          expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled FALSE
          element[nextState] = true;
          await page.waitForChanges();
          expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled TRUE
        }
      });
    });

    test.each([
      { label: 'label', identifier: 'identifier', type, min: 10, max: undefined, value: 5 },
      { label: 'label', identifier: 'identifier', type, min: undefined, max: 10, value: 20 },
      { label: 'label', identifier: 'identifier', type, min: 10, max: 20, value: 5 },
      { label: 'label', identifier: 'identifier', type, min: 10, max: 20, value: 25 },
    ])('Should return error when value does not match min and max setting (%s)', async args => {
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      input.checkValidity = jest.fn(() => true);

      input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
      await page.waitForChanges();

      if (args.min !== undefined && args.max === undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.errors.numeric.min
            .replace('{min}', `${type === 'currency' ? localeCurrency(args.min) : localeNumber(args.min)}`)
            .replace('{max}', `${type === 'currency' ? localeCurrency(args.max) : localeNumber(args.max)}`),
        );
      } else if (args.min === undefined && args.max !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.errors.numeric.max
            .replace('{min}', `${type === 'currency' ? localeCurrency(args.min) : localeNumber(args.min)}`)
            .replace('{max}', `${type === 'currency' ? localeCurrency(args.max) : localeNumber(args.max)}`),
        );
      } else if (args.min !== undefined && args.max !== undefined) {
        expect(page.rootInstance.errorMessage).toEqual(
          messages.errors.numeric.minMax
            .replace('{min}', `${type === 'currency' ? localeCurrency(args.min) : localeNumber(args.min)}`)
            .replace('{max}', `${type === 'currency' ? localeCurrency(args.max) : localeNumber(args.max)}`),
        );
      }

      expect(page.rootInstance.valid).toBeFalsy();
      expect(page.rootInstance.invalid).toBeTruthy();
    });

    test('Should filter entered value', async () => {
      const inputValue = '1';
      const args = { label: 'label', identifier: 'identifier', type, helpText: 'My help text' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-numeric');
      const input = element.shadowRoot.querySelector('input');

      //mock validity
      input.checkValidity = jest.fn(() => true);

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

    test("display error with displayError component's public method", async () => {
      const page = await getPage({ label: 'label', identifier: 'identifier', required: true, types });

      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('mg-input-numeric');
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
  });

  test.each(['', undefined])('Should throw error with invalid type property : %s', async type => {
    try {
      await getPage({ label: 'Blu', type });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-numeric> prop "type" must be one of :');
    }
  });
});
