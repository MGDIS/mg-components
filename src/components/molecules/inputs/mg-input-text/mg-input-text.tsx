import { Component, Event, h, Prop, EventEmitter, State, Element } from '@stencil/core';
import { MgInput } from '../MgInput';
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

  private classFocus = 'is-focused';
  private classError = 'is-not-valid';

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
  @Prop() identifier?: string = createID('mg-input-text');

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
  @Prop() labelHide: boolean = false;

  /**
   * Input placeholder.
   * It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.
   */
  @Prop() placeholder: string;

  /**
   * Input max length
   */
  @Prop() maxlength: number = 400;

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
  @Prop() displayCharacterLeft: boolean = true;

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
  @State() classList: ClassList = new ClassList(['mg-input--text', 'mg-input--width-full']);

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
   * @param event
   */
  private handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  };

  /**
   * Handle focus event
   */
  private handleFocus = () => {
    this.classList.add(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
  };

  /**
   * Handle blur event
   * @param event
   */
  private handleBlur = (event: FocusEvent) => {
    // Manage focus
    this.classList.delete(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
    // Check validity
    this.checkValidity(event.target);
  };

  /**
   * Check if input is valid
   * @param element
   */
  private checkValidity(element) {
    const validity = element.checkValidity();
    // Set error message
    this.errorMessage = undefined;
    // Does not match pattern
    if (!validity && element.validity.patternMismatch) {
      this.errorMessage = this.patternErrorMessage;
    }
    // required
    else if (!validity && element.validity.valueMissing) {
      this.errorMessage = messages.errors.required;
    }

    // Set validity
    this.valid = validity;
    this.invalid = !validity;

    // Update class
    if (validity) {
      this.classList.delete(this.classError);
    } else {
      this.classList.add(this.classError);
    }
  }

  /**
   * Validate patern configuration
   */
  private validatePattern = () => {
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
   */
  private validateAppendSlot() {
    const slotAppendInput: HTMLSlotElement = this.element.querySelector('[slot="append-input"]');
    if (slotAppendInput !== null && slotAppendInput.querySelector('.mg-button') !== null) {
      this.classList.add('mg-input--is-input-group-append');
      this.classList = new ClassList(this.classList.classes);
    } else if (slotAppendInput !== null) {
      this.classList.add('mg-input--is-append-input-slot-content');
      this.classList = new ClassList(this.classList.classes);
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad() {
    if (this.icon !== undefined) {
      this.classList.add('mg-input--has-icon');
    }
    this.validatePattern();
  }

  componentDidLoad() {
    this.validateAppendSlot();
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
        />
        <slot name="append-input"></slot>
      </MgInput>
    );
  }
}
