import { Component, Event, h, Prop, EventEmitter, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { RadioOption } from './mg-input-radio.conf';

/**
 * type Option validation function
 * @param option
 * @returns {boolean}
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

  // classes
  private classError = 'is-not-valid';

  // HTML selector
  private inputs: HTMLInputElement[] = [];

  /**************
   * Decorators *
   **************/

  /**
   * Component value
   */
  @Prop({ mutable: true }) value?: any;

  /**
   * Items are the possible options to select
   * Required
   */
  @Prop() items!: string[] | RadioOption[];
  @Watch('items')
  validateItems(newValue) {
    // Validate if items have required min length
    if (typeof newValue === 'object' && newValue.length < 2) {
      throw new Error('<mg-input-radio> prop "items" require at least 2 items.');
    }
    // String array
    else if (allItemsAreString(newValue)) {
      this.options = newValue.map(item => ({ title: item, value: item, disabled: this.disabled }));
    }
    // Object array
    else if (newValue && (newValue as Array<RadioOption>).every(item => isOption(item))) {
      this.options = newValue;
    } else {
      throw new Error('<mg-input-radio> prop "items" is required and all items must be the same type, string or RadioOption.');
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-input-radio');

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
  @Prop() labelOnTop: boolean = false;

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
   * Handle input event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.checkValidity();
    this.value = this.options.find(o => o.value.toString() === event.target.value).value;
    this.valueChange.emit(this.value);
  };

  /**
   * Handle blur event
   */
  private handleBlur = () => {
    this.checkValidity();
    this.checkError();
  };

  /**
   * Check if input is valid
   */
  private checkValidity() {
    if (!this.readonly) {
      const validity = this.getInvalidElement() === undefined;

      // Set validity
      this.valid = validity;
      this.invalid = !validity;
    }
  }

  /**
   * Check input errors
   */
  private checkError() {
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
  }

  /**
   * get invalid element
   * @returns element: HTMLInputElement
   */
  private getInvalidElement = () => this.inputs.find((element: HTMLInputElement) => !element.disabled && !element.checkValidity());

  /*************
   * Lifecycle *
   *************/

  componentWillLoad() {
    // Check items format
    this.validateItems(this.items);

    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => this.checkValidity(), 0);
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
        width={undefined}
        value={this.value && this.value.toString()}
        readonlyValue={this.value && this.value.toString()}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
      >
        <ul class={`mg-input__input-group-container${this.inputVerticalList ? ' mg-input__input-group-container--vertical' : ''}`}>
          {this.options.map((input, index) => (
            <li class="mg-input__input-group">
              <input
                type="radio"
                id={this.identifier + '_' + index}
                name={this.identifier}
                value={input.value && input.value.toString()}
                checked={input.value === this.value || input.value === true}
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
