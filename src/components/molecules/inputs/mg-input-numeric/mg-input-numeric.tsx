import { Component, Element, Event, h, Prop, EventEmitter, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { types } from './mg-input-numeric.conf';
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
  private classFocus: string = 'is-focused';
  private classError: string = 'is-not-valid';

  /**************
   * Decorators *
   **************/

  @Element() element: HTMLMgInputNumericElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  validateValue(newValue: string) {
    if (newValue !== undefined && newValue !== null) {
      // Split number and decimal
      const [number, decimal = ''] = newValue.replace('-', '').split(/[\.,]/);
      // Regex
      const regex = this.type === "integer" ? /^[\-]?\d+$/ : /^[\-]?\d+[.,]?\d*$/ ;
      // Filter input
      if (newValue === '' || (newValue.match(regex) && number.length <= 13 && decimal.length <= (this.type === "integer" ? 0 : 2 ))) {
        this.storedValue = newValue;
      } else if (this.storedValue !== undefined) {
        newValue = this.storedValue;
      }
      else {
        newValue = null;
      }
      // Set value and input value
      this.value = newValue;
      const elementInput = this.element.shadowRoot.getElementById(this.identifier) as HTMLInputElement;
      if (elementInput !== null) elementInput.value = this.value;
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
  @Prop() identifier?: string = createID('mg-input-numeric');

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
   * Define if label has colon ":"
   */
  @Prop() labelColon: boolean = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   *
   */
  @Prop() placeholder: string;

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
   * Template to use for characters left sentence
   */
  @Prop() helpText: string;

  /**
   * Define numeric type
   */
  @Prop() type: string = types[0];
  @Watch('type')
  validateType(newValue: string) {
    if(!types.includes(newValue)) {
      throw new Error(`<mg-input-numeric> prop "type" must be one of : ${types.join(', ')}`);
    }
    this.classList.add(`mg-input--numeric--${this.type}`);
  }

  /**
   * Add a custom unit
   */
  @Prop() unit: string;

  /**
   * Maximum value
   */
  @Prop() max: number;

  /**
   * Minimum value
   */
  @Prop() min: number;

  /**
   * Define input pattern to validate
   */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
   * Define input pattern error message
   */
  @Prop({ mutable: true, reflect: true }) invalid: boolean;

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
  @Event() valueChange: EventEmitter<number>;

  /**
   * Handle input event
   * @param event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.value = event.target.value;
  };

  /**
   * Handle focus event
   */
  private handleFocus = () => {
    this.classList.add(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
    // Display value
    this.displayValue = this.value;
  };

  /**
   * Handle blur event
   * @param event
   */
  private handleBlur = (event: FocusEvent) => {
    // Manage focus
    this.classList.delete(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
    // Check validity
    this.checkValidity(event.target as HTMLInputElement);
    // Display readonly value
    this.displayValue = this.readonlyValue;
  };

  /**
   * Check if input is valid
   * @param element
   */
  private checkValidity(element:HTMLInputElement) {
    let validity = element.checkValidity();
    // Set error message
    this.errorMessage = undefined;
    // required
    if (!validity && element.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }
    // Min & Max
    if (this.min !== undefined && this.numericValue < this.min && this.max === undefined) {
      // Only a min value is set
      validity = false;
      this.errorMessage = messages.errors.currency.min.replace('{min}', `${this.formatValue(this.min)}`);
    } else if (this.max !== undefined && this.numericValue > this.max && this.min === undefined) {
      // Only a max value is set
      validity = false;
      this.errorMessage = messages.errors.currency.max.replace('{max}', `${this.formatValue(this.max)}`);
    } else if ((this.min !== undefined && this.numericValue < this.min) || (this.max !== undefined && this.numericValue > this.max)) {
      // both min and max values are set
      validity = false;
      this.errorMessage = messages.errors.currency.minMax.replace('{min}', `${this.formatValue(this.min)}`).replace('{max}', `${this.formatValue(this.max)}`);
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

  /**
   * Format value based on type
   * @param value {number}
   * @returns {string} formated local value
   */
  private formatValue(value:number):string {
    return this.type === "currency" ? localeCurrency(value) : localeNumber(value);
  }

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    this.validateValue(this.value);
    // Set displayed value
    this.displayValue = this.readonlyValue;
  }

  /**
   * Check if component props are well configured on init
   */

  render() {
    return (
      <MgInput
        identifier={this.identifier}
        classList={this.classList}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelColon={this.labelColon}
        required={this.required}
        readonly={this.readonly}
        value={this.value}
        readonlyValue={this.readonlyValue}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <input
          type="text"
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
        />
      </MgInput>
    );
  }
}
