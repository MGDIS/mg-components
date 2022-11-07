import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputSelect } from '../mg-input-select';
import { SelectOption } from '../mg-input-select.conf';
import messages from '../../../../../locales/en/messages.json';

const getPage = async args => {
  const page = newSpecPage({
    components: [MgInputSelect],
    template: () => <mg-input-select {...args}></mg-input-select>,
  });

  jest.runAllTimers();

  return page;
};

describe('mg-input-select', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
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
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder' },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder', placeholderHide: true },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder', placeholderDisabled: true },
    { label: 'label', identifier: 'identifier', items: ['blu', 'bli', 'blo', 'bla'], placeholder: 'placeholder', placeholderDisabled: true, value: 'ble' },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier, items: ['blu', 'bli', 'blo', 'bla'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
    }
  });

  test.each(['', ' ', undefined])('Should throw error with invalid label property : %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label, items: ['blu', 'bli', 'blo', 'bla'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required.');
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true, items: ['batman', 'joker'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
    }
  });

  test.each([[['blu', { title: 'blu', value: 'blu' }]], [['blu', { blu: 'blu' }]], [[{ title: 'blu', value: 'blu' }, { blu: 'blu' }]]])(
    'Should throw error with invalid items property : %s',
    async items => {
      expect.assertions(1);
      try {
        await getPage({ label: 'Label', items });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-select> prop "items" is required and all items must be the same type, string or Option.');
      }
    },
  );

  test.each([
    { items: ['batman', 'robin', 'joker', 'bane'], selectedOption: '' },
    { items: ['batman', 'robin', 'joker', 'bane'], selectedOption: 3 },
    {
      items: [
        { title: 'batman', value: 'u' },
        { title: 'robin', value: 'i' },
        { title: 'joker', value: 'o' },
        { title: 'bane', value: 'a' },
      ],
      selectedOption: 2,
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
      selectedOption: 1,
    },
    {
      items: [
        { title: 'batman', value: true },
        { title: 'robin', value: false },
      ],
      selectedOption: 0,
    },
    {
      items: [
        { title: 'blu', value: undefined },
        { title: 'bli', value: 42 },
      ],
      selectedOption: 0,
    },
    {
      items: [
        { title: 'batman', value: { name: 'Batman' } },
        { title: 'robin', value: { name: 'Robin' } },
      ],
      selectedOption: 1,
    },
    {
      items: [
        { title: 'Batman', value: { name: 'Batman', group: 'Heroes' } },
        { title: 'Robin', value: { name: 'Robin', group: 'Heroes' } },
        { title: 'Joker', value: { name: 'Joker', group: 'Super Vilains' } },
        { title: 'Bane', value: { name: 'Bane', group: 'Super Vilains' } },
      ],
      selectedOption: 2,
    },
  ])('Should trigger events for (%s)', async ({ items, selectedOption }) => {
    const args = { label: 'label', items, identifier: 'identifier', helpText: 'My help text', value: 'blu' };
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

    input.value = items[selectedOption]?.title || items[selectedOption] || selectedOption;
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    const expectedEmitValue = selectedOption !== '' ? (typeof items[selectedOption] === 'object' ? (items[selectedOption] as SelectOption).value : items[selectedOption]) : null;
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(expectedEmitValue);
  });

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
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
      if (valueMissing) {
        expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled FALSE
        element[nextState] = true;
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled TRUE
      }
    });
  });

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true, lang });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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

    input.value = 'batman';
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(true);
    expect(page.rootInstance.errorMessage).toBeUndefined();

    input.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.hasDisplayedError).toEqual(false);
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({ label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', required: true });
    const element = page.doc.querySelector('mg-input-select');
    const input = element.shadowRoot.querySelector('select');

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
