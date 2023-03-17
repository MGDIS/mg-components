/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Element, Event, h, Prop, State, EventEmitter, Watch, Method } from '@stencil/core';
import { MgInput } from '../MgInput';
import { Width } from '../MgInput.conf';
import { ClassList, allItemsAreString } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';
import { SelectOption, OptGroup } from './mg-input-select.conf';

/**
 * Check if item is a well configured option
 *
 * @param {unknown} option select option
 * @returns {boolean} select option type is valid
 */
const isOption = (option: unknown): option is SelectOption => typeof option === 'object' && typeof (option as SelectOption).title === 'string';

/**
 * Check if items[] is SelectOption
 *
 * @param {unknown[]} items select option
 * @returns {boolean} select option array type is valid
 */
const allItemsAreOptions = (items: unknown[]): items is SelectOption[] => Array.isArray(items) && items.every(item => isOption(item));

/**
 * Check if item is a well configured optgroup
 *
 * @param {unknown} optgroup select option
 * @returns {boolean} select optgroup type is valid
 */
const isOptGroup = (optgroup: unknown): optgroup is OptGroup =>
  typeof optgroup === 'object' && typeof (optgroup as OptGroup).group === 'string' && allItemsAreOptions((optgroup as OptGroup).options);

/**
 * Group options
 *
 * @param {(SelectOption | OptGroup)[]} acc reduce accumulator
 * @param {SelectOption} item item to add
 * @param {string} item.group item group
 * @param {string} item.title item title
 * @param {unknown} item.value item value
 * @param {boolean} item.disabled is item disabled
 * @returns {(SelectOption | OptGroup)[]} grouped options
 */
