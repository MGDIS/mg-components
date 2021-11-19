import { Component, Event, h, Prop, EventEmitter, State } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID } from '../../../../utils/utils';
import locale from '../../../../locales';

@Component({
  tag: 'mg-input-textarea',
  styleUrl: 'mg-input-textarea.scss',
  shadow: true,
})
export class MgInputTextarea {

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
   * Define if label has colon ":"
   */
  @Prop() labelColon: boolean = false;

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
   * Template to use for characters left sentence
   */
  @Prop() helpText: string;

  /**
   * Define input pattern to validate
   */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
  * Define input pattern error message
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
    // Pattern is not defined on textarea field : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Textarea
    const patternValidity = this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.value);
    const validity = element.checkValidity() && patternValidity;
    // Set error message
    this.errorMessage = undefined;
    if(!validity && !patternValidity){
      this.errorMessage = this.patternErrorMessage;
    }
    // required
    else if(!validity && element.validity.valueMissing) {
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

  /**
   * Validate patern configuration
   */
  private validatePattern() {
    if(
      this.pattern && typeof this.pattern === 'string' && this.pattern !== '' &&
      (this.patternErrorMessage === undefined || typeof this.patternErrorMessage !== 'string' || this.patternErrorMessage === '')
    ) {
      throw new Error('<mg-input-textarea> prop "pattern" must be paired with the prop "patternErrorMessage"')
    }
  }

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad() {
    this.validatePattern();
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
        displayCharacterLeft={this.displayCharacterLeft}
        characterLeftTemplate={this.characterLeftTemplate}
        maxlength={this.maxlength}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <textarea
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
        >{this.value}</textarea>
      </MgInput>
    );
  }
}
