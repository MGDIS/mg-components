import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputSelect } from '../mg-input-select';
import { messages } from '../../../../../locales';

const getPage = args =>
  newSpecPage({
    components: [MgInputSelect],
    template: () => <mg-input-select {...args}></mg-input-select>,
  });

describe('mg-input-select', () => {
  test.each([
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'] },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], labelHide: true },
    {
      label: 'label',
      identifier: 'identifier',
      items: [
        { title: 'blu', value: 'u' },
        { title: 'bli', value: 'i' },
        { title: 'blo', value: 'o' },
        { title: 'bla', value: 'a' },
      ],
    },
    {
      label: 'label',
      identifier: 'identifier',
      items: [
        { title: 'blu', value: 'u', group: 'blu' },
        { title: 'bli', value: 'i', group: 'blu' },
        { title: 'blo', value: 'o', group: 'blo' },
        { title: 'bla', value: 'a' },
      ],
    },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], labelOnTop: true },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], readonly: true },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], tooltip: 'My Tooltip Message', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', undefined])('Should throw error with invalid label property : %s', async value => {
    try {
      await getPage({ label: value, items: ['blu', 'bli', 'blo', 'bla'] });
    } catch (err) {
      expect(err.message).toMatch('prop "label" is required');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    try {
      await getPage({ label: 'batman', labelOnTop: true, labelHide: true, items: ['batman', 'joker'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
    }
  });

  test.each([[['blu', { title: 'blu', value: 'blu' }]], [['blu', { blu: 'blu' }]], [[{ title: 'blu', value: 'blu' }, { blu: 'blu' }]]])(
    'Should throw error with invalid items property : %s',
    async items => {
      try {
        await getPage({ label: 'Label', items });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-select> prop "items" is required and all items must be the same type, string or Option.');
      }
    },
  );

  test('Should trigger events', async () => {
    const inputValue = 'Blu';
    const args = { label: 'label', items: ['blu', 'bli', 'blo', 'bla'], identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(inputValue);
  });

  test.each([
    { validity: true, valueMissing: false },
    { validity: false, valueMissing: true },
  ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
    const args = { label: 'label', items: ['blu', 'bli', 'blo', 'bla'], identifier: 'identifier', patternErrorMessage: 'Non' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
