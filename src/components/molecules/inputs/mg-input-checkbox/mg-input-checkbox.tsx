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
const isCheckboxOption = (option: CheckboxOption): boolean => typeof option === 'object' && typeof option.title === 'string' && (typeof option.value === 'string' || typeof option.value === 'boolean') && option.value !== undefined;

@Component({
  tag: 'mg-input-checkbox',
  styleUrl: 'mg-input-checkbox.scss',
  shadow: true,
})

export class MgInputCheckbox {

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
  * If not set, checkbox will be indeterminate by default
  */
  @Prop({ mutable:true, reflect: true }) value?: CheckboxValue[];

  /**
  * Items are the possible options to select
  * Required
  */
  @Prop() items!: string[] | CheckboxOption[];
  @Watch('items')
  validateItems(newValue){
    // String array
    if(newValue && (newValue as Array<string>).every(item => typeof item === 'string')) {
      this.options = newValue.map(item => ({
          title:item,
          value:item,
          checked: this.isChecked(item),
          disabled: this.disabled,
          indeterminate: this.isIndeterminate(item)
      }));
    }
    // Object array
    else if(newValue && (newValue as Array<CheckboxOption>).every(item => isCheckboxOption(item))) {
      this.options = newValue.map(item => ({
          title:item.value,
          value:item.value,
          checked: item.checked || this.isChecked(item),
          disabled: item.disabled,
          indeterminate: item.indeterminate || this.isIndeterminate(item)
        }
      ));
    }
    else {
      throw new Error('<mg-input-checkbox> prop "items" is required and all items must be the same type, string or Option.')
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
  @State() classList: ClassList = new ClassList(['mg-input--checkbox']);

  /**
  * Error message to display
  */
  @State() errorMessage: string;

  /**
  * Formated items for display
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
    this.options = this.options.map((o) => {
      if (o.value === event.target.value) {
        o.checked = event.target.checked;
      }
      return o;
    })

    this.value = this.options.filter(o => o.checked === true).map(o => ({value: o.value, title: o.title}));
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

  /**
  * Manage checked state
  * @param item
  */
  private isChecked(item:CheckboxOption) :boolean {
    // return false when NO value
    if (this.value === undefined || this.value === null) {
      return false;
    }
    // search for item in values
    if (typeof item === 'string') {
      this.value.find((e) => e.value === item) !== undefined;
    }

    return this.value.find((e) => e.value === item.value) !== undefined;
  }

  /**
  * Manage indeterminate state
  * @see https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/checkbox#g%C3%A9rer_un_%C3%A9tat_ind%C3%A9termin%C3%A9
  */
  private isIndeterminate(item:CheckboxOption) :boolean {
    // for string items value is false
    if (typeof item === 'string') {
      return false;
    }
    // else we return a boolean
    return !!item.indeterminate;
  }

  /**
  * Value formater for readonly state
  */
  private getReadOnlyValue = (): string => {
    if (this.value === undefined) {
      return ''
    };

    return this.value.map((item, i, arr) => {
      if (arr.length <= 1) {
        return item
      } else if(i === arr.length - 1) {
        return `${item}.`;
      } else if (i < arr.length - 1) {
        return `${item}, `;
      }
      return '';
    })
    .join('');
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
        readonlyValue={this.getReadOnlyValue()}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={true}
      >
        <ul class={"mg-input__input-group-container mg-input__input-group-container--checkbox " + (this.inputVerticalList ? 'mg-input__input-group-container--vertical' : '')}>
          {this.options.map((input, index) => (
            <li class="mg-input__input-group">
              <input
                type="checkbox"
                id={this.identifier + '_' + index}
                name={this.identifier}
                value={input.value && input.value.toString()}
                checked={input.checked}
                disabled={this.disabled || input.disabled}
                required={this.required}
                indeterminate={input.indeterminate && typeof input.value !== 'boolean'}
                onInput={this.handleInput}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
              <label htmlFor={this.identifier + '_' + index}>{input.value}</label>
            </li>
          ))}
        </ul>
      </MgInput>
    );
  }

}
