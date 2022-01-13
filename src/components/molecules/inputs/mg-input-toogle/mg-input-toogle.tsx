import { Component, Event, h, Prop, EventEmitter, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { ToogleValue } from '../../../../types/components.types'
import { messages } from '../../../../locales';

/**
* type Option validation function
* @param option
* @returns {boolean}
*/
const isOption = (option: ToogleValue): boolean => typeof option === 'object' && typeof option.title === 'string' && option.value !== undefined;


@Component({
  tag: 'mg-input-toogle',
  styleUrl: 'mg-input-toogle.scss',
  shadow: true,
})
export class MgInputToogle {

  /************
   * Internal *
   ************/

  private classFocus = 'is-focused';
  private classError = 'is-not-valid';
  private classToogleActive = 'mg-input--toogle-active';

  /**************
   * Decorators *
   **************/

  /**
  * Component value
  */
  @Prop({ mutable:true, reflect: true }) value?: any;
  @Watch('value')
  handleValue(newValue, oldValue) {
    console.log(newValue, oldValue)
  }

  /**
  * Items are the possible options to select
  * Required
  */
  @Prop() items!: string[] | ToogleValue[];
  @Watch('items')
  validateItems(newValue){
    if (this.items.length !== 2) {
      throw new Error('<mg-input-toogle> prop "items" require 2 items.')
    }
    // String array
    else if(allItemsAreString(newValue)) {
      this.options = newValue.map(item => ({ title:item, value:item }));
    }
    // Object array
    else if(newValue && (newValue as Array<ToogleValue>).every(item => isOption(item))) {
      this.options = newValue;
    }
    else {
      throw new Error('<mg-input-toogle> prop "items" is required and all items must be the same type, string or RadioOption.')
    }
  }

  /**
  * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
  * If not set, it will be created.
  */
  @Prop() identifier?: string = createID('mg-input-toogle');

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
  @State() classList: ClassList = new ClassList(['mg-input--toogle']);

  /**
  * Formated items for display
  */
  @State() options: ToogleValue[];

  /**
  * Error message to display
  */
  @State() errorMessage: string;

  /**
  * Emmited event when value change
  */
  @Event() valueChange: EventEmitter<any>

  private toogleValue = () => {
    this.value = this.value === undefined
      ? this.options[1].value
      : this.options.find(o => o.value !== this.value).value;

    this.valueChange.emit(this.value);
    this.setToogleStyle()
  }

  private setToogleStyle() {
    if (this.value === this.options[1].value) {
      this.classList.add(this.classToogleActive);
    } else {
      this.classList.delete(this.classToogleActive);
    }
    this.classList = new ClassList(this.classList.classes);
  }

  /**
  * Handle input event
  * @param event
  */
  private handleToogleClick = (event: MouseEvent) => {
    // prevent focus onCLick
    event.preventDefault();

    this.toogleValue();
  }

  private handleToogleKeyboard = (event: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
      this.toogleValue();
    }
  }

  /**
  * Handle focus event
  */
  private handleFocus = () => {
    if(!this.classList.classes.includes(this.classFocus)) {
      this.classList.add(this.classFocus);
      this.classList = new ClassList(this.classList.classes);
    }
  }

  /**
  * Handle blur event
  * @param event
  */
  private handleBlur = (event:FocusEvent & { target: HTMLBaseElement }) => {
    // Manage focus
    this.classList.delete(this.classFocus);
    this.classList = new ClassList(this.classList.classes);

    // Check validity
    this.checkValidity(event.target);
  }

  private handleLabelClick = (event: MouseEvent) => event.stopPropagation()

  /**
  * Check if input is valid
  * @param element
  */
  private checkValidity(element: HTMLBaseElement) {
    const inputs: HTMLInputElement[] = Array.from(element.querySelectorAll('input'));

    // search for valid inputs
    const validInputs =  inputs.filter(input => input.checkValidity());

    // get first invalid input validity value if exist
    const validity: ValidityState | boolean = validInputs.length < 1
      ? inputs.find(input => !input.checkValidity()).validity
      : true

    // Set error message
    this.errorMessage = undefined;
    if(validity !== true && validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Set validity
    this.valid = validity === true;
    this.invalid = !this.valid;

    // Update class
    if(this.valid) {
      this.classList.delete(this.classError);
    }
    else {
      this.classList.add(this.classError);
    }
  }

  /*************
  * Lifecycle *
  *************/

  /**
  * Check if component props are well configured on init
  */
   componentWillLoad() {
    // Check items format
    this.validateItems(this.items);

    this.setToogleStyle();
  }

  render() {
    return (<MgInput
      identifier={this.identifier}
      classList={this.classList}
      label={this.label}
      labelOnTop={this.labelOnTop}
      labelHide={this.labelHide}
      required={this.required}
      readonly={this.readonly}
      value={this.value?.toString()}
      readonlyValue={undefined}
      tooltip={this.tooltip}
      displayCharacterLeft={undefined}
      characterLeftTemplate={undefined}
      maxlength={undefined}
      helpText={this.helpText}
      errorMessage={this.errorMessage}
      isFieldset={true}
    >
      <div
        class="mg-input_toogle-group"
        onClick={this.handleToogleClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleToogleKeyboard}
        role="button"
        tabIndex={(this.readonly || this.disabled) ? -1 : 0}
      >
        {this.options.map((item, key) => ([
          <label htmlFor={`${this.identifier}_${key}`} onClick={this.handleLabelClick}>
            {
              item.icon !== undefined
              ? [
                <mg-icon icon={item.icon} size="small"></mg-icon>,
                <span class="sr-only">{item.title}</span>
              ]
              : <span class="mg-input_toogle-group__text">{item.title}</span>
            }
          </label>,
          <input
            type="radio"
            value={item.value?.toString()}
            class="sr-only"
            id={`${this.identifier}_${key}`}
            name={this.identifier}
            checked={this.value === item.value || (this.value === "" && item.value === true)}
            disabled={this.readonly || this.disabled}
            required={this.required}
            tabIndex={-1}
          />
        ]
        ))}
      </div>
    </MgInput>)
  }
}
