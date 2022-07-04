import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgForm } from '../mg-form';
import { MgInputCheckbox } from '../../inputs/mg-input-checkbox/mg-input-checkbox';
import { MgInputDate } from '../../inputs/mg-input-date/mg-input-date';
import { MgInputNumeric } from '../../inputs/mg-input-numeric/mg-input-numeric';
import { MgInputPassword } from '../../inputs/mg-input-password/mg-input-password';
import { MgInputRadio } from '../../inputs/mg-input-radio/mg-input-radio';
import { MgInputSelect } from '../../inputs/mg-input-select/mg-input-select';
import { MgInputText } from '../../inputs/mg-input-text/mg-input-text';
import { MgInputTextarea } from '../../inputs/mg-input-textarea/mg-input-textarea';
import { MgInputToggle } from '../../inputs/mg-input-toggle/mg-input-toggle';
import { HTMLMgInputsElement } from '../../inputs/MgInput.conf';

const getPage = (args, content?) => {
  const page = newSpecPage({
    components: [MgForm, MgInputCheckbox, MgInputDate, MgInputNumeric, MgInputPassword, MgInputRadio, MgInputSelect, MgInputText, MgInputTextarea, MgInputToggle],
    template: () => <mg-form {...args}>{content}</mg-form>,
  });

  jest.runAllTimers();

  return page;
};

const getSlottedContent = () => [
  <mg-input-checkbox
    identifier="mg-input-checkbox"
    label="mg-input-checkbox label"
    value={[
      { title: 'oui', value: true },
      { title: 'non', value: false },
    ]}
  ></mg-input-checkbox>,
  <mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>,
  <mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>,
  <mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>,
  <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-radio>,
  <mg-input-select identifier="mg-input-select" label="mg-input-select label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-select>,
  <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>,
  <mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>,
  <mg-input-toggle
    identifier="mg-input-toggle"
    label="mg-input-toggle label"
    items={[
      { title: 'non', value: false },
      { title: 'oui', value: true },
    ]}
  >
    <span slot="item-1">non</span>
    <span slot="item-2">oui</span>
  </mg-input-toggle>,
];

describe('mg-form', () => {
  beforeEach(() => jest.useFakeTimers());

  afterEach(() => jest.runOnlyPendingTimers());

  test.each([
    { args: { identifier: 'identifier' } },
    { args: { identifier: 'identifier', readonly: true } },
    { args: { identifier: 'identifier', disabled: true } },
    { args: { identifier: 'identifier' }, requiredIndex: 'one' },
    { args: { identifier: 'identifier' }, requiredIndex: 'all' },
  ])('Should render with args %s:', async ({ args, requiredIndex }) => {
    const slot = getSlottedContent();
    if (requiredIndex === 'one') slot[0].$attrs$.required = true;
    else if (requiredIndex === 'all') {
      slot.forEach(s => {
        s.$attrs$.required = true;
      });
    }
    const { root } = await getPage(args, slot);
    expect(root).toMatchSnapshot();
  });

  test.each([false, true])('Should display components errors (readonly: %s)', async readonly => {
    const args = { identifier: 'identifier', readonly };

    const slot = getSlottedContent();
    // Set all elements required
    slot.forEach(s => {
      s.$attrs$.required = true;
    });

    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');

    if (!readonly) {
      // Mock all input validity
      const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter(
        (node: Node) => node.nodeName.startsWith('MG-INPUT-') && node.nodeName !== 'MG-INPUT-TOGGLE',
      ) as HTMLMgInputsElement[];
      mgInputs.forEach(input => {
        const shadowInputs = input.shadowRoot.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>;
        shadowInputs.forEach(input => {
          input.checkValidity = jest.fn(() => false);
          Object.defineProperty(input, 'validity', {
            get: jest.fn(() => ({
              valueMissing: true,
            })),
          });
        });
      });
    }

    await mgForm.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test.each(['fr', 'xx'])('display error message with locale: %s', async lang => {
    const args = { identifier: 'identifier', lang };

    const slot = getSlottedContent();
    // Set all elements required
    slot.forEach(s => {
      s.$attrs$.required = true;
    });

    const page = await getPage(args, slot);
    const mgForm = page.doc.querySelector('mg-form');

    // Mock all input validity
    const mgInputs = Array.from(mgForm.querySelectorAll('*')).filter(
      (node: Node) => node.nodeName.startsWith('MG-INPUT-') && node.nodeName !== 'MG-INPUT-TOGGLE',
    ) as HTMLMgInputsElement[];
    mgInputs.forEach(input => {
      const shadowInputs = input.shadowRoot.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>;
      shadowInputs.forEach(input => {
        input.checkValidity = jest.fn(() => false);
        Object.defineProperty(input, 'validity', {
          get: jest.fn(() => ({
            valueMissing: true,
          })),
        });
      });
    });

    await mgForm.displayError();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
