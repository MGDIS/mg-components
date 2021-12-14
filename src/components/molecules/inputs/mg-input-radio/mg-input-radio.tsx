import { Component, Event, h, Prop, EventEmitter, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { Option }from '../../../../types/components.types';

/**
* type Option validation function
* @param option
* @returns {boolean}
*/
const isOption = (option: Option): boolean => typeof option === 'object' && typeof option.title === 'string' && typeof option.value === 'string' && option.value !== undefined;


@Component({
  tag: 'mg-input-radio',
  styleUrl: 'mg-input-radio.scss',
  shadow: true,
})
export class MgInputRadio {

  /************
   * Internal *
   ************/

   private classFocus = 'is-focused';
   private classError = 'is-not-valid';

  /**************
  * Decorators *
  **************/

  /**
  * Component value
  */
  @Prop({ mutable:true, reflect: true }) value?: string;

  /**
  * Items are the possible options to select
  * Required
  */
  @Prop() items!: string[] | Option[];
  @Watch('items')
  validateItems(newValue){
    // String array
    if(newValue && (newValue as Array<string>).every(item => typeof item === 'string')) {
      this.options = newValue.map(item => ({ title:item, value:item, disabled: false }));
    }
    // Object array
    else if(newValue && (newValue as Array<Option>).every(item => isOption(item))) {
      this.options = newValue;
    }
    else {
      throw new Error('<mg-input-radio> prop "items" is required and all items must be the same type, string or Option.')
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
  * Define if label has colon ":"
  */
  @Prop() labelColon: boolean = false;

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
  * Template to use for characters left sentence
  */
  @Prop() helpText: string;

  /**
  * Force valid component
  */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
  * Force invalid component
  */
  @Prop({ mutable: true, reflect: true }) invalid: boolean;

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
  @State() options: (Option)[];

  /**
  * Emitted event when value change
  */
  @Event() valueChange: EventEmitter<string>

  /**
  * Handle input event
  * @param event
  */
  private handleInput = (event:InputEvent & { target: HTMLInputElement }) => {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  /**
  * Handle focus event
  */
  private handleFocus = () => {
    this.classList.add(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
  }

  /**
  * Handle blur event
  * @param event
  */
  private handleBlur = (event:FocusEvent) => {
    // Manage focus
    this.classList.delete(this.classFocus);
    this.classList = new ClassList(this.classList.classes);

  // Check validity
    this.checkValidity(event.target);
  }

  /**
  * Check if input is valid
  * @param element
  */
  private checkValidity(element) {
    const validity = element.checkValidity();
    // Set error message
    this.errorMessage = undefined;
    if(!validity && element.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Set validity
    this.valid = validity;
    this.invalid = !validity;

    // Update class
    if(validity) {
      this.classList.delete(this.classError);
    }
    else {
      this.classList.add(this.classError);
    }
  }

  /*************
  * Lifecycle *
  *************/

  componentWillLoad() {
    // Check items format
    this.validateItems(this.items);
  }

  render() {
    return (
      <MgInput
        identifier={this.identifier}
        classList={this.classList}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelColon={this.labelColon}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        value={this.value && this.value.toString()}
        readonlyValue={this.value && this.value.toString()}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
        isVerticalList={this.inputVerticalList}
      >
        <div>
          {this.options.map((input, index) => [
            <input
              type="radio"
              id={this.identifier + '_' + index}
              name={this.identifier}
              value={input.value && input.value.toString()}
              checked={input.value === this.value}
              disabled={input.disabled}
              required={this.required}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onInput={this.handleInput}
            />,
            <label htmlFor={this.identifier + '_' + index}>{input.value}</label>
          ])}
        </div>
      </MgInput>
    )
  }
}
