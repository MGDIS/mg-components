import { Component, Event, h, Prop, EventEmitter, State } from '@stencil/core';
import { MgInput } from '../MgInput';
import { createID, ClassList } from '../../../../utils/components.utils';
import { messages } from '../../../../locales';

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
    * Define if label is visible
    */
    @Prop() labelHide: boolean = false;

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
   * Manage indeterminate state
   * @see https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/checkbox#g%C3%A9rer_un_%C3%A9tat_ind%C3%A9termin%C3%A9
   */
    @Prop() indeterminate: boolean = false;

   /**
    * Component classes
    */
   @State() classList: ClassList = new ClassList(['mg-input--checkbox']);

   /**
    * Error message to display
    */
   @State() errorMessage: string;

   /**
    * Emitted event when value change
    */
   @Event() valueChange: EventEmitter<boolean>

   /**
   * Handle input event
   * @param event
   */
    private handleInput = (event:InputEvent & { target: HTMLInputElement }) => {
      this.value = event.target.checked;
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
    const validity = element.checkValidity();
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

  private getReadOnlyValue() {
    let readonlyValue = undefined;
    if (this.readonly && this.value === true) {
      readonlyValue = messages.input.checkbox.true;
    } else if (this.readonly && this.value === false) {
      readonlyValue = messages.input.checkbox.false;
    } else if (this.readonly && this.indeterminate) {
      readonlyValue = messages.input.checkbox.indeterminate;
    }
    return readonlyValue;
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
        value={this.value && this.value.toString()}
        readonlyValue={this.getReadOnlyValue()}
        tooltip={this.tooltip}
        displayCharacterLeft={undefined}
        characterLeftTemplate={undefined}
        maxlength={undefined}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <input
          type="checkbox"
          id={this.identifier}
          name={this.name}
          disabled={this.disabled}
          required={this.required}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.value && this.value.toString()}
          indeterminate={this.indeterminate && typeof this.value !== 'boolean'}
          checked={this.value}
        />
      </MgInput>
    );
  }

}
