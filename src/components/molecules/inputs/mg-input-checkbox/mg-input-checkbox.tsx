import { Component, Event, h, Prop, EventEmitter, State } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID } from '../../../../utils/utils';
import locale from '../../../../locales';

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
   @Prop({ mutable:true, reflect: true }) value?: boolean;

   /**
    * Identifier used for the input ID (id is a reserved prop in Stencil.js)
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
   @State() classes: Set<string> = new Set(['mg-input--checkbox']);
 
   /**
    * Error message to display
    */
   @State() errorMessage: string;
 
   /**
    * Emmited event when value change
    */
   @Event() inputChange: EventEmitter<boolean>

   /**
   * Handle input event
   * @param event
   */
    private handleInput = (event:InputEvent & { target: HTMLInputElement }) => {
      this.value = event.target.checked;
      this.inputChange.emit(this.value);
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
    if(!validity && element.validity.valueMissing) {
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

  render() {
    let indeterminate = true;
    let checked = undefined;
    if (this.value === false) {
      checked = false;
      indeterminate = false;
    }
    if (this.value === true) {
      checked = true;
      indeterminate = false;
    }
    console.log(`indeterminate:${indeterminate}, checked:${checked}`);
    return (
      <MgInput
        identifier={this.identifier}
        classes={this.classes}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelColon={this.labelColon}
        required={this.required}
        readonly={this.readonly}
        value={this.label}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
      >
        <input
          type="checkbox"
          id={this.identifier}
          name={this.name}
          disabled={this.disabled}
          required={this.required}
          readonly={this.readonly}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.label}
          indeterminate={indeterminate}
          checked={checked}
        />
      </MgInput>
    );
  }

}
