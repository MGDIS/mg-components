import { Component, h, Prop, State, Watch, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { createID, ClassList, focusableElements } from '../../../utils/components.utils';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-modal',
  styleUrl: 'mg-modal.scss',
  shadow: true,
})
export class MgModal {
  /************
   * Internal *
   ************/

  // Modal focusable elements
  private modalFocusableElements: HTMLElement[];

  // Classes
  private classHide = 'mg-modal--hide';

  // IDs
  private closeButtonId = '';
  private titleId = '';

  // Locales
  private messages;

  // body overflow default
  private bodyOverflow: string;

  /**************
   * Decorators *
   **************/

  @Element() element: HTMLMgModalElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-modal');

  /**
   * Displayed modal title
   * required
   */
  @Prop() modalTitle!: string;
  @Watch('modalTitle')
  validateModalTitle(newValue: string): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-modal> prop "modalTitle" is required.');
    }
  }

  /**
   * Define if modal has a cross button
   */
  @Prop({ mutable: true }) closeButton = false;

  /**
   * Define if modal is hidden
   */
  @Prop({ mutable: true }) hide = false;
  @Watch('hide')
  validateHide(newValue: boolean): void {
    if (newValue) {
      this.componentHide.emit();
      this.classList.add(this.classHide);
      document.body.style.overflow = this.bodyOverflow;
    } else {
      this.componentShow.emit();
      this.classList.delete(this.classHide);
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

  /**
   * Define if component is using content slot
   */
  @State() hasContent = false;

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-modal']);

  /**
   * Emmited event when modal is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<string>;

  /**
   * Emmited event when modal is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<string>;

  /**
   * Handle 'escape' key down
   *
   * @param {KeyboardEvent} event keydown event
   * @returns {void}
   */
  @Listen('keydown', {
    target: 'window',
  })
  handleKeyDown(event: KeyboardEvent): void {
    // we can use 'Escape button" when this not a blocking modal, induced by closeButton value.
    if (this.closeButton && event.key === 'Escape') {
      this.hide = true;
    }
  }

  private setFocus = (): void => {
    // Get all focusable elements
    this.modalFocusableElements = Array.from(this.element.querySelectorAll(focusableElements)).reduce((acc, focusableElement) => {
      acc.push(focusableElement.shadowRoot !== null ? focusableElement.shadowRoot.querySelector(focusableElements) || focusableElement : focusableElement);
      return acc;
    }, []);
    // When close button is enabled it's the first focusable element.
    if (this.closeButton) {
      this.modalFocusableElements.unshift(this.element.shadowRoot.querySelector(`.mg-modal__close-button mg-button`));
    }
    // It at least one
    if (this.modalFocusableElements.length >= 1) {
      // Set focus on first element
      this.modalFocusableElements[0].focus();
      // Add event listener on last element
      const lastFocusableElement = this.modalFocusableElements[this.modalFocusableElements.length - 1];
      lastFocusableElement.addEventListener('keydown', event => {
        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault();
          this.modalFocusableElements[0].focus();
        }
      });
      // Add event listener on first element (case shift + tab)
      this.modalFocusableElements[0].addEventListener('keydown', event => {
        if (event.key === 'Tab' && event.shiftKey) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      });
    }
  };

  /*************
   * Handlers *
   *************/

  /**
   * Handle close button
   *
   * @returns {void}
   */
  private handleClose = (): void => {
    this.hide = true;
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
    // Store body overflow
    this.bodyOverflow = document.body.style.overflow;
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    this.hasContent = this.element.querySelector('[slot="content"]') !== null;
    if (this.closeButton) {
      this.closeButtonId = `${this.identifier}-close-button`;
    }
    this.titleId = `${this.identifier}-title`;
    this.validateModalTitle(this.modalTitle);
    this.validateHide(this.hide);
  }

  /**
   * Add observer on component to set focus when displayed
   *
   * @returns {void}
   */
  componentDidLoad(): void {
    new MutationObserver(mutationList => {
      if (mutationList.some(mutation => mutation.attributeName === 'aria-hidden' && (mutation.target as HTMLElement).ariaHidden === null)) {
        this.setFocus();
      }
    }).observe(this.element.shadowRoot.getElementById(this.identifier), { attributes: true });
    // Set focus if display on load
    if (!this.hide) {
      this.setFocus();
    }
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <section role="dialog" id={this.identifier} class={this.classList.join()} tabindex="-1" aria-labelledby={this.titleId} aria-modal="true" aria-hidden={this.hide}>
        <article class="mg-modal__dialog">
          <header class="mg-modal__header">
            {this.closeButton && (
              <span class="mg-modal__close-button">
                <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={this.messages.modal.closeButton} onClick={this.handleClose}>
                  <mg-icon icon="cross"></mg-icon>
                </mg-button>
              </span>
            )}
            <h1 class="mg-modal__title" id={this.titleId}>
              {this.modalTitle}
            </h1>
          </header>

          {this.hasContent && (
            <article class="mg-modal__content">
              <slot name="content"></slot>
            </article>
          )}

          {this.hasActions && (
            <footer class="mg-modal__footer">
              <slot name="actions"></slot>
            </footer>
          )}
        </article>
      </section>
    );
  }
}
