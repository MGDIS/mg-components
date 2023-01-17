import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { variants } from './mg-message.conf';
import { initLocales } from '../../../locales';

@Component({
  tag: 'mg-message',
  styleUrl: 'mg-message.scss',
  shadow: true,
})
export class MgMessage {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classHide = 'mg-message--hide';

  // IDs
  private closeButtonId = '';

  // Stored timer setted when hide action is run from setTimeOut
  private storedTimer: ReturnType<typeof setTimeout> = null;

  // Manage hover
  private isFocused = false;
  private isHovered = false;

  // Locales
  private messages;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgMessageElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier: string = createID('mg-message');

  /**
   * Add a delay to hide/close message when it passed
   * Value is defined in seconds and must greater than 2 seconds (PDA9-314 RG-06)
   */
  @Prop() delay: number;
  @Watch('delay')
  validateDelay(newValue: number): void {
    if (newValue && newValue < 2) {
      throw new Error(`<mg-message> prop "delay" must be greater than 2 seconds.`);
    }
  }

  /**
   * Message variant
   */
  @Prop() variant: string = variants[0]; // info
  @Watch('variant')
  validateVariant(newValue: string, oldValue?: string): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-message> prop "variant" must be one of : ${variants.join(', ')}`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-message--${oldValue}`);
      }
      this.classList.add(`mg-message--${newValue}`);
    }
  }

  /**
   * Define if message has a cross button
   * RG 01: https://jira.mgdis.fr/browse/PDA9-140
   */
  @Prop({ mutable: true }) closeButton = false;
  @Watch('closeButton')
  validateCloseButton(newValue: boolean): void {
    if (newValue && this.hasActions) {
      this.closeButton = false;
      throw new Error('<mg-message> prop "close-button" can\'t be used with the actions slot.');
    }
  }

  /**
   * Define if message is hidden
   */
  @Prop({ mutable: true }) hide = false;
  @Watch('hide')
  validateHide(newValue: boolean): void {
    if (newValue) {
      this.componentHide.emit();
      this.classList.add(this.classHide);
      // Remove event Listener
      ['focusin', 'mouseenter'].forEach(event => {
        this.element.removeEventListener(event, this.timerEvents);
      });
      // Clear Timer
      this.clearTimer();
    } else {
      this.componentShow.emit();
      this.classList.delete(this.classHide);
      // If delay is set
      if (this.delay > 1) {
        // Start timer
        this.setTimer();
        // Stop timer when get focus or mouse enter
        ['focusin', 'mouseenter'].forEach(event => {
          this.element.addEventListener(event, this.timerEvents);
        });
      }
    }
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-message']);

  /**
   * Define if component is using actions slot
   */
  @State() hasActions = false;

  /**
   * Emited event when message is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<string>;

  /**
   * Emited event when message is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<string>;

  /**
   * Set timer
   *
   * @returns {void}
   */
  private setTimer = (): void => {
    this.storedTimer = setTimeout(() => (this.hide = true), this.delay * 1000);
  };

  /**
   * Clear timer
   *
   * @returns {void}
   */
  private clearTimer = (): void => {
    clearTimeout(this.storedTimer);
  };

  /**
   * Event to add on element
   *
   * @param {MouseEvent | FocusEvent} event  event
   * @returns {void}
   */
  private timerEvents = (event: MouseEvent | FocusEvent): void => {
    this.clearTimer();
    const isMouseEvent: boolean = event.type === 'mouseenter';
    // Needed to ensure we don't start the timer
    this[isMouseEvent ? 'isHovered' : 'isFocused'] = true;

    // Restart timer when loose focus AND mouse leave
    this.element.addEventListener(
      isMouseEvent ? 'mouseleave' : 'focusout',
      eventOut => {
        this[eventOut.type === 'mouseleave' ? 'isHovered' : 'isFocused'] = false;
        // Start timer if needed
        if (!this.isFocused && !this.isHovered) this.setTimer();
      },
      { once: true },
    );
  };

  /**
   * Handle close button
   */
  private handleClose = (): void => {
    this.hide = true;
  };

  /**
   * Get icon corresponding to variant
   *
   * @returns {string} icon
   */
  private getIcon = (): string => {
    switch (this.variant) {
      case 'info':
        return 'info-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'success':
        return 'check-circle';
      case 'danger':
        return 'exclamation-circle';
      default:
        break;
    }
  };

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
  componentWillLoad(): void {
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.validateVariant(this.variant);
    // Check if close button is an can be activated
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    this.validateCloseButton(this.closeButton);
    if (this.closeButton) {
      this.classList.add('mg-message--close-button');
      this.closeButtonId = `${this.identifier}-close-button`;
    }
    this.validateDelay(this.delay);
    this.validateHide(this.hide);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <div id={this.identifier} class={this.classList.join()} role={this.variant === 'info' ? 'status' : 'alert'}>
        <mg-card>
          <span class="mg-message__bar"></span>
          <span class="mg-message__icon">
            <mg-icon icon={this.getIcon()}></mg-icon>
          </span>
          <div class="mg-message__content">
            <span class="mg-message__content-slot">
              <slot></slot>
            </span>
            {this.hasActions && <span class="mg-message__content-separator"></span>}
            {this.hasActions && (
              <span class="mg-message__content-actions-slot">
                <slot name="actions"></slot>
              </span>
            )}
          </div>
          {this.closeButton && (
            <span class="mg-message__close-button">
              <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={this.messages.message.closeButton} onClick={this.handleClose}>
                <mg-icon icon="cross"></mg-icon>
              </mg-button>
            </span>
          )}
        </mg-card>
      </div>
    );
  }
}
