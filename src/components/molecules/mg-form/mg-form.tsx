import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';
import { HTMLMgInputsElement } from '../inputs/MgInput.conf';

@Component({
  tag: 'mg-form',
  styleUrl: 'mg-form.scss',
  shadow: true,
})
export class MgForm {
  /************
   * Internal *
   ************/

  private mgInputs: HTMLMgInputsElement[];
  private mgButtons: HTMLMgButtonElement[];

  // Classes
  private readonly classAllRequired = 'mg-form--all-required';

  // HTML selector
  private form: HTMLFormElement;

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgFormElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-form');

  /**
   * Input name
   * If not set the value equals the identifier
   */
  @Prop() name: string = this.identifier;

  /**
   * Define if form is readonly
   */
  @Prop() readonly = false;

  /**
   * Define if form is disabled
   */
  @Prop() disabled = false;
  @Watch('readonly')
  @Watch('disabled')
  handleAttributeChange(): void {
    this.setMgInputs();
    this.setRequiredMessage();
  }

  /**
   * Define form valid state
   */
  @Prop({ mutable: true }) valid: boolean;

  /**
   * Define form invalid state
   */
  @Prop({ mutable: true }) invalid: boolean;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-form']);

  /**
   * Required message
   */
  @State() requiredMessage: string;

  /**
   * Emitted event on form validity check
   * Tells if form is valid or not
   */
  @Event({ eventName: 'form-valid' }) formValid: EventEmitter<boolean>;

  /**
   * Emitted event on form submit
   */
  @Event({ eventName: 'form-submit' }) formSubmit: EventEmitter<boolean>;

  /**
   * Public method to display errors
   *
   * @returns {Promise<void>}
   */
  @Method()
  async displayError(): Promise<void> {
    if (!this.readonly) {
      this.mgInputs.forEach(input => {
        input.displayError && input.displayError();
      });
      this.checkValidity();
    }
  }

  /**
   * Define required message based on mg-inputs required elements
   * Also
   *
   * @returns {void}
   */
  private setRequiredMessage = (): void => {
    // init required message
    this.requiredMessage = null;
    this.classList.delete(this.classAllRequired);
    // If the form is disabled or readonly none of them are required
    // Check if all fields are not editable (readonly or disabled)
    if (!this.disabled && !this.readonly && !this.mgInputs.every(input => input.disabled || input.readonly)) {
      // Get required fields
      const requiredInputs = this.mgInputs.filter(input => input.required && !input.disabled && !input.readonly);
      // All fields are required
      // mg-input-toggle can not be required
      if (requiredInputs.length > 0 && requiredInputs.length === this.mgInputs.filter(input => input.nodeName !== 'MG-INPUT-TOGGLE').length) {
        this.requiredMessage = requiredInputs.length === 1 ? this.messages.form.allRequiredSingle : this.messages.form.allRequired;
        this.classList.add(this.classAllRequired);
      }
      // Some fields are required
      else if (requiredInputs.length > 0) {
        this.requiredMessage = requiredInputs.length === 1 ? this.messages.form.requiredSingle : this.messages.form.required;
      }
    }
  };

  /**
   * Check if form is valid
   *
   * @returns {void}
   */
  private checkValidity = (): void => {
    // Update required on input event
    this.setRequiredMessage();

    this.valid = !this.mgInputs.some(input => input.invalid);
    this.invalid = !this.valid;
    // We need to send valid event if it is the same value
    this.formValid.emit(this.valid);
  };

  /**
   * Handle Form Submit
   *
   * @param {SubmitEvent} event submit event
   * @returns {void}
   */
  private handleFormSubmit = (event: SubmitEvent): void => {
    event.preventDefault();
    this.formSubmit.emit();
  };

  /**
   * Set mgInputs
   *
   * @returns {void}
   */
  private setMgInputs = (): void => {
    // Get slotted mgInputs
    this.mgInputs = Array.from(this.element.querySelectorAll('*')).filter((node: Node) => node.nodeName.startsWith('MG-INPUT-')) as HTMLMgInputsElement[];
    // Set inputs readonly or disabled based on form configuration
    // Othewise listen to events
    this.mgInputs.forEach(input => {
      if (this.readonly) input.readonly = true;
      else if (this.disabled) input.disabled = true;
      else input.addEventListener('input-valid', this.checkValidity);
    });
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
    // Get locales
    this.messages = initLocales(this.element).messages;

    // Get slotted mgButtons
    this.mgButtons = Array.from(this.element.querySelectorAll('mg-button'));

    // Set button form identifier
    this.mgButtons.forEach(mgButton => {
      mgButton.setAttribute('form', this.identifier);
    });

    // Set mgInputs
    this.setMgInputs();

    // Define required message
    this.setRequiredMessage();

    // Check validity when slotted mgInputs are ready
    Promise.all(
      this.mgInputs.map(async input => {
        try {
          await input.componentOnReady();
        } catch {} // prevent error with VueJS first render
      }),
    ).then(() => {
      this.checkValidity();
    });
  }

  /**
   * Add slot listeners
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    this.mgButtons.forEach(mgButton => {
      // submit buttons should trigger form submition;
      if (['submit', null].includes(mgButton.getAttribute('type'))) {
        mgButton.addEventListener('click', () => {
          this.form.dispatchEvent(new SubmitEvent('submit', { bubbles: true }));
        });
      }
    });
    // Update mgInputs when mgForm content change
    new MutationObserver(() => {
      this.setMgInputs();
    }).observe(this.element, { childList: true });
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <form class={this.classList.join()} id={this.identifier} name={this.name} ref={el => (this.form = el as HTMLFormElement)} onSubmit={this.handleFormSubmit}>
        {this.requiredMessage && <p innerHTML={this.requiredMessage}></p>}
        <slot></slot>
        {!this.readonly && !this.disabled && <slot name="actions"></slot>}
      </form>
    );
  }
}
