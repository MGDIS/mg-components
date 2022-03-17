import { Component, Event, h, Prop, EventEmitter, State, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
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
  private classError = 'is-not-valid';

  // HTML selector
  private input: HTMLTextAreaElement;

  /**************
   * Decorators *
   **************/

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-input-textarea');

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
  @Prop() placeholder: string;

  /**
   * Input max length
   */
  @Prop() maxlength: number = 4000;

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
  @Prop() rows: number = 3;

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
  @State() classList: ClassList = new ClassList(['mg-input--textarea', 'mg-input--width-full']);

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
   */
  private handleInput = () => {
    this.checkValidity();
    this.value = this.input.value;
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
   */
  private handleBlur = () => {
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
   * @returns {boolean}
   */
  private getPatternValidity = (): boolean => this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.value);

  /**
   * Check if input is valid
   */
  private checkValidity() {
    if (!this.readonly && this.input !== undefined) {
      const patternValidity = this.getPatternValidity();
      const validity = this.input.checkValidity && this.input.checkValidity() && patternValidity;

      // Set validity
      this.valid = validity;
      this.invalid = !validity;
    }
  }

  /**
   * Check input errors
   */
  private checkError() {
    const patternValidity = this.getPatternValidity();
    // Set error message
    this.errorMessage = undefined;
    if (!this.valid && !patternValidity) {
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
  }

  /**
   * Validate pattern configuration
   */
  private validatePattern = () => {
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

  componentWillLoad() {
    this.validatePattern();

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