const groupOptions = (acc: (SelectOption | OptGroup)[], { group, title, value, disabled }: SelectOption): (SelectOption | OptGroup)[] => {
  if (group !== undefined) {
    // Check if group is already created
    const optGroup: OptGroup = (acc as OptGroup[]).find(grp => grp.group === group);
    // Add to group
    if (optGroup !== undefined) {
      optGroup.options.push({ title, value, disabled });
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

  // HTML selector
  private input: HTMLSelectElement;

  // Locales
  private messages;

  // hasDisplayedError (triggered by blur event)
  private hasDisplayedError = false;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputSelectElement;

  /**
   * Component value
   */
  @Prop({ mutable: true }) value: string | SelectOption;
  @Watch('value')
  validateValue(newValue: MgInputSelect['value']): void {
    if (allItemsAreString(this.items) && typeof newValue === 'string') {
      this.readonlyValue = Boolean(this.input?.value) ? this.input.value : newValue;
    } else if (allItemsAreOptions(this.items)) {
      this.readonlyValue = this.items.find(item => item.value === newValue)?.title;
    } else {
      this.readonlyValue = null;
    }
    this.valueChange.emit(newValue);
  }

  /**
   * Items are the possible options to select
   */
  @Prop() items!: string[] | SelectOption[];
  @Watch('items')
  validateItems(newValue: MgInputSelect['items']): void {
    // Empty options
    if (newValue.length === 0) {
      this.options = [];
    }
    // String array
    else if (allItemsAreString(newValue)) {
      if (typeof this.value === 'string') this.valueExist = newValue.includes(this.value);
      this.options = newValue.map(item => ({ title: item, value: item }));
    }
    // Object array
    else if (allItemsAreOptions(newValue)) {
      this.valueExist = newValue.map(item => item.value).includes(this.value);
      // Grouped object options
      if (newValue.some(item => Boolean(item.group))) {
        this.options = newValue.reduce(groupOptions, []);
      }
      // Standart object options
      else {
        this.options = newValue;
      }
    } else {
      throw new Error('<mg-input-select> prop "items" is required, can be an empty Array or all items must be the same type: string or Option.');
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
  @Prop() name = this.identifier;

  /**
   * Input label
   */
  @Prop() label!: string;

  /**
   * Define if label is displayed on top
   */
  @Prop() labelOnTop: boolean;

  /**
   * Define if label is visible
   */
  @Prop() labelHide = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop({ mutable: true }) placeholder: string;

  /**
   * Option to remove placeholder
   */
  @Prop() placeholderHide = false;

  /**
   * Option to disable placeholder
   */
  @Prop() placeholderDisabled = false;

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
  @Watch('required')
  @Watch('readonly')
  @Watch('disabled')
  handleValidityChange(newValue: boolean, _oldValue: boolean, prop: string): void {
    if (this.input !== undefined) {
      this.input[prop] = newValue;
      this.checkValidity();
      if (this.hasDisplayedError) {
        this.setErrorMessage();
        this.hasDisplayedError = false;
      }
    }
  }

  /**
   * Define input width
   */
  @Prop() mgWidth: Width;

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
   * Does value match any item option
   */
  @State() readonlyValue: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<MgInputSelect['value']>;

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
    this.setErrorMessage();
    this.hasDisplayedError = this.invalid;
  }

  /**
   * Handle input event
   *
   * @returns {void}
   */
  private handleInput = (): void => {
    this.updateValue();
    if (this.hasDisplayedError) this.setErrorMessage();
  };

  /**
   * Method to compare item.title with input.value
   *
   * @param {SelectOption} item item to compare with
   * @returns {boolean} truthy if input.value is an item
   */
  private isInputValue = (item: SelectOption): boolean => item.title === this.input?.value;

  /**
   * value props setter
   *
   * @param {string | SelectOption} newValue value to update with
   * @returns {void}
   */
  private setValue = (newValue: string | SelectOption): void => {
    this.checkValidity();
    this.value = newValue;
  };

  /**
   * Update value from input.value
   *
   * @returns {void}
   */
  private updateValue = (): void => {
    if (this.input.value === '') {
      this.setValue(null);
    } else if (allItemsAreString(this.items) && this.items.includes(this.input.value)) {
      this.setValue(this.input.value);
    } else if (allItemsAreOptions(this.items) && typeof this.input.value === 'string' && this.items.some(this.isInputValue)) {
      this.setValue(this.items.find(this.isInputValue).value as any);
    } else {
      // before set newValue with push to options[] the unknown input.value with a disable satus
      this.options.push({ title: this.input.value, value: this.input.value, disabled: true });
      this.setValue(this.input.value);
    }
  };

  /**
   * Handle blur event
   */
  private handleBlur = (): void => {
    this.displayError();
  };

  /**
   * Input value is disabled
   *
   * @returns {boolean} truthy if input value is disabled
   */
  private isDisabledValue = (): boolean => allItemsAreOptions(this.options) && this.options.find(this.isInputValue)?.disabled === true;

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    this.valid = !this.isDisabledValue() && (this.readonly || this.disabled || (this.input?.checkValidity !== undefined ? this.input.checkValidity() : true));
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    this.inputValid.emit(this.valid);
  };

  /**
   * Set input error message
   */
  private setErrorMessage = (): void => {
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid && this.input.validity.valueMissing) {
      this.errorMessage = this.messages.errors.required;
    }
  };

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
    this.validateValue(this.value);
    // Set default placeholder
    if (this.placeholder === undefined || this.placeholder === '') {
      this.placeholder = this.messages.input.select.placeholder;
    }
    // Check validity when component is ready
    // return a promise to process action only in the FIRST render().
    // https://stenciljs.com/docs/component-lifecycle#componentwillload
    return setTimeout(() => {
      this.checkValidity();
    }, 0);
  }

  /**
   * Render option
   *
   * @param {SelectOption} option
   * @returns {HTMLElement} render option
   */
  private renderOption = (option: SelectOption): HTMLElement => (
    <option key={option.title} value={option.title} selected={JSON.stringify(this.value) === JSON.stringify(option.value)} disabled={option.disabled}>
      {option.title}
    </option>
  );

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
        readonly={this.readonly}
        mgWidth={this.mgWidth}
        disabled={this.disabled}
        value={this.value as string}
        readonlyValue={this.readonlyValue}
        tooltip={this.tooltip}
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
          ref={el => {
            if (el !== null) this.input = el as HTMLSelectElement;
          }}
        >
          {(!this.placeholderHide || !this.valueExist) && ( // In case passed value does not match any option we display the placeholder
            <option value="" disabled={this.placeholderDisabled && this.valueExist}>
              {this.placeholder}
            </option>
          )}
          {this.options.map(option =>
            isOptGroup(option) ? <optgroup label={option.group}>{option.options.map(this.renderOption)}</optgroup> : isOption(option) && this.renderOption(option),
          )}
        </select>
      </MgInput>
    );
  }
}
