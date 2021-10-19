import { Component, Event, h, Prop, State, EventEmitter, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID } from '../../../../utils/utils';
import locale from '../../../../locales';

export type Option = {
  title: string,
  value: string
};

@Component({
  tag: 'mg-input-select',
  styleUrl: 'mg-input-select.scss',
  shadow: true,
})
export class MgInputSelect {

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
  @Prop({ mutable:true, reflect: true }) value: string;

  /**
   * Items are the possible options to select
   */
  @Prop() items: string[] | Option[] = [];
  @Watch('items')
  validateItems(newValue){
    if((newValue as Array<string>).every((item) => typeof item === 'string')) {
      this.options = newValue.map(item=>({ title:item, value:item }));
    }
    else if((newValue as Array<Option>).every((item) => (typeof item === 'object' && typeof item.title === 'string' && item.value !== undefined ))) {
      this.options = newValue;
    }
    else {
      throw new Error('<mg-input-select> prop "items" all items must be the same type, string or Option.')
    }
  }

  /**
   * Identifier used for the input ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-input-select');

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
   */
  @Prop() placeholder: string = locale.input.select.placeholder;

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
   * Define input valid state
   */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
   * Define input invalid state
   */
  @Prop({ mutable: true, reflect: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classes: Set<string> = new Set(['mg-input--textarea']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated items for display
   */

  @State() options: Array<Option>;

  /**
   * Emmited event when value change
   */
  @Event() inputChange: EventEmitter<string>

  /**
   * Handle input event
   * @param event
   */
  private handleInput = (event:InputEvent & { target: HTMLInputElement }) => {
    this.value = event.target.value;
    this.inputChange.emit(this.value);
   }

  /**
   * Handle focus event
   */
  private handleFocus = () => {
    this.classes.add(this.classFocus)
    this.classes = new Set(this.classes);
   }

  /**
   * Handle blur event
   * @param event
   */
  private handleBlur = (event:FocusEvent) => {
    // Manage focus
    this.classes.delete(this.classFocus);
    this.classes = new Set(this.classes);
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
    // required
    if(!validity && element.validity.valueMissing) {
      this.errorMessage = locale.errors.required;
    }

    // Set validity
    this.valid = validity;
    this.invalid = !validity;

    // Update class
    if(validity) {
      this.classes.delete(this.classError);
      this.classes = new Set(this.classes);
    }
    else {
      this.classes.add(this.classError);
      this.classes = new Set(this.classes);
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
        classes={this.classes}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelColon={this.labelColon}
        required={this.required}
        readonly={this.readonly}
        value={this.value}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <select
          id={this.identifier}
          name={this.name}
          title={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          <option value="">{this.placeholder}</option>
          { this.options.map(option=>
            <option value={option.value} selected={this.value===option.value}>{option.title}</option>
            )
          }
        </select>
      </MgInput>
    );
  }
}
