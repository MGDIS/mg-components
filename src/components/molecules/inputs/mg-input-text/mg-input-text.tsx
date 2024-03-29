import { Component, Event, h, Prop, EventEmitter, State, Element, Method, Watch } from '@stencil/core';
import { MgInput } from '../MgInput';
import { Width } from '../MgInput.conf';
import { ClassList } from '../../../../utils/components.utils';
import { initLocales } from '../../../../locales';

@Component({
  tag: 'mg-input-text',
  styleUrl: 'mg-input-text.scss',
  shadow: true,
})
export class MgInputText {
  /************
   * Internal *
   ************/

  // Classes
  private classFocus = 'is-focused';
  private classIsInputGroupAppend = 'mg-input--is-input-group-append';
  private classHasIcon = 'mg-input--has-icon';

  // IDs
  private characterLeftId;

  // HTML selector
  private input: HTMLInputElement;

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
  @Element() element: HTMLMgInputTextElement;

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;
  @Watch('value')
  handleValue(newValue: string): void {
    this.valueChange.emit(newValue);
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier!: string;

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
   * Input type
   */
  @Prop() type: 'text' | 'search' = 'text';

  /**
   * Input icon
   */
  @Prop() icon: string;
  @Watch('icon')
  validateIcon(newValue: string): void {
    if (newValue !== undefined) {
      this.classList.add(this.classHasIcon);
    } else {
      this.classList.delete(this.classHasIcon);
    }
  }

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
  @Prop() mgWidth: Width = 'full';

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
  @State() classList: ClassList = new ClassList(['mg-input--text']);

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
   * Public method to play input focus
   *
   * @returns {Promise<void>}
   */
  @Method()
  async setFocus(): Promise<void> {
    this.input.focus();
  }

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
    this.checkValidity();
    if (this.hasDisplayedError) {
      this.setErrorMessage();
    }
    this.value = this.input.value;
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
    // Display Error
    this.displayError();
  };

  /**
   * Check if input is valid
   *
   * @returns {void}
   */
  private checkValidity = (): void => {
    this.valid = this.readonly || this.disabled || (this.input?.checkValidity !== undefined ? this.input.checkValidity() : true);
    this.invalid = !this.valid;
    // We need to send valid event even if it is the same value
    this.inputValid.emit(this.valid);
  };

  /**
   * Set input error message
   *
   * @returns {void}
   */
  private setErrorMessage = (): void => {
    // Set error message
    this.errorMessage = undefined;
    // Does not match pattern
    if (!this.valid && this.input.validity.patternMismatch) {
      this.errorMessage = this.patternErrorMessage;
    }
    // required
    else if (!this.valid && this.input.validity.valueMissing) {
      this.errorMessage = this.messages.errors.required;
    }
  };

  /**
   * Validate pattern configuration
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
      this.classList.add(slotAppendInput[0].nodeName === 'MG-BUTTON' ? this.classIsInputGroupAppend : 'mg-input--is-append-input-slot-content');
    } else if (slotAppendInput.filter(slot => slot.nodeName === 'MG-BUTTON').length > 1) {
      this.classList.add(this.classIsInputGroupAppend);
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
    // Get locales
    this.messages = initLocales(this.element).messages;
    this.characterLeftId = `${this.identifier}-character-left`;
    // Validate
    this.validateIcon(this.icon);
    this.validatePattern();
    this.validateAppendSlot();
    // Check validity when component is ready
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
        ariaDescribedbyIDs={[this.characterLeftId]}
        label={this.label}
        labelOnTop={this.labelOnTop}
        labelHide={this.labelHide}
        required={this.required}
        readonly={this.readonly}
        mgWidth={this.mgWidth}
        disabled={this.disabled}
        value={this.value}
        readonlyValue={undefined}
        tooltip={this.tooltip}
        helpText={this.helpText}
        errorMessage={this.errorMessage}
        isFieldset={false}
      >
        <div
          class="mg-input__with-character-left"
          style={{
            '--mg-character-left-message-length': (this.displayCharacterLeft
              ? (this.maxlength - (this.value || '').length).toString().length + this.maxlength.toString().length + 1
              : 0
            ).toString(),
          }}
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
            ref={el => {
              if (el !== null) this.input = el as HTMLInputElement;
            }}
          />
          {this.displayCharacterLeft && this.maxlength > 0 && (
            <mg-character-left identifier={this.characterLeftId} characters={this.value} maxlength={this.maxlength}></mg-character-left>
          )}
        </div>
        <slot name="append-input"></slot>
      </MgInput>
    );
  }
}
