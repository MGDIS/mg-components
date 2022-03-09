import { Component, Event, h, Prop, EventEmitter, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { CheckboxItem, CheckboxValue } from './mg-input-checkbox.conf';

/**
 * type CheckboxItem validation function
 * @param CheckboxItem
 * @returns {boolean}
 */
const isCheckboxItem = (item: CheckboxItem): boolean =>
  typeof item === 'object' && typeof item.title === 'string' && (item.value === null || typeof item.value === 'boolean') && item.value !== undefined;

/**
 * utility function to get shadow-root HTML node element
 * @param element
 * @returns {HTMLElement}
 */
const getShadowRootElementFromElement = (element: HTMLElement): HTMLElement => {
  if (element.parentElement === null) return element;
  return getShadowRootElementFromElement(element.parentElement);
};

@Component({
  tag: 'mg-input-checkbox',
  styleUrl: 'mg-input-checkbox.scss',
  shadow: true,
})
export class MgInputCheckbox {
  /************
   * Internal *
   ************/
  private classError = 'is-not-valid';

  /**************
   * Decorators *
   **************/

  /**
   * Component value
   * If item.value is `null`, checkbox will be indeterminate by default
   * Required
   */
  @Prop({ mutable: true }) value!: CheckboxValue[];
  @Watch('value')
  validateValue(newValue) {
    if (newValue && (newValue as Array<CheckboxItem>).every(item => isCheckboxItem(item))) {
      this.checkboxItems = newValue.map((item, index) => ({
        id: `${this.identifier}_${index.toString()}`,
        title: item.title,
        value: item.value,
        disabled: item.disabled,
      }));
    } else {
      throw new Error('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-input-checkbox');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name?: string = this.identifier;

  /**
   * Input label
   * Required
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide: boolean = false;

  /**
   * Define if inputs are display verticaly
   */
  @Prop() inputVerticalList: boolean = false;

  /**
   * Define if input is required
   */
  @Prop() required: boolean = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly: boolean = false;

  /**
   * Define if input is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Force valid component
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Force invalid component
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-input--checkbox']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated value for display
   */
  @State() checkboxItems: CheckboxItem[] = [];

  /**
   * Emitted event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<CheckboxValue[]>;

  /**
   * Handle input event
   * @param event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.checkboxItems = this.checkboxItems.map(item => {
      if (item.id === event.target.id) {
        item.value = Boolean(event.target.checked);
      }
      return item;
    });

    this.value = this.checkboxItems.map(o => ({ value: o.value, title: o.title, disabled: o.disabled }));
    this.valueChange.emit(this.value);
  };

  /**
   * Handle blur event
   * @param event
   */
  private handleBlur = (event: FocusEvent) => {
    // Check validity
    this.checkValidity(event.target);
  };

  /**
   * Check if input is valid
   * @param element
   */
  private checkValidity(element) {
    // we check group validity
    const shadowRootElement = getShadowRootElementFromElement(element);
    const inputs = Array.from(shadowRootElement.querySelectorAll('input[type=checkbox]'));
    const validity = inputs.find((element: HTMLInputElement) => !element.disabled && element.checkValidity()) !== undefined;

    // Set error message
    this.errorMessage = undefined;
    if (!validity && element.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Set validity
    this.valid = validity;
    this.invalid = !validity;

    // Update class
    if (validity) {
      this.classList.delete(this.classError);
    } else {
      this.classList.add(this.classError);
    }
  }

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    // Check values format
    this.validateValue(this.value);
  }

  render() {
    return (
      <MgInput
        identifier={this.identifier}
        classList={this.classList}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={false}
        value={this.value && this.value.toString()}
        readonlyValue={undefined}
        tooltip={!this.readonly && this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
      >
        <ul class={`mg-input__input-group-container${this.inputVerticalList ? ' mg-input__input-group-container--vertical' : ''}`}>
          {this.checkboxItems
            .filter(item => {
              return !this.readonly || item.value;
            })
            .map(input => (
              <li class="mg-input__input-group">
                <input
                  type="checkbox"
                  id={input.id}
                  name={this.identifier}
                  value={input.value && input.value.toString()}
                  checked={Boolean(input.value)}
                  disabled={this.readonly || this.disabled || input.disabled}
                  required={this.required}
                  indeterminate={input.value === null}
                  onInput={this.handleInput}
                  onBlur={this.handleBlur}
                />
                <label htmlFor={input.id}>{input.title}</label>
              </li>
            ))}
        </ul>
      </MgInput>
    );
  }
}
