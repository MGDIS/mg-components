import { Component, Event, Element, h, Prop, EventEmitter, State, Method, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { InputClass, Width } from '../MgInput.conf';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';

@Component({
  tag: 'mg-input-textarea',
  styleUrl: 'mg-input-textarea.scss',
  shadow: true,
})
export class MgInputTextarea {
  /************
   * Internal *
   ************/

  // classes
  private classFocus = 'is-focused';
  private classError = InputClass.ERROR;

  // HTML selector
  private input: HTMLTextAreaElement;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputTextareaElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  handleValue(newValue: string): void {
    this.checkValidity();
    this.valueChange.emit(newValue);
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-input-textarea');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

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
  @Prop() placeholder: string;

  /**
   * Input max length
   */
  @Prop() maxlength = 4000;

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
   * Define input pattern error message
   */
  @Prop() rows = 3;

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
  @State() classList: ClassList = new ClassList(['mg-input--textarea']);

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Emited event when value change
   */
  @Event({ eventName: 'value-change' }) valueChange: EventEmitter<string>;

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
    this.checkError();
  }

  /**
   * Handle input event
   */
  private handleInput = (): void => {
    this.value = this.input.value;
  };

  /**
   * Handle focus event
   */
  private handleFocus = (): void => {
    this.classList.add(this.classFocus);
    this.classList = new ClassList(this.classList.classes);
  };

  /**
   * Handle blur event
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
   * Get pattern validity
   * Pattern is not defined on textarea field : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Textarea
   *
   * @returns {boolean} is pattern valid
   */
  private getPatternValidity = (): boolean => this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.value);

  /**
   * Check if input is valid
   */
  private checkValidity = (): void => {
    if (!this.readonly && this.input !== undefined) {
      const validity = this.input.checkValidity && this.input.checkValidity() && this.getPatternValidity();
      // Set validity
      this.valid = validity;
      this.invalid = !validity;

      //Send event
      this.inputValid.emit(validity);
    }
  };

  /**
   * Check input errors
   */
  private checkError = (): void => {
    // Set error message
    this.errorMessage = undefined;
    // Does not match pattern
    if (!this.valid && !this.getPatternValidity()) {
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
   * Validate pattern configuration
   */
  private validatePattern = (): void => {
    if (
      this.pattern &&
      typeof this.pattern === 'string' &&
      this.pattern !== '' &&
      (this.patternErrorMessage === undefined || typeof this.patternErrorMessage !== 'string' || this.patternErrorMessage === '')
    ) {
      throw new Error('<mg-input-textarea> prop "pattern" must be paired with the prop "patternErrorMessage"');
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validatePattern();

    // Check validity when component is ready
    this.element.componentOnReady().then(() => {
      this.checkValidity();
    });
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
        <textarea
          class="mg-input__box"
          value={this.value}
          id={this.identifier}
          name={this.name}
          placeholder={this.placeholder}
          title={this.placeholder}
          rows={this.rows}
          maxlength={this.maxlength}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={el => (this.input = el as HTMLTextAreaElement)}
        ></textarea>
      </MgInput>
    );
  }
}
