import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputToggle } from '../mg-input-toggle';
import { messages } from '../../../../../locales';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';

const getPage = (args, slots?) => newSpecPage({
  components: [MgInputToggle, MgIcon],
  template: () => (<mg-input-toggle {...args}>{slots?.map(slot => slot())}</mg-input-toggle>)
});

describe('mg-input-toggle', () => {
  describe.each([
    undefined,
    [() => <span slot="item-1">Choix A</span>, () => <span slot="item-2">Choix B</span>],
    [() => <span slot="item-1"><mg-icon icon="cross"></mg-icon></span>, () => <span slot="item-2"><mg-icon icon="check"></mg-icon></span>]
  ])('template', slots => {
    test.each([
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}]},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], isIcon: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], isOnOff: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], labelOnTop: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], labelHide: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], required: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], readonly: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], disabled: true},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], helpText: 'Hello joker'},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], tooltip: "My Tooltip Message"},
      {label: 'label', identifier: "identifier", items: [{title: 'batman', value: false}, {title: 'joker', value: true}], tooltip: "My Tooltip Message", labelOnTop: true}
    ])('Should render with args %s:', async (args) => {
      const {root} = await getPage(args, slots);
      expect(root).toMatchSnapshot();
    });
  })

  test.each(["", undefined])('Should throw error with invalid label property : %s', async (value) => {
    try {
      await getPage({label:value, items: [{title: 'batman', value: false}, {title: 'joker', value: true}]});
    }
    catch (err) {
      expect(err.message).toMatch('prop "label" is required')
    }
  });

  test('Should throw an error with labelOnTop & labelHide set to true', async () => {
    try {
      await getPage({label: 'batman', labelOnTop: true, labelHide: true, items: ['batman', 'joker']});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"')
    }
  });

  test('Should throw an error with less than 2 items, case %s', async () => {
    try {
      await getPage({label: 'batman', items: [{title: 'batman', value: false}] });
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-toggle> prop "items" require 2 items.')
    }
  });

  test.each([
    [['batman', {title:'batman', value:'batman'}]],
    [['batman', {batman:'batman'}]],
    [[true, false]],
    [[1, 2]],
    [[true, 'batman']],
    [[{title:'batman', value:'batman'}, {batman:'batman'}]],
    [[{title:'batman', value: undefined}, {title:'batman', value: 'test'}]],
  ])('Should throw error with invalid items property : %s', async (items) => {
    try {
      await getPage({label:'Label', items});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue.')
    }
  });


  test.each([
    {items: [{ title: 'batman', value: 'a'}, { title: 'joker', value: 'b' }], expected: 'b', value: undefined},
    {items: [{ title: 'batman', value: 'a'}, { title: 'joker', value: 'b' }], expected: 'a', value: 'b'},
    {items: [{ title: 'batman', value: 1}, { title: 'joker', value: 2 }], expected: 2, value: 1},
    {items: [{ title: 'batman', value: false },{ title: 'robin', value: true }], expected: false, value: true}
  ])('Should trigger events for items with inputValue : %s', async ({items, expected, value})=> {
    const args = {label: 'label', items , identifier: "identifier", helpText: "My help text", value};
    const page = await getPage(args);

    const button = page.doc.querySelector('button');

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    button.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(expected);
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledTimes(1);
  });

  test.each([
    {validity: true, valueMissing: false},
    {validity: false, valueMissing: true},
  ])('validity (%s), valueMissing (%s)', async ({validity, valueMissing})=> {
    const value = valueMissing ? undefined : true;
    const args = {label: 'label', items: [{title: 'batman', value: false}, {title: 'joker', value: true}], identifier: "identifier", patternErrorMessage: "Non", value};

    const page = await getPage(args);

    const button = page.doc.querySelector('button');

    button.dispatchEvent(new CustomEvent('blur', { bubbles: true }));
    await page.waitForChanges();

    if(validity) {
      expect(page.rootInstance.errorMessage).toBeUndefined();
    }
    else if (valueMissing){
      expect(page.rootInstance.errorMessage).toEqual(messages.errors.required);
    }
    expect(page.rootInstance.valid).toEqual(validity);
    expect(page.rootInstance.invalid).toEqual(!validity);
  });

  describe('keyboard', () => {
    test.each(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'])('should trigger toggle, case KeyDown %s', async (key) => {
      const args = {label: 'label', items: [{title: 'batman', value: false}, {title: 'joker', value: true}], identifier: "identifier"};

      const page = await getPage(args);

      const button = page.doc.querySelector('button');

      button.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.rootInstance.value).toBeUndefined();

      button.dispatchEvent(new KeyboardEvent('keydown', {'code': key}));
      await page.waitForChanges();

      expect(page.rootInstance.value).toEqual("");
    })

    test.each(['Space', 'Enter'])('should NOT trigger toggle, case KeyDown %s', async (key) => {
      const args = {label: 'label', items: [{title: 'batman', value: false}, {title: 'joker', value: true}], identifier: "identifier"};

      const page = await getPage(args);

      const button = page.doc.querySelector('button');

      button.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
      await page.waitForChanges();

      expect(page.rootInstance.value).toBeUndefined();

      button.dispatchEvent(new KeyboardEvent('keydown', {'code': key}));
      await page.waitForChanges();

      expect(page.rootInstance.value).toBeUndefined();
    })
  })
});
