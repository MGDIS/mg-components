import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { createID, ClassList } from '../../../utils/utils';
import { variants } from './mg-message.conf';
import locale from '../../../locales';

@Component({
  tag: 'mg-message',
  styleUrl: 'mg-message.scss',
  shadow: true,
})
export class MgMessage {

  /************
   * Internal *
   ************/

  private closeButtonId = "";

  /**************
   * Decorators *
   **************/

  @Element() element: HTMLMgMessageElement;

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-message');

  /**
   * Message variant
   */
  @Prop() variant?: string = variants[0];
  @Watch('variant')
  validateType(newValue: string) {
    if(!variants.includes(newValue)) {
      throw new Error(`<mg-message> prop "variant" must be one of : ${variants.join(', ')}`);
    }
    this.classes.add(`mg-message--${this.variant}`);
  }

  /**
   * Define if message has a cross button
   * RG 01: https://jira.mgdis.fr/browse/PDA9-140
   */
  @Prop({ mutable: true }) closeButton?: boolean = false;
  @Watch('closeButton')
  validateCloseButton(newValue: boolean) {
    if(newValue && this.hasActions) {
      this.closeButton = false;
      throw new Error('<mg-message> prop "close-button" can\'t be used with the actions slot.')
    }
  }

  /**
   * Define if message is hidden
   */
   @Prop({ mutable: true, reflect: true }) hide?: boolean = false;
   @Watch('hide')
   validateHide(newValue: boolean) {
     if(newValue) this.classes.add('mg-message--hide')
     else this.classes.delete('mg-message--hide')
   }

  /**
   * Component classes
   */
  @State() classes: ClassList = new ClassList(['mg-message']);

  /**
   * Define if component is using actions slot
   */
  @State() hasActions: boolean = false;

  /**
   * Handle close button
   */
  private handleClose = () => {
    this.hide = true;
  }


  /*************
   * Lifecycle *
   *************/

  /**
   * Check if component props are well configured on init
   */
   componentWillLoad() {
    this.validateType(this.variant);
    // Check if close button is an can be activated
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    this.validateCloseButton(this.closeButton);
    if(this.closeButton) {
      this.classes.add('mg-message--close-button');
      this.closeButtonId = `${this.identifier}-close-button`;
    }
    this.validateHide(this.hide);
  }

  render() {
    return (
      <div id={this.identifier} class={this.classes.join()} role={this.variant === "info" ? "status" : "alert"}>
        <span class="mg-message__icon">
          <mg-icon icon={this.variant}></mg-icon>
        </span>
        <div class="mg-message__content">
          <span class="mg-message__content__slot">
            <slot></slot>
          </span>
          { this.hasActions && <span class="mg-message__content__separator"></span> }
          { this.hasActions && <span class="mg-message__content__actions-slot">
              <slot name="actions"></slot>
            </span>
          }
        </div>
        { this.closeButton && <span class="mg-message__close-button">
            <mg-button identifier={this.closeButtonId} is-icon variant="flat" label={locale.message.closeButton} onClick={this.handleClose}>
              <mg-icon icon="cross" size="small"></mg-icon>
            </mg-button>
          </span>
        }
      </div>
    );
  }

}
