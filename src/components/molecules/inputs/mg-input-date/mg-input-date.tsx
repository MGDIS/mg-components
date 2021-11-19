import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, formatDate } from '../../../../utils/utils';
import locale from '../../../../locales';

@Component({
  tag: 'mg-input-date',
  styleUrl: './mg-input-date.scss',
  shadow: true,
})
export class MgInputDate {

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
  @Prop() identifier?: string = createID('mg-input-date');

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
  @State() classes: Set<string> = new Set(['mg-input--date']);

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
    const validity = element.checkValidity();
    // Set error message
    this.errorMessage = undefined;
    // wrong date format
    if(!validity && element.validity.badInput){
      this.errorMessage = locale.errors.date.badInput;
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

  /*************
   * Lifecycle *
   *************/

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
        readonlyValue={formatDate(this.value)}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <input
          type="date"
          value={this.value}
          id={this.identifier}
          name={this.name}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </MgInput>
    );
  }

}
