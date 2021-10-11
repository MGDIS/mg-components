import { Component, Element, Event, h, Prop, Watch, EventEmitter, State, Method } from '@stencil/core';
import { createID } from '../../utils/utils';


@Component({
  tag: 'mg-input-text',
  styleUrl: 'mg-input-text.scss',
  shadow: true,
})
export class MgInputText {

  /**
   * Internal
   */
  private classes = new Set(['mg-input', 'mg-input--text']);
  private classError = 'invalid';
  private classFocus = 'focus';

  private characterLeftReference = '';
  private tooltipReference = '';
  private helpTextReference = '';
  private helpTextErrorReference = '';

  /**
   * Component value
   */
  @Prop({ mutable: true, reflect: true }) value: string;

  /**
   * Input reference used for the input ID (id is a reserved prop in Stencil.js)
   * If not set, an ID will be created
   */
  @Prop() reference?: string = createID('mg-input-text');

  /**
   * Input name
   * If not set the value equals the reference
   */
  @Prop() name?: string = this.reference;

  /**
   * Input label
   * Required
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: string) {
    if (typeof newValue !== 'string' || newValue === '') {
      throw new Error('<mg-input-text> prop "label" is required')
    };
  }

  /**
   * Define if label has colon
   */
   @Prop() labelOnTop: boolean;

  /**
   * Define if label has colon
   */
  @Prop() labelColon: boolean = false;

  /**
   * Input placeholder
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
   * Define input pattern to validate
   */
  @Prop() pattern: string;

  /**
   * Define input pattern error message
   */
  @Prop() patternErrorMessage: string;

  /**
   * Define input pattern to validate
   */
  @Prop({ mutable: true, reflect: true }) valid: boolean;

  /**
  * Define input pattern error message
  */
  @Prop({ mutable: true, reflect: true }) invalid: boolean;

   /**
   * Define if input is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Define if input is readonly
   */
  @Prop() readonly: boolean = false;

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
   * Aria attributes that need to be added to the input :
   * - nbCharLeft
   * - help text
   * - tooltip
   * - error
   */
  @State() ariaDescribedby: string[] = [];

  /**
   * Define if element has focus
   */
  @State() focus: boolean;

  /**
   * Error message to display
   */
  @State() errorMessage: string;

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgInputTextElement;

  /**
   * Emmited event when value change
   */
  @Event() changed: EventEmitter<string>

  /**
   * Handle input event
   * @param event
   */
  private handleOnInput = (event) => {
    this.value = event.target.value;
    this.changed.emit(this.value)
  }

  /**
   * Handle blur event
   */
  private handleOnBlur = () => {
    this.focus = false;
    this.classes.delete(this.classFocus);
    this.checkValidity();
  }

  /**
   * Handle focus event
   */
  private handleOnFocus = () => {
    this.focus = true;
    this.classes.add(this.classFocus);
  }

  /**
   * Validate patern configuration
   */
  private validatePattern() {
    if(
      this.pattern && typeof this.pattern === 'string' && this.pattern !== '' &&
      (this.patternErrorMessage === undefined || typeof this.patternErrorMessage !== 'string' || this.patternErrorMessage === '')
    ) {
      throw new Error('<mg-input-text> prop "pattern" must be paired with the prop "patternErrorMessage"')
    }
  }

  /**
   * Check input validity
   * TODO : I EXPOSED THIS METHOD, THE IDEA IS TO VALIDATE A FORM USING IT
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    // get input validity
    const input = this.element.shadowRoot.querySelector('input');
    const validity = input.checkValidity();
    // This code has been replaced by native check input.checkValidity();
    // Required
    // const requiredValidity = !this.required || this.value !== '';
    // Pattern
    // const patternValidity = this.pattern === undefined || new RegExp(`^${this.pattern}$`, 'u').test(this.value)
    // Set validity
    // validity = requiredValidity && patternValidity;

    // Set error message
    this.errorMessage = '';
    if(!validity && input.validity.valueMissing) {
      this.errorMessage = "Ce champs est obligatoire."
    }
    else if(!validity && input.validity.patternMismatch){
      this.errorMessage = this.patternErrorMessage;
    }

    // Set validity
    this.valid = validity;
    this.invalid = !validity;

    // Update class
    if(validity) {
      this.classes.delete(this.classError);
    }
    else {
      this.classes.add(this.classError);
    }

    return validity;
  }

  /**
   * Some init/check before component render
   */
  componentWillLoad() {

    // Check if props are well configured on init
    this.validateLabel(this.label);
    this.validatePattern();

    // Add required aria attributes
    if(this.displayCharacterLeft) {
      this.characterLeftReference = `${this.reference}-character-left`;
      this.ariaDescribedby.push(this.characterLeftReference);
    }
    if(this.helpText !== undefined && this.helpText !== '') {
      this.helpTextReference = `${this.reference}-help-text`;
      this.ariaDescribedby.push(this.helpTextReference);
    }
    if(this.tooltip !== undefined && this.tooltip !== '') {
      this.tooltipReference = `${this.reference}-tooltip`;
      this.ariaDescribedby.push(this.tooltipReference);
    }

    this.helpTextErrorReference = `${this.reference}-error`;

    // Add position label
    if(this.labelOnTop) {
      this.classes.add('label-on-top');
    }

  }

  /**
   *
   * Render
   *
   * +--------+--------------+---------+
   * |  label | input        | tooltip |
   * |        +--------------+---------+
   * |        | nb Char Left           |
   * |        +------------------------+
   * |        | Help Text              |
   * |        +------------------------+
   * |        | Error                  |
   * +--------+------------------------+
   */
  render() {
    return (
      <div class={[...this.classes].join(' ')}>
        <mg-label reference={this.reference} required={this.required} colon={this.labelColon}>{this.label}</mg-label>
        { this.readonly
          ? <div class="mg-input__input-container">
              <strong>{this.value}</strong>
            </div>
          : <div class="mg-input__input-container">
              <div class="mg-input__input-container__input">
                <input
                  type="text"
                  id={this.reference}
                  name={this.name}
                  placeholder={this.placeholder}
                  title={this.placeholder}
                  value={this.value}
                  maxlength={this.maxlength}
                  disabled={this.disabled}
                  required={this.required}
                  readonly={this.readonly}
                  pattern={this.pattern}
                  aria-describedby={this.ariaDescribedby.join(' ')}
                  onInput={this.handleOnInput}
                  onFocus={this.handleOnFocus}
                  onBlur={this.handleOnBlur}
                />
                { this.tooltip && <mg-tooltip message={this.tooltip}><mg-icon icon="user-cadenas"></mg-icon></mg-tooltip>}
              </div>
              { this.displayCharacterLeft && <mg-character-left
                reference={this.characterLeftReference}
                characters={this.value}
                maxlength={this.maxlength}
                template={this.characterLeftTemplate}
              ></mg-character-left> }
              { this.helpText && <mg-help-text reference={this.helpTextReference} innerHTML={this.helpText}></mg-help-text> }
              { this.errorMessage && <mg-help-text class="error" reference={this.helpTextErrorReference} innerHTML={this.errorMessage}></mg-help-text> }
            </div>
        }
      </div>
    );
  }
}
