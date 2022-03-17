import { Component, Event, h, Prop, State, EventEmitter, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { Width } from '../MgInput.conf';
import { createID, ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';
import { SelectOption, OptGroup } from './mg-input-select.conf';

/**
 * Check if item is a well configured option
 * @param option
 * @returns {boolean}
 */
const isOption = (option: SelectOption): boolean => typeof option === 'object' && typeof option.title === 'string' && option.value !== undefined;

/**
 * Group options
 * @param acc
 * @param {SelectOption} item
 * @param {string} item.group
 * @param {string} item.title
 * @param {string} item.value
 * @param {boolean} item.disabled
 * @returns {OptGroup} grouped options
 */
const groupOptions = (acc, { group, title, value, disabled }): OptGroup => {
  if (group) {
    // Check if group is already created
    const optgroup = acc.find(grp => grp.group === group);
    // Add to group
    if (optgroup) {
      optgroup.options.push({ title, value, disabled });
    }
    // Create group
    else {
      acc.push({ group, options: [{ title, value, disabled }] });
    }
  } else {
    acc.push({ title, value, disabled });
  }
  return acc;
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

  // classes
  private classError = 'is-not-valid';

  // HTML selector
  private input: HTMLSelectElement;

  /**************
   * Decorators *
   **************/

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;

  /**
   * Items are the possible options to select
   */
  @Prop() items!: string[] | SelectOption[];
  @Watch('items')
  validateItems(newValue) {
    // String array
    if (allItemsAreString(newValue)) {
      this.valueExist = newValue.includes(this.value);
      this.options = newValue.map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (newValue && (newValue as Array<SelectOption>).every(item => isOption(item))) {
      this.valueExist = newValue.map(item => item.value).includes(this.value);
      // Grouped object options
      if (newValue.some(item => item.group !== undefined)) {
        this.options = newValue.reduce(groupOptions, []);
      }
      // Standart object options
      else {
        this.options = newValue;
      }
    } else {
      throw new Error('<mg-input-select> prop "items" is required and all items must be the same type, string or Option.');
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
   * Define if label is visible
   */
  @Prop() labelHide: boolean = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder: string = messages.input.select.placeholder;

  /**
   * Option to remove placeholder
   */
  @Prop() placeholderHide: boolean = false;

  /**
   * Option to disable placeholder
   */
  @Prop() placeholderDisabled: boolean = false;

  /**
   * Define if input is required
   */
  @Prop() required: boolean = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly: boolean = false;
  @Watch('readonly')
  handleReadOnly() {
    this.classList.delete(this.classError);
  }
  /**
   * Define if input is disabled
   */
  @Prop() disabled: boolean = false;
  @Watch('disabled')
  handleDisabled() {
    this.classList.delete(this.classError);
  }
  /**
   * Define input width
   */
  @Prop() width: Width;

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
  @State() classList: ClassList = new ClassList(['mg-input--select']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Formated items for display
   */
  @State() options: (SelectOption | OptGroup)[];

  /**
   * Does value match any item option
   */
  @State() valueExist: boolean;

  /**
   * Emmited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

  /**
   * Handle input event
   */
  private handleInput = () => {
    this.checkValidity();
    this.value = this.input.value;
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
    if (!this.readonly && this.input !== undefined) {
      const validity = this.input.checkValidity && this.input.checkValidity();

      // Set validity
      this.valid = validity;
      this.invalid = !validity;
    }
  }

  /**
   * Check input errors
   */
  private checkError() {
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid && this.input.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Update class
    if (this.valid) {
      this.classList.delete(this.classError);
    } else {
      this.classList.add(this.classError);
    }
  }

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
        width={this.width}
        value={this.value}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <select
          class="mg-input__box"
          id={this.identifier}
          name={this.name}
          title={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          ref={el => (this.input = el as HTMLSelectElement)}
        >
          {(!this.placeholderHide || !this.valueExist) && ( // In case passed value does not match any option we display the placeholder
            <option value="" disabled={this.placeholderDisabled && this.valueExist}>
              {this.placeholder}
            </option>
          )}
          {this.options.map(option =>
            option.group !== undefined ? (
              <optgroup label={option.group}>
                {(option as OptGroup).options.map(optgroup => (
                  <option value={optgroup.value} selected={this.value === optgroup.value} disabled={optgroup.disabled}>
                    {optgroup.title}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option value={(option as SelectOption).value} selected={this.value === (option as SelectOption).value} disabled={(option as SelectOption).disabled}>
                {(option as SelectOption).title}
              </option>
            ),
          )}
        </select>
      </MgInput>
    );
  }
}
