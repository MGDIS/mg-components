import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputText } from '../mg-input-text';
import { MgButton } from '../../../../atoms/mg-button/mg-button';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import { messages } from '../../../../../locales';

const getPage = (args, content?) => {
  const page = newSpecPage({
    components: [MgInputText, MgButton, MgIcon],
    template: () => <mg-input-text {...args}>{content}</mg-input-text>,
  });

  jest.runAllTimers();

  return page;
};

describe('mg-input-text', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  test.each([
    { label: 'label', identifier: 'identifier' },
    { label: 'label', identifier: 'identifier', labelHide: true },
    { label: 'label', identifier: 'identifier', labelOnTop: true },
    { label: 'label', identifier: 'identifier', readonly: true },
    { label: 'label', identifier: 'identifier', type: 'search' },
    { label: 'label', identifier: 'identifier', type: 'search', icon: 'magnifying-glass' },
    { label: 'label', identifier: 'identifier', readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', readonly: true, value: 'blu' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', tooltip: 'My Tooltip Message', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each([
    <mg-button slot="append-input" label="search" identifier="identifier">
      <mg-icon icon="magnifying-glass"></mg-icon> Search
    </mg-button>,
    <span slot="append-input">test</span>,
  ])('Should render with slot.', async slot => {
    const args = { label: 'label', identifier: 'identifier', type: 'search' };

    const page = await getPage(args, slot);
    expect(page.root).toMatchSnapshot();
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

  test.each(['', undefined])('Should throw an error when pattern is used with patternErrorMessage: %s', async value => {
    try {
      const { root } = await getPage({ label: 'blu', pattern: '[a-z]*', patternErrorMessage: value });
      expect(root).toMatchSnapshot();
    } catch (err) {
      expect(err.message).toMatch('<mg-input-text> prop "pattern" must be paired with the prop "patternErrorMessage"');
    }
  });

  test('Should trigger events', async () => {
    const inputValue = 'Blu';
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-text');
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
    { validity: true, valueMissing: false, patternMismatch: false },
    { validity: false, valueMissing: true, patternMismatch: false },
    { validity: false, valueMissing: false, patternMismatch: true },
  ])('validity (%s), valueMissing (%s), patternMismatch (%s)', async ({ validity, valueMissing, patternMismatch }) => {
    const args = { label: 'label', identifier: 'identifier', patternErrorMessage: 'Non' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-text');
    const input = element.shadowRoot.querySelector('input');

    //mock validity
    input.checkValidity = jest.fn(() => validity);
    Object.defineProperty(input, 'validity', {
      get: jest.fn(() => ({
        valueMissing,
        patternMismatch,
      })),
    });

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if (validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    } else if (valueMissing) {
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    } else if (patternMismatch) {
      expect(page.rootInstance.errorMessage).toEqual(args.patternErrorMessage);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });
});
