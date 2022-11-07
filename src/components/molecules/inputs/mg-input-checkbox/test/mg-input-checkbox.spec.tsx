import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { cloneDeep } from '../../../../../utils/test.utils';
import { MgInputCheckbox } from '../mg-input-checkbox';
import messages from '../../../../../locales/en/messages.json';
import { CheckboxValue } from '../mg-input-checkbox.conf';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputCheckbox],
    template: () => <mg-input-checkbox {...args}></mg-input-checkbox>,
  });

  jest.runAllTimers();
  return page;
};

describe('mg-input-checkbox', () => {
  beforeEach(() => jest.useFakeTimers());

  afterEach(() => jest.runOnlyPendingTimers());

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

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier, value: cloneDeep(items) });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
    }
  });

  test.each(['', ' ', undefined])('Should not render with invalid label property: %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label, value: cloneDeep(items) });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "label" is required.');
    }
  });

  test('Should not render when using labelOnTop and labelHide: %s', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', value: cloneDeep(items), labelOnTop: true, labelHide: true });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide".');
    }
  });

  test('Should not render with invalid value property: %s', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'label', value: ['batman', 'joker', 'bane'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
    }
  });

  test('Should trigger events, case validity check true', async () => {
    const value: CheckboxValue[] = cloneDeep(items) as CheckboxValue[];
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text', value };
    const page = await getPage(args);
    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');
    const input = allInputs[2];

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => true);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: false,
        })),
      });
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

    expect(page.root).toMatchSnapshot(); //Snapshot on blur
  });

  test('Should trigger events, case validity check false', async () => {
    const value: CheckboxValue[] = cloneDeep(items) as CheckboxValue[];
    const args = { label: 'label', identifier: 'identifier', helpText: 'My help text', value };
    const page = await getPage(args);
    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');
    const input = allInputs[0];

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
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

    expect(page.root).toMatchSnapshot(); //Snapshot on blur
  });

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
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
      allInputs.forEach(input => {
        input.checkValidity = jest.fn(() => validity);
        Object.defineProperty(input, 'validity', {
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

      if (valueMissing) {
        expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled FALSE
        element[nextState] = true;
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot(); //Snapshot with readonly/disabled TRUE
      }
    });
  });

  test("display error with displayError component's public method", async () => {
    const value = cloneDeep(items);
    value[0].value = false;
    const page = await getPage({ label: 'label', identifier: 'identifier', value, helpText: 'My help text', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });
    });

    await element.displayError();
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each(['fr', 'xx'])('Should render component with locale: %s', async lang => {
    const value = cloneDeep(items);
    value[0].value = false;
    const page = await getPage({ label: 'label', identifier: 'identifier', value, helpText: 'My help text', required: true, lang });
    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs.forEach(input => {
      input.checkValidity = jest.fn(() => false);
      Object.defineProperty(input, 'validity', {
        get: jest.fn(() => ({
          valueMissing: true,
        })),
      });
    });

    await element.displayError();
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should remove error on input when required change dynamically', async () => {
    const page = await getPage({
      label: 'label',
      identifier: 'identifier',
      value: [
        { title: 'batman', value: false },
        { title: 'robin', value: false },
      ],
      required: true,
    });
    const element = page.doc.querySelector('mg-input-checkbox');
    const allInputs = element.shadowRoot.querySelectorAll('input');

    //mock validity
    allInputs[0].checkValidity = jest
      .fn()
      .mockReturnValueOnce(false) //1
      .mockReturnValueOnce(false) //1
      .mockReturnValueOnce(true) //2
      .mockReturnValueOnce(true) //2
      .mockReturnValueOnce(false) //3
      .mockReturnValueOnce(false); //3
    allInputs[1].checkValidity = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(true); //2
    Object.defineProperty(allInputs[0], 'validity', {
      get: jest
        .fn()
        .mockReturnValueOnce({
          valueMissing: true, //1
        })
        .mockReturnValueOnce({
          valueMissing: false, //2
        })
        .mockReturnValueOnce({
          valueMissing: true, //3
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
