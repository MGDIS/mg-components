import { Component, Event, Element, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { CheckboxItem, CheckboxValue } from './mg-input-checkbox.conf';
import { InputClass } from '../MgInput.conf';

/**
 * type CheckboxItem validation function
 *
 * @param {CheckboxItem} item Checkbox item
 * @returns {boolean} match item expectations
 */
const isCheckboxItem = (item: CheckboxItem): boolean =>
  typeof item === 'object' && typeof item.title === 'string' && (item.value === null || typeof item.value === 'boolean') && item.value !== undefined;

@Component({
  tag: 'mg-input-checkbox',
  styleUrl: 'mg-input-checkbox.scss',
  shadow: true,
})
export class MgInputCheckbox {
  /************
   * Internal *
   ************/

  // classes
  private classError = InputClass.ERROR;

  // HTML selector
  private inputs: HTMLInputElement[] = [];

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputCheckboxElement;

  /**
   * Component value
   * If item.value is `null`, checkbox will be indeterminate by default
   * Required
   */
  @Prop({ mutable: true }) value!: CheckboxValue[];
  @Watch('value')
  validateValue(newValue: CheckboxValue[]): void {
    if (newValue && (newValue as CheckboxItem[]).every(item => isCheckboxItem(item))) {
      this.checkboxItems = newValue.map((item, index) => ({
        id: `${this.identifier}_${index.toString()}`,
        title: item.title,
        value: item.value,
        disabled: item.disabled,
      }));
      this.valueChange.emit(newValue);
    } else {
      throw new Error('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxItem.');
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-input-checkbox');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

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
  @Prop() labelHide = false;

  /**
   * Define if inputs are display verticaly
   */
  @Prop() inputVerticalList = false;

  /**
   * Define if input is required
   */
  @Prop() required = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly = false;
  @Watch('readonly')
  handleReadOnly(): void {
    this.classList.delete(this.classError);
  }

  /**
   * Define if input is disabled
   */
  @Prop() disabled = false;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Define input valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input invalid state
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
   * Emited event when checking validity
   */
  @Event({ eventName: 'input-valid' }) inputValid: EventEmitter<boolean>;

  /**
   * Public method to display errors
   *
   * @returns {Promise<void>}
   */
  @Method()
  async displayError(): Promise<void> {
    this.checkValidity();
    this.checkError();
  }

  /**
   * Handle input event
   *
   * @param {InputEvent} event input event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }): void => {
    this.checkboxItems = this.checkboxItems.map(item => {
      if (item.id === event.target.id) {
        item.value = Boolean(event.target.checked);
      }
      return item;
    });

    this.value = this.checkboxItems.map(o => ({ value: o.value, title: o.title, disabled: o.disabled }));
    this.checkValidity();
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    // Check validity
    this.checkValidity();
    this.checkError();
  };

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    if (!this.readonly) {
      const validity = this.getInvalidElement() === undefined;

      // Set validity
      this.valid = validity;
      this.invalid = !validity;

      //Send event
      this.inputValid.emit(validity);
    }
  };

  /**
   * Check input errors
   */
  private checkError = (): void => {
    const invalidElement = this.getInvalidElement();

    // Set error message
    this.errorMessage = undefined;
    if (!this.valid && invalidElement.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Update class
    if (this.valid) {
      this.classList.delete(this.classError);
    } else {
      this.classList.add(this.classError);
    }
  };

  /**
   * get invalid element
   *
   * @returns {HTMLInputElement} element
   */
  private getInvalidElement = (): HTMLInputElement => this.inputs.find((element: HTMLInputElement) => !element.disabled && !element.checkValidity());

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    // Check values format
    this.validateValue(this.value);

    // Check validity when component is ready
    this.element.componentOnReady().then(() => {
      this.checkValidity();
    });
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <MgInput
        identifier={this.identifier}
        classList={this.classList}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={undefined}
        width={undefined}
        disabled={this.disabled}
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
                  ref={el => this.inputs.push(el as HTMLInputElement)}
                />
                <label htmlFor={input.id}>{input.title}</label>
              </li>
            ))}
        </ul>
      </MgInput>
    );
  }
}
