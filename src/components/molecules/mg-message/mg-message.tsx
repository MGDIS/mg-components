import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
import { variants } from './mg-message.conf';
import { messages } from '../../../locales';

@Component({
  tag: 'mg-message',
  styleUrl: 'mg-message.scss',
  shadow: true,
})
export class MgMessage {
  /************
   * Internal *
   ************/

  private closeButtonId = '';

  // Stored timer setted when hide action is run from setTimeOut
  private storedTimer: ReturnType<typeof setTimeout> = null;

  /**************
   * Decorators *
   **************/

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
  validateDelay(newValue) {
    if (newValue && newValue < 2) {
      throw new Error(`<mg-message> prop "delay" must be greater than 2 seconds.`);
    }
  }

  /**
   * Message variant
   */
  @Prop() variant: string = variants[0];
  @Watch('variant')
  validateVariant(newValue: string) {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-message> prop "variant" must be one of : ${variants.join(', ')}`);
    }
    this.classList.add(`mg-message--${this.variant}`);
  }

  /**
   * Define if message has a cross button
   * RG 01: https://jira.mgdis.fr/browse/PDA9-140
   */
  @Prop() closeButton: boolean = false;
  @Watch('closeButton')
  validateCloseButton(newValue: boolean) {
    if (newValue && this.hasActions) {
      this.closeButton = false;
      throw new Error('<mg-message> prop "close-button" can\'t be used with the actions slot.');
    }
  }

  /**
   * Define if message is hidden
   */
  @Prop({ mutable: true, reflect: true }) hide: boolean = false;
  @Watch('hide')
  validateHide(newValue: boolean) {
    if (newValue) {
      this.componentHide.emit();
      this.classList.add('mg-message--hide');
    } else {
      this.componentShow.emit();
      this.classList.delete('mg-message--hide');
    }
    this.hideWithDelay();
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-message']);

  /**
   * Define if component is using actions slot
   */
  @State() hasActions: boolean = false;

  /**
   * Emmited event when message is diplayed
   */
  @Event({ eventName: 'component-show' }) componentShow: EventEmitter<string>;

  /**
   * Emmited event when message is hidden
   */
  @Event({ eventName: 'component-hide' }) componentHide: EventEmitter<string>;

  /**
   * Handle close button
   */
  private handleClose = () => {
    this.hide = true;
  };

  /**
   * Hide component whith delay
   */
  private hideWithDelay = () => {
    if (this.delay > 0 && this.hide !== true) {
      this.storedTimer = setTimeout(() => (this.hide = true), this.delay * 1000);
    } else if (this.storedTimer !== null) {
      clearTimeout(this.storedTimer);
    }
  };

  /**
   * Get icon corresponding to variant
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
  componentWillLoad() {
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

  render() {
    return (
      <div id={this.identifier} class={this.classList.join()} role={this.variant === 'info' ? 'status' : 'alert'}>
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
            <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={messages.message.closeButton} onClick={this.handleClose}>
              <mg-icon icon="cross"></mg-icon>
            </mg-button>
          </span>
        )}
      </div>
    );
  }
}
