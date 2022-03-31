import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { InputClass, Width } from '../MgInput.conf';
import { types, InputError } from './mg-input-numeric.conf';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { localeCurrency, localeNumber } from '../../../../utils/locale.utils';

@Component({
  tag: 'mg-input-numeric',
  styleUrl: 'mg-input-numeric.scss',
  shadow: true,
})
export class MgInputNumeric {
  /************
   * Internal *
   ************/

  // Manage different values
  private storedValue: string;
  private numericValue: number;
  private readonlyValue: string;

  // Classes
  private classError: string = InputClass.ERROR;

  // HTML selector
  private input: HTMLInputElement;

  /**************
   * Decorators *
   **************/

  @Element() element: HTMLMgInputNumericElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  validateValue(newValue: string): void {
    if (newValue !== undefined && newValue !== null) {
      // Split number and decimal
      const [integer, decimal = ''] = newValue.replace('-', '').split(/[\.,]/);
      // Regex
      const regex = this.type === 'integer' ? /^[\-]?\d+$/ : /^[\-]?\d+[.,]?\d*$/;
      // Filter input
      if (newValue === '' || (newValue.match(regex) && integer.length <= this.integerLength && decimal.length <= (this.type === 'integer' ? 0 : this.decimalLength))) {
        this.storedValue = newValue;
      } else if (this.storedValue !== undefined) {
        newValue = this.storedValue;
      } else {
        newValue = null;
      }
      // Set value and input value
      this.value = newValue;
      if (this.input !== undefined) this.input.value = this.value;
      // emit numeric value
      this.numericValue = this.value !== '' && this.value !== null ? parseFloat(this.value.replace(',', '.')) : null;
      this.valueChange.emit(this.numericValue);
      // Set readOnlyValue
      this.readonlyValue = this.numericValue !== null ? this.formatValue(this.numericValue) : '';
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-input-numeric');

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
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder: string;

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
   * Define input width
   */
  @Prop() width: Width;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Define numeric type
   */
  @Prop() type: string = types[0];
  @Watch('type')
  validateType(newValue: string): void {
    if (!types.includes(newValue)) {
      throw new Error(`<mg-input-numeric> prop "type" must be one of : ${types.join(', ')}`);
    }
    this.classList.add(`mg-input--numeric--${this.type}`);
  }

  /**
   * Maximum value
   */
  @Prop() max: number;

  /**
   * Minimum value
   */
  @Prop() min: number;

  /**
   * Override integer length
   * integer is the number before the decimal point
   */
  @Prop() integerLength = 13;
  @Watch('integerLength')
  validateIntegerLength(newValue: number): void {
    if (newValue < 1) {
      throw new Error(`<mg-input-numeric> prop "integer-length" must be a positive number.`);
    }
  }

  /**
   * Override decimal length
   * decimal is the number after the decimal point
   */
  @Prop() decimalLength = 2;
  @Watch('decimalLength')
  validateDecimalLength(newValue: number): void {
    if (newValue < 1) {
      throw new Error(`<mg-input-numeric> prop "decimal-length" must be a positive number, consider using prop "type" to "integer" instead.`);
    }
  }

  /**
   * Define input pattern to validate
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input pattern error message
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-input--numeric']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Displayed value in input
   * Change on focus/blur
   */
  @State() displayValue: string;

  /**
   * Emmited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<number>;

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
   * @returns {void}
   */
  private handleInput = (): void => {
    // Check validity
    this.checkValidity();
    this.value = this.input.value;
  };

  /**
   * Handle focus event
   *
   * @returns {void}
   */
  private handleFocus = (): void => {
    this.displayValue = this.value;
  };

  /**
   * Handle blur event
   *
   * @returns {void}
   */
  private handleBlur = (): void => {
    // Check validity
    this.checkValidity();
    this.checkError();
    // Display readonly value
    this.displayValue = this.readonlyValue;
  };

  /**
   * Check if input is valid
   *
   * @returns {void}
   */
  private checkValidity = (): void => {
    if (!this.readonly) {
      const validity = this.getInputError() === null;

      // Set validity
      this.valid = validity;
      this.invalid = !validity;
    }
  };

  /**
   * Set error message
   *
   * @returns {void}
   */
  private setErrorMessage = (): void => {
    const inputError = this.getInputError();
    if (inputError === InputError.REQUIRED) {
      this.errorMessage = messages.errors[inputError];
    } else {
      this.errorMessage = messages.errors.numeric[inputError].replace('{min}', `${this.formatValue(this.min)}`).replace('{max}', `${this.formatValue(this.max)}`);
    }
  };

  /**
   * Check input errors
   *
   * @returns {void}
   */
  private checkError = (): void => {
    // Set error message
    this.errorMessage = undefined;

    // Update class
    if (!this.valid) {
      this.setErrorMessage();
      this.classList.add(this.classError);
    } else {
      this.classList.delete(this.classError);
    }
  };

  /**
   * get input error code
   *
   * @returns {null | InputError} error code
   */
  private getInputError = (): null | InputError => {
    let inputError = null;
    if (this.input === undefined) return inputError;

    // required
    if (!this.input.checkValidity() && this.input.validity.valueMissing) {
      inputError = InputError.REQUIRED;
    }
    // Min & Max
    else if (this.min !== undefined && this.numericValue < this.min && this.max === undefined) {
      // Only a min value is set
      inputError = InputError.MIN;
    } else if (this.max !== undefined && this.numericValue > this.max && this.min === undefined) {
      // Only a max value is set
      inputError = InputError.MAX;
    } else if ((this.min !== undefined && this.numericValue < this.min) || (this.max !== undefined && this.numericValue > this.max)) {
      // both min and max values are set
      inputError = InputError.MINMAX;
    }
    return inputError;
  };

  /**
   * Format value based on type
   *
   * @param {number} value value to format
   * @returns {string} formated local value
   */
  private formatValue = (value: number): string => (this.type === 'currency' ? localeCurrency(value) : localeNumber(value));

  /**
   * Validate append slot
   *
   * @returns {void}
   */
  private validateAppendSlot = (): void => {
    const slotAppendInput: HTMLSlotElement = this.element.querySelector('[slot="append-input"]');
    if (slotAppendInput !== null) {
      this.classList.add(slotAppendInput.nodeName === 'MG-BUTTON' ? 'mg-input--is-input-group-append' : 'mg-input--is-append-input-slot-content');
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {ReturnType<typeof setTimeout>} timeout
   */
  componentWillLoad(): ReturnType<typeof setTimeout> {
    this.validateValue(this.value);
    // Set displayed value
    this.displayValue = this.readonlyValue;
    this.validateType(this.type);
    this.validateIntegerLength(this.integerLength);
    this.validateDecimalLength(this.decimalLength);
    this.validateAppendSlot();

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
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        width={this.width}
        disabled={this.disabled}
        value={this.value}
        readonlyValue={this.readonlyValue}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <input
          type="text"
          class="mg-input__box"
          value={this.displayValue}
          id={this.identifier}
          name={this.name}
          placeholder={this.placeholder}
          title={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={el => (this.input = el as HTMLInputElement)}
        />
        <slot name="append-input"></slot>
      </MgInput>
    );
  }
}
