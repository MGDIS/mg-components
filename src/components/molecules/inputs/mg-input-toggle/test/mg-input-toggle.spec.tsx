import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgInputToggle } from '../mg-input-toggle';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';

const getPage = (args, slots?) =>
  newSpecPage({
    components: [MgInputToggle, MgIcon],
    template: () => <mg-input-toggle {...args}>{slots && slots.map(slot => slot())}</mg-input-toggle>,
  });

const defaultSlots = [() => <span slot="item-1">Batman</span>, () => <span slot="item-2">Joker</span>];
const onOffSlots = [() => <span slot="item-1">Non</span>, () => <span slot="item-2">Oui</span>];
const iconSlots = [
  () => (
    <span slot="item-1">
      <mg-icon icon="cross"></mg-icon>
    </span>
  ),
  () => (
    <span slot="item-2">
      <mg-icon icon="check"></mg-icon>
    </span>
  ),
];

const defaultProps = {
  label: 'label',
  identifier: 'identifier',
  items: [
    { title: 'batman', value: false },
    { title: 'joker', value: true },
  ],
};

describe('mg-input-toggle', () => {
  describe.each([
    {
      props: {
        ...defaultProps,
      },
      slots: defaultSlots,
    },
    {
      props: {
        ...defaultProps,
        value: '',
      },
      slots: defaultSlots,
    },
    {
      props: {
        ...defaultProps,
        value: true,
      },
      slots: defaultSlots,
    },
    {
      props: {
        ...defaultProps,
        value: 'true',
      },
      slots: defaultSlots,
    },
    {
      props: {
        ...defaultProps,
        isOnOff: false,
      },
      slots: onOffSlots,
    },
    {
      props: {
        ...defaultProps,
        isIcon: true,
        isOnOff: true,
      },
      slots: iconSlots,
    },
  ])('template', ({ props, slots }) => {
    test.each([
      {
        ...props,
      },
      {
        ...props,
        labelOnTop: true,
      },
      {
        ...props,
        labelHide: true,
      },
      {
        ...props,
        readonly: true,
      },
      {
        ...props,
        disabled: true,
      },
      {
        ...props,
        helpText: 'Hello joker',
      },
      {
        ...props,
        tooltip: 'My Tooltip Message',
      },
      {
        ...props,
        tooltip: 'My Tooltip Message',
        labelOnTop: true,
      },
    ])('Should render with args %s:', async args => {
      const { root } = await getPage(args, slots);
      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each(['', undefined])('Should throw error with invalid label property : %s', async value => {
      try {
        await getPage(
          {
            label: value,
            items: [
              { title: 'batman', value: false },
              { title: 'joker', value: true },
            ],
          },
          defaultSlots,
        );
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "label" is required');
      }
    });

    test('Should throw an error with labelOnTop & labelHide set to true', async () => {
      try {
        await getPage({ label: 'batman', labelOnTop: true, labelHide: true, items: ['batman', 'joker'] }, defaultSlots);
      } catch (err) {
        expect(err.message).toMatch('<mg-input> prop "labelOnTop" must not be paired with the prop "labelHide"');
      }
    });

    test('Should throw an error with less than 2 items, case %s', async () => {
      try {
        await getPage({ label: 'batman', items: [{ title: 'batman' }] }, defaultSlots);
      } catch (err) {
        expect(err.message).toMatch('<mg-input-toggle> prop "items" require 2 items.');
      }
    });

    test.each([undefined, [defaultSlots[0]], [...defaultSlots, ...defaultSlots]])('Should throw an error with blank slots', async () => {
      try {
        await getPage({ label: 'batman', items: ['batman', 'joker'] });
      } catch (err) {
        expect(err.message).toMatch('<mg-input-toggle> 2 slots are required.');
      }
    });

    test.each([
      [['batman', { title: 'batman', value: 'batman' }]],
      [['batman', { batman: 'batman' }]],
      [[true, false]],
      [[1, 2]],
      [[true, 'batman']],
      [[{ title: 'batman', value: 'batman' }, { batman: 'batman' }]],
      [
        [
          { title: 'batman', value: undefined },
          { title: 'batman', value: 'test' },
        ],
      ],
    ])('Should throw error with invalid items property : %s', async items => {
      try {
        await getPage({ label: 'Label', items }, defaultSlots);
      } catch (err) {
        expect(err.message).toMatch('<mg-input-toggle> prop "items" is required and all items must be the same type: ToggleValue.');
      }
    });
  });

  test.each([
    {
      items: [
        { title: 'batman', value: 'a' },
        { title: 'joker', value: 'b' },
      ],
      expected: 'b',
      value: undefined,
    },
    {
      items: [
        { title: 'batman', value: 'a' },
        { title: 'joker', value: 'b' },
      ],
      expected: 'a',
      value: 'b',
    },
    {
      items: [
        { title: 'batman', value: 1 },
        { title: 'joker', value: 2 },
      ],
      expected: 2,
      value: 1,
    },
    {
      items: [
        { title: 'batman', value: false },
        { title: 'robin', value: true },
      ],
      expected: false,
      value: true,
    },
  ])('Should trigger events for items with inputValue : %s', async ({ items, expected, value }) => {
    const args = { label: 'label', items, identifier: 'identifier', helpText: 'My help text', value };
    const page = await getPage(args, defaultSlots);

    const mgInputToogle = page.doc.querySelector('mg-input-toggle');
    const button = mgInputToogle.shadowRoot.querySelector('button');

    jest.spyOn(page.rootInstance.valueChange, 'emit');

    button.dispatchEvent(new CustomEvent('focus', { bubbles: true }));
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot(); //Snapshot on focus

    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledWith(expected);
    expect(page.rootInstance.valueChange.emit).toHaveBeenCalledTimes(1);
  });
});
