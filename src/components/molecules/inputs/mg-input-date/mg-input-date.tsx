import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { localeDate, dateRegexp } from '../../../../utils/locale.utils';
import { messages } from '../../../../locales';

@Component({
  tag: 'mg-input-date',
  styleUrl: './mg-input-date.scss',
  shadow: true,
})
export class MgInputDate {
  /************
   * Internal *
   ************/

  private classError = 'is-not-valid';

  /**************
   * Decorators *
   **************/

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  validateValue(newValue) {
    if (newValue !== undefined && !(typeof newValue === 'string' && dateRegexp.test(newValue))) {
      throw new Error("<mg-input-date> props 'value' doesn't match pattern: yyyy-mm-dd");
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-input-date');

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
   * Define input pattern to validate
   */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
   * Define input pattern error message
   */
  @Prop({ mutable: true, reflect: true }) invalid: boolean;

  /**
   * Define input minimum date
   * format: yyyy-mm-dd
   */
  @Prop() min: string;
  @Watch('min')
  validateMin(newValue) {
    this.validateDateFormat(newValue);
  }

  /**
   * Define input maximum date
   * format: yyyy-mm-dd
   */
  @Prop() max: string;
  @Watch('max')
  validateMax(newValue) {
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
   * Emmited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

  /**
   * Handle input event
   * @param event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  };

  /**
   * Handle blur event
   * @param event
   */
  private handleBlur = (event: FocusEvent) => {
    this.checkValidity(event.target);
  };

  /**
   * Date format validation
   * @param date
   */
  private validateDateFormat(date: string) {
    if (date?.length > 0 && !(typeof date === 'string' && dateRegexp.test(date))) {
      throw new Error("<mg-input-date> props 'min/max' doesn't match pattern: yyyy-mm-dd");
    }
  }

  /**
   * Check if input is valid
   * @param element
   */
  private checkValidity(element) {
    const validity = element.checkValidity();
    // Set error message
    this.errorMessage = undefined;
    // wrong date format
    if (!validity && element.validity.badInput) {
      this.errorMessage = messages.errors.date.badInput.replace('{min}', this.min?.length > 0 ? localeDate(this.min) : localeDate('1900-01-01'));
    }
    // required
    else if (!validity && element.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }
    // min & max
    else if (!validity && (element.validity.rangeUnderflow || element.validity.rangeOverflow) && this.min?.length > 0 && this.max?.length > 0) {
      this.errorMessage = messages.errors.date.minMax.replace('{min}', localeDate(this.min)).replace('{max}', localeDate(this.max));
    }
    // min
    else if (!validity && element.validity.rangeUnderflow) {
      this.errorMessage = messages.errors.date.min.replace('{min}', localeDate(this.min));
    }
    //max
    else if (!validity && element.validity.rangeOverflow) {
      this.errorMessage = messages.errors.date.max.replace('{max}', localeDate(this.max));
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
    this.validateValue(this.value);
    this.validateMin(this.min);
    this.validateMax(this.max);
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
        readonly={this.readonly}
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
        />
      </MgInput>
    );
  }
}
