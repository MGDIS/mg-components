import { Component, Event, h, Prop, EventEmitter, State, Watch, Element } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { CheckboxOption, CheckboxValue }from '../../../../types/components.types';

/**
* type CheckboxOption validation function
* @param CheckboxOption
* @returns {boolean}
*/
const isCheckboxOption = (option: CheckboxOption): boolean => typeof option === 'object' && typeof option.title === 'string' && (option.value === null || typeof option.value === 'boolean') && option.value !== undefined;

@Component({
  tag: 'mg-input-checkbox',
  styleUrl: 'mg-input-checkbox.scss',
  shadow: true,
})

export class MgInputCheckbox {

  /************
   * Internal *
   ************/
   private classError = 'is-not-valid';

  /**************
  * Decorators *
  **************/

  /**
  * Component value
  * If item.value is `null`, checkbox will be indeterminate by default
  * Required
  */
  @Prop({ mutable:true, reflect: true }) value!: CheckboxValue[];
  @Watch('value')
  validateValue(newValue){
    if(newValue && (newValue as Array<CheckboxOption>).every(item => isCheckboxOption(item))) {
      this.options = newValue.map((item, index) => ({
        id: `${this.identifier}_${index.toString()}`,
        title:item.title,
        value:item.value,
        disabled: item.disabled
      }));
    }
    else {
      throw new Error('<mg-input-checkbox> prop "value" is required and all values must be the same type, CheckboxOption.')
    }
  }

  /**
  * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
  * If not set, it will be created.
  */
  @Prop() identifier?: string = createID('mg-input-checkbox');

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
  @State() classList: ClassList = new ClassList(['mg-input--checkbox']);

  /**
  * Error message to display
  */
  @State() errorMessage: string;

  /**
  * Formated value for display
  */
  @State() options: (CheckboxOption)[];

  /**
  * Emitted event when value change
  */
  @Event() valueChange: EventEmitter<CheckboxValue[]>

  /**
  * Get component DOM element
  */
  @Element() element: HTMLMgInputCheckboxElement;

  /**
  * Handle input event
  * @param event
  */
  private handleInput = (event:InputEvent & { target: HTMLInputElement }) => {
    this.options = this.options.map(option => {
      if (option.id === event.target.id) {
        option.value = Boolean(event.target.checked);
      }
      return option;
    })

    this.value = this.options.map(o => ({value: o.value, title: o.title}));
    this.valueChange.emit(this.value);
  }

  /**
   * Handle blur event
   * @param event
   */
  private handleBlur = (event:FocusEvent) => {
    // Check validity
    this.checkValidity(event.target);
  }

  /**
  * Check if input is valid
  * @param element
  */
  private checkValidity(element) {
    // we check element  OR group validity
    const elementValidity = element.checkValidity();
    const validity = elementValidity || this.checkInputGroupValidity();

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

  /**
   * check input group validity
   */
  private checkInputGroupValidity(): boolean {
    const inputs = Array.from(this.element.shadowRoot.querySelectorAll('input[type=checkbox]'));
    const getValidInput = inputs.find(i => {
      const element = i as HTMLInputElement;
      // we skip disabled elements
      if (element.disabled) return false;

      return element.checkValidity();
    });
    return getValidInput !== undefined;
  }

  /*************
  * Lifecycle *
  *************/

  componentWillLoad() {
    // Check values format
    this.validateValue(this.value);
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
        readonly={false}
        value={this.value && this.value.toString()}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
      >
        <ul class={"mg-input__input-group-container mg-input__input-group-container--checkbox " + (this.inputVerticalList ? 'mg-input__input-group-container--vertical' : '')}>
          {this.options
            .filter((item) => {
              return !this.readonly || item.value;
            }).map(input => (
            <li class="mg-input__input-group">
              <input
                type="checkbox"
                id={input.id}
                name={this.identifier}
                value={input.value && input.value.toString()}
                checked={Boolean(input.value)}
                disabled={this.readonly || this.disabled || input.disabled}
                required={this.required}
                indeterminate={input.value === null}
                onInput={this.handleInput}
                onBlur={this.handleBlur}
              />
              <label htmlFor={input.id}>{input.title}</label>
            </li>
          ))}
        </ul>
      </MgInput>
    );
  }

}
