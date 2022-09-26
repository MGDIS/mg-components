import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { CheckboxItem, CheckboxValue } from './mg-input-checkbox.conf';

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

  // HTML selector
  private inputs: HTMLInputElement[] = [];

  // Locales
  private messages;

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
   */
  @Prop() identifier!: string;

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Input label
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
      this.errorMessage = this.messages.errors.required;
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
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentWillLoad(): ReturnType<typeof setTimeout> {
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.validateValue(this.value);
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
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
        ariaDescribedbyIDs={[]}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={undefined}
        mgWidth={undefined}
        disabled={this.disabled}
        value={this.value && this.value.toString()}
        readonlyValue={undefined}
        tooltip={!this.readonly && this.tooltip}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
      >
        <ul class={{ 'mg-input__input-group-container': true, 'mg-input__input-group-container--vertical': this.inputVerticalList }}>
          {this.checkboxItems
            .filter(item => {
              return !this.readonly || item.value;
            })
            .map(input => (
              <li class={{ 'mg-input__input-group': true, 'mg-input__input-group--disabled': this.disabled || input.disabled }}>
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
