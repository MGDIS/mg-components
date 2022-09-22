/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Element, Event, h, Prop, EventEmitter, State, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { RadioOption } from './mg-input-radio.conf';

/**
 * type Option validation function
 *
 * @param {RadioOption} option radio option
 * @returns {boolean} radio option type is valid
 */
const isOption = (option: RadioOption): boolean => typeof option === 'object' && typeof option.title === 'string' && option.value !== undefined;

@Component({
  tag: 'mg-input-radio',
  styleUrl: 'mg-input-radio.scss',
  shadow: true,
})
export class MgInputRadio {
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
  @Element() element: HTMLMgInputRadioElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: any;
  @Watch('value')
  handleValue(newValue: any): void {
    this.valueChange.emit(newValue);
  }

  /**
   * Items are the possible options to select
   * Required
   */
  @Prop() items!: string[] | RadioOption[];
  @Watch('items')
  validateItems(newValue: string[] | RadioOption[]): void {
    // Validate if items have required min length
    if (typeof newValue === 'object' && newValue.length < 2) {
      throw new Error('<mg-input-radio> prop "items" require at least 2 items.');
    }
    // String array
    else if (allItemsAreString(newValue as string[])) {
      this.options = newValue.map(item => ({ title: item, value: item, disabled: this.disabled }));
    }
    // Object array
    else if (newValue && (newValue as RadioOption[]).every(item => isOption(item))) {
      this.options = newValue as RadioOption[];
    } else {
      throw new Error('<mg-input-radio> prop "items" is required and all items must be the same type, string or RadioOption.');
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
  @Prop() labelOnTop = false;

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
  @State() classList: ClassList = new ClassList(['mg-input--radio']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated items for display
   */
  @State() options: RadioOption[];

  /**
   * Emitted event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<any>;

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
   * @param {event} event input event
   * @returns {void}
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.checkValidity();
    this.value = this.options[event.target.value].value;
  };

  /**
   * Handle blur event
   *
   * @returns {void}
   */
  private handleBlur = (): void => {
    this.checkValidity();
    this.checkError();
  };

  /**
   * Check if input is valid
   *
   * @returns {void}
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
   *
   * @returns {void}
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
    this.validateItems(this.items);
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
        disabled={this.disabled}
        readonly={this.readonly}
        mgWidth={undefined}
        value={this.value as string}
        readonlyValue={this.value as string}
        tooltip={this.tooltip}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
      >
        <ul class={{ 'mg-input__input-group-container': true, 'mg-input__input-group-container--vertical': this.inputVerticalList }}>
          {this.options.map((input, index) => (
            <li class={{ 'mg-input__input-group': true, 'mg-input__input-group--disabled': this.disabled || input.disabled }}>
              <input
                type="radio"
                id={this.identifier + '_' + index}
                name={this.identifier}
                value={index}
                checked={JSON.stringify(this.value) === JSON.stringify(this.options[index].value)}
                disabled={this.disabled || input.disabled}
                required={this.required}
                onBlur={this.handleBlur}
                onInput={this.handleInput}
                ref={el => this.inputs.push(el as HTMLInputElement)}
              />
              <label htmlFor={this.identifier + '_' + index}>{input.title}</label>
            </li>
          ))}
        </ul>
      </MgInput>
    );
  }
}
