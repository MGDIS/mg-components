import { h } from '@stencil/core';

export default {
  component: 'mg-form',
  title: 'Molecules/mg-form',
  parameters: { actions: { handles: ['form-valid', 'form-submit'] } },
};

const args = {
  identifier: 'identifier',
  name: 'input-name',
  readonly: false,
  disabled: false,
};

/**
 * 1. camelCase arguments must be written in the template, for exemple labelOnTop must be placed in the template as label-on-top={args.labelOnTop}
 * 2. boolean arguments with a default true value must be added like display-character-left={args.displayCharacterLeft ? 'true' : 'false'}
 *
 * @param {any} args component arguments
 * @returns {HTMLElement} HTMLElement
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => {
  let form;
  let submit;
  return (
    <mg-form
      {...args}
      ref={el => {
        form = el;
        form.addEventListener('form-valid', e => {
          submit.disabled = !e.detail;
        });
        form.addEventListener('form-submit', () => {
          window.alert('Your form has been submitted');
        });
      }}
    >
      <mg-input-checkbox
        identifier="mg-input-checkbox"
        label="mg-input-checkbox label"
        value={[
          { title: 'oui', value: false },
          { title: 'non', value: false },
        ]}
      ></mg-input-checkbox>
      <mg-input-date required identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
      <mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>
      <mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>
      <mg-input-radio identifier="mg-input-radio" label="mg-input-radio label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-radio>
      <mg-input-select identifier="mg-input-select" label="mg-input-select label" items={['blu', 'bli', 'bla', 'blo']}></mg-input-select>
      <mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
      <mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>
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
      </mg-input-toggle>
      <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
        <mg-button
          id="can-submit"
          disabled
          ref={e => {
            submit = e;
          }}
        >
          Submit
        </mg-button>
        <mg-button
          variant="secondary"
          type="button"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            form.displayError();
          }}
        >
          Display errors
        </mg-button>
      </div>
    </mg-form>
  );
};

export const MgForm = Template.bind({});
MgForm.args = { ...args };
