import { Component, Event, EventEmitter, h, Prop, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { InputError } from './mg-input-date.conf';
import { createID, ClassList } from '../../../../utils/components.utils';
import { localeDate, dateRegExp } from '../../../../utils/locale.utils';
import { messages } from '../../../../locales';
import { InputClass } from '../MgInput.conf';

@Component({
  tag: 'mg-input-date',
  styleUrl: './mg-input-date.scss',
  shadow: true,
})
export class MgInputDate {
  /************
   * Internal *
   ************/

  // classes
  private classError = InputClass.ERROR;

  // HTML selector
  private input: HTMLInputElement;

  /**************
   * Decorators *
   **************/

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  validateValue(newValue: string): void {
    if (newValue !== undefined && newValue !== '' && !(typeof newValue === 'string' && dateRegExp.test(newValue))) {
      throw new Error("<mg-input-date> props 'value' doesn't match pattern: yyyy-mm-dd");
    } else {
      this.valueChange.emit(this.value);
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-input-date');

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
   * Define input minimum date
   * format: yyyy-mm-dd
   */
  @Prop() min: string;
  @Watch('min')
  validateMin(newValue: string): void {
    this.validateDateFormat(newValue);
  }

  /**
   * Define input maximum date
   * format: yyyy-mm-dd
   */
  @Prop() max: string;
  @Watch('max')
  validateMax(newValue: string): void {
    this.validateDateFormat(newValue);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-input--date']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

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
   */
  private handleInput = (): void => {
    this.checkValidity();
    this.value = this.input.value;
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    this.checkValidity();
    this.checkError();
  };

  /**
   * Date format validation
   *
   * @param {string} date date to validate
   * @returns {void}
   */
  private validateDateFormat(date: string): void {
    if (date?.length > 0 && !(typeof date === 'string' && dateRegExp.test(date))) {
      throw new Error("<mg-input-date> props 'min/max' doesn't match pattern: yyyy-mm-dd");
    }
  }

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    if (!this.readonly && this.input !== undefined) {
      const validity = this.input.checkValidity();

      // Set validity
      this.valid = validity;
      this.invalid = !validity;

      //Send event
      this.inputValid.emit(validity);
    }
  };

  /**
   * get input error code
   *
   * @returns {null | InputError} error code
   */
  private getInputError = (): null | InputError => {
    let inputError = null;

    // required
    if (this.input.validity.valueMissing) {
      inputError = InputError.REQUIRED;
    }
    // min & max
    else if ((this.input.validity.rangeUnderflow || this.input.validity.rangeOverflow) && this.min?.length > 0 && this.max?.length > 0) {
      inputError = InputError.MINMAX;
    }
    // min
    else if (this.input.validity.rangeUnderflow) {
      inputError = InputError.MIN;
    }
    //max
    else if (this.input.validity.rangeOverflow) {
      inputError = InputError.MAX;
    }

    return inputError;
  };

  /**
   * Set error message
   *
   * @returns {void}
   */
  private setErrorMessage = (): void => {
    const inputError = this.getInputError();
    // required
    if (inputError === InputError.REQUIRED) {
      this.errorMessage = messages.errors[inputError];
    }
    // min, max & minMax
    else if ([InputError.MIN, InputError.MAX, InputError.MINMAX].includes(inputError)) {
      this.errorMessage = messages.errors.date[inputError].replace('{min}', localeDate(this.min)).replace('{max}', localeDate(this.max));
    }
    // wrong date format
    // element.validity.badInput is default error message
    else {
      this.errorMessage = messages.errors.date.badInput.replace('{min}', this.min?.length > 0 ? localeDate(this.min) : localeDate('1900-01-01'));
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
    if (!this.valid) {
      this.setErrorMessage();
      this.classList.add(this.classError);
    } else {
      this.classList.delete(this.classError);
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
    this.validateMin(this.min);
    this.validateMax(this.max);

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
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        width={undefined}
        disabled={this.disabled}
        value={this.value}
        readonlyValue={localeDate(this.value)}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <input
          type="date"
          class="mg-input__box"
          min={this.min}
          max={this.max}
          value={this.value}
          id={this.identifier}
          name={this.name}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          ref={el => (this.input = el as HTMLInputElement)}
        />
      </MgInput>
    );
  }
}
