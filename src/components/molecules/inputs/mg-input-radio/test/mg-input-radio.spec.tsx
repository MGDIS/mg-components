import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputRadio } from '../mg-input-radio';
import { RadioOption } from '../mg-input-radio.conf';
import messages from '../../../../../locales/en/messages.json';

const getPage = args => {
  const page = newSpecPage({
    components: [MgInputRadio],
    template: () => <mg-input-radio {...args}></mg-input-radio>,
  });

  jest.runAllTimers();

  return page;
};

describe('mg-input-radio', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  test.each([
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'] },
    {
      label: 'label',
      identifier: 'identifier',
      items: [
        { title: 'batman', value: 'u' },
        { title: 'robin', value: 'i' },
        { title: 'joker', value: 'o' },
        { title: 'bane', value: 'a' },
      ],
    },
    {
      label: 'label',
      identifier: 'identifier',
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
    },
    {
      label: 'label',
      identifier: 'identifier',
      items: [
        { title: 'batman', value: true },
        { title: 'robin', value: false },
        { title: 'joker', value: false },
        { title: 'bane', value: false },
      ],
    },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], labelOnTop: true },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], labelHide: true },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], inputVerticalList: true },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], required: true },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], readonly: true },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], readonly: true, labelOnTop: true, tooltip: 'Tooltip message' },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], disabled: true },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], helpText: 'Hello joker' },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], tooltip: 'My Tooltip Message' },
    { label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], tooltip: 'My Tooltip Message', labelOnTop: true },
  ])('Should render with args %s:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', undefined])('Should not render with invalid identifier property: %s', async identifier => {
    expect.assertions(1);
    try {
      await getPage({ identifier, items: ['batman', 'robin', 'joker', 'bane'] });
    } catch (err) {
      expect(err.message).toMatch('<mg-input> prop "identifier" is required.');
    }
  });

  test.each(['', ' ', undefined])('Should throw error with invalid label property : %s', async label => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label, items: ['batman', 'robin', 'joker', 'bane'] });
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

  test.each([[['batman']], [[{ title: 'batman', value: 'u' }]]])('Should throw an error with less than 2 items, case %s', async items => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', label: 'batman', labelOnTop: true, labelHide: true, items });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-radio> prop "items" require at least 2 items.');
    }
  });

  test.each([
    [['batman', { title: 'batman', value: 'batman' }]],
    [['batman', { batman: 'batman' }]],
    [[true, false]],
    [[1, 2, 3]],
    [[true, 1, 'batman']],
    [[{ title: 'batman', value: 'batman' }, { batman: 'batman' }]],
    [
      [
        { title: 'batman', value: undefined },
        { title: 'batman', value: 'test' },
      ],
    ],
  ])('Should throw error with invalid items property : %s', async items => {
    expect.assertions(1);
    try {
      await getPage({ label: 'Label', items });
    } catch (err) {
      expect(err.message).toMatch('<mg-input-radio> prop "items" is required and all items must be the same type, string or RadioOption.');
    }
  });

  test.each([
    { items: ['batman', 'robin', 'joker', 'bane'], selectedIndex: 3 },
    {
      items: [
        { title: 'batman', value: 'u' },
        { title: 'robin', value: 'i' },
        { title: 'joker', value: 'o' },
        { title: 'bane', value: 'a' },
      ],
      selectedIndex: 2,
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'robin', value: 2 },
        { title: 'joker', value: 3 },
        { title: 'bane', value: 4 },
      ],
      selectedIndex: 1,
    },
    {
      items: [
        { title: 'batman', value: true },
        { title: 'robin', value: false },
      ],
      selectedIndex: 0,
    },
    {
      items: [
        { title: 'batman', value: { name: 'Batman' } },
        { title: 'robin', value: { name: 'Robin' } },
      ],
      selectedIndex: 1,
    },
  ])('Should trigger events for items (%s) with selectedIndex (%s)', async ({ items, selectedIndex }) => {
    const args = { label: 'label', items, identifier: 'identifier', helpText: 'My help text' };
    const page = await getPage(args);

    const element = page.doc.querySelector('mg-input-radio');
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

    input.value = selectedIndex.toString();
    input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
    await page.waitForChanges();
    const expectedEmitValue = typeof items[selectedIndex] === 'object' ? (items[selectedIndex] as RadioOption).value : items[selectedIndex];
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(expectedEmitValue);
  });

  describe.each(['readonly', 'disabled'])('validity, case next state is %s', nextState => {
    test.each([
      { validity: true, valueMissing: false },
      { validity: false, valueMissing: true },
    ])('validity (%s), valueMissing (%s)', async ({ validity, valueMissing }) => {
      const args = { label: 'label', items: ['batman', 'robin', 'joker', 'bane'], identifier: 'identifier', patternErrorMessage: 'Non' };
      const page = await getPage(args);

      const element = page.doc.querySelector('mg-input-radio');
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

  test("display error with displayError component's public method", async () => {
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], helpText: 'My help text', required: true });

    expect(page.root).toMatchSnapshot();

    const element = page.doc.querySelector('mg-input-radio');
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

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const page = await getPage({ label: 'label', identifier: 'identifier', items: ['batman', 'robin', 'joker', 'bane'], helpText: 'My help text', required: true, lang });
    const element = page.doc.querySelector('mg-input-radio');
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
      items: ['batman', 'robin'],
      required: true,
    });
    const element = page.doc.querySelector('mg-input-radio');
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
