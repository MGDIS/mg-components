import { Component, Event, h, Prop, EventEmitter, State, Element } from '@stencil/core';
import { MgInput } from '../MgInput';
import { InputClass, Width } from '../MgInput.conf';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';

@Component({
  tag: 'mg-input-text',
  styleUrl: 'mg-input-text.scss',
  shadow: true,
})
export class MgInputText {
  /************
   * Internal *
   ************/

  // classes
  private classFocus = 'is-focused';
  private isInputGroupAppend = 'mg-input--is-input-group-append';
  private classError = InputClass.ERROR;

  // HTML selector
  private input: HTMLInputElement;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputTextElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-input-text');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Input label
   * Required
   */
  @Prop() label!: string;

  /**
   * Input type
   */
  @Prop() type: 'text' | 'search' = 'text';

  /**
   * Input icon
   */
  @Prop() icon: string;

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
  @Prop() placeholder: string;

  /**
   * Input max length
   */
  @Prop() maxlength = 400;

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
   * Define input width
   */
  @Prop() width: Width = 'full';

  /**
   * Define input pattern to validate
   */
  @Prop() pattern: string;

  /**
   * Define input pattern error message
   */
  @Prop() patternErrorMessage: string;

  /**
   * Add a tooltip message next to the input
   */
  @Prop() tooltip: string;

  /**
   * Define if component should display character left
   */
  @Prop() displayCharacterLeft = true;

  /**
   * Template to use for characters left sentence
   */
  @Prop() characterLeftTemplate: string;

  /**
   * Add a help text under the input, usually expected data format and example
   */
  @Prop() helpText: string;

  /**
   * Define input pattern to validate
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define input pattern error message
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-input--text']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emmited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

  /**
   * Handle input event
   *
   * @returns {void}
   */
  private handleInput = (): void => {
    this.checkValidity();
    this.value = this.input.value;
    this.valueChange.emit(this.value);
  };

  /**
   * Handle focus event
   *
   * @returns {void}
   */
  private handleFocus = (): void => {
    this.classList.add(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
  };

  /**
   * Handle blur event
   *
   * @returns {void}
   */
  private handleBlur = (): void => {
    // Manage focus
    this.classList.delete(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
    // Check validity
    this.checkValidity();
    this.checkError();
  };

  /**
   * Check if input is valid
   *
   * @returns {void}
   */
  private checkValidity = (): void => {
    if (!this.readonly && this.input !== undefined) {
      const validity = this.input.checkValidity();

      // Set validity
      this.valid = validity;
      this.invalid = !validity;
    }
  };

  /**
   * Check input errors
   *
   * @returns {void}
   */
  private checkError = (): void => {
    // Set error message
    this.errorMessage = undefined;
    // Does not match pattern
    if (!this.valid && this.input.validity.patternMismatch) {
      this.errorMessage = this.patternErrorMessage;
    }
    // required
    else if (!this.valid && this.input.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }
    // Update class
    if (this.valid) {
      this.classList.delete(this.classError);
    } else {
      this.classList.add(this.classError);
    }
  };

  /**
   * Validate patern configuration
   *
   * @returns {void}
   */
  private validatePattern = (): void => {
    if (
      this.pattern &&
      typeof this.pattern === 'string' &&
      this.pattern !== '' &&
      (this.patternErrorMessage === undefined || typeof this.patternErrorMessage !== 'string' || this.patternErrorMessage === '')
    ) {
      throw new Error('<mg-input-text> prop "pattern" must be paired with the prop "patternErrorMessage"');
    }
  };

  /**
   * Validate append slot
   *
   * @returns {void}
   */
  private validateAppendSlot = (): void => {
    const slotAppendInput: HTMLSlotElement[] = Array.from(this.element.querySelectorAll('[slot="append-input"]'));

    if (slotAppendInput.length === 1) {
      this.classList.add(slotAppendInput[0].nodeName === 'MG-BUTTON' ? this.isInputGroupAppend : 'mg-input--is-append-input-slot-content');
    } else if (slotAppendInput.filter(slot => slot.nodeName === 'MG-BUTTON').length > 1) {
      this.classList.add(this.isInputGroupAppend);
      this.classList.add('mg-input--has-buttons-group-append');
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
    if (this.icon !== undefined) {
      this.classList.add('mg-input--has-icon');
    }
    this.validatePattern();
    this.validateAppendSlot();

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
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        width={this.width}
        disabled={this.disabled}
        value={this.value}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        displayCharacterLeft={this.displayCharacterLeft}
        characterLeftTemplate={this.characterLeftTemplate}
        maxlength={this.maxlength}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        {this.icon !== undefined && <mg-icon icon={this.icon}></mg-icon>}
        <input
          type={this.type}
          class="mg-input__box"
          value={this.value}
          id={this.identifier}
          name={this.name}
          placeholder={this.placeholder}
          title={this.placeholder}
          maxlength={this.maxlength}
          disabled={this.disabled}
          required={this.required}
          pattern={this.pattern}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={el => (this.input = el as HTMLInputElement)}
        />
        <slot name="append-input"></slot>
      </MgInput>
    );
  }
}
