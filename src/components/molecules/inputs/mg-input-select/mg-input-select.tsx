import { Component, Event, h, Prop, State, EventEmitter, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { Option, OptGroup }from '../../../../types/components.types';

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
  @Prop() items!: string[] | Option[];
  @Watch('items')
  validateItems(newValue){
    // String array
    if(newValue && (newValue as Array<string>).every((item) => typeof item === 'string')) {
      this.options = newValue.map(item=>({ title:item, value:item }));
    }
    // Object array
    else if(newValue && (newValue as Array<Option>).every((item) => (typeof item === 'object' && typeof item.title === 'string' && item.value !== undefined ))) {
      // Grouped object options
      if(newValue.some((item)=>(item.group !== undefined))) {
        this.options = newValue.reduce((acc, {group, title, value, disabled})=>{
          if(group) {
            // Check if group is already created
            const optgroup = acc.find(grp=>grp.group===group);
            // Add to group
            if(optgroup) {
              optgroup.options.push({title,value, disabled})
            }
            // Create group
            else {
              acc.push({group, options:[{title, value, disabled}]});
            }
          }
          else {
            acc.push({title, value, disabled});
          }
          return acc;
        }, []);
      }
      // Standart object options
      else {
        this.options = newValue;
      }
    }
    else {
      throw new Error('<mg-input-select> prop "items" is required and all items must be the same type, string or Option.')
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
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
   * Define if label is visible
   */
   @Prop() labelHide: boolean = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder: string = messages.input.select.placeholder;

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
  @State() classList: ClassList = new ClassList(['mg-input--select']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated items for display
   */

  @State() options: (Option|OptGroup)[];

  /**
   * Emmited event when value change
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
    // required
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
        value={this.value}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
        isVerticalList={false}
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
            option.group !== undefined
            ? <optgroup label={option.group}>
                {(option as OptGroup).options.map(optgroup=>
                  <option value={optgroup.value} selected={this.value===optgroup.value} disabled={optgroup.disabled}>{optgroup.title}</option>
                )}
              </optgroup>
            : <option value={(option as Option).value} selected={this.value===(option as Option).value} disabled={(option as Option).disabled}>
                {(option as Option).title}
              </option>
          )}
        </select>
      </MgInput>
    );
  }
}
