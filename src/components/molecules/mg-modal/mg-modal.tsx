import { Component, h, Prop, State, Watch, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { createID, ClassList } from '../../../utils/components.utils';
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

  private closeButtonId = '';
  private titleId = '';

  // Locales
  private messages;

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
      this.classList.add('mg-modal--hide');
    } else {
      this.componentShow.emit();
      this.classList.delete('mg-modal--hide');
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
    // Get locales
    this.messages = initLocales(this.element).messages;
    // Validate
    this.hasActions = this.element.querySelector('[slot="actions"]') !== null;
    this.hasContent = this.element.querySelector('[slot="content"]') !== null;
    if (this.closeButton) {
      this.closeButtonId = `${this.identifier}-close-button`;
    }
    this.titleId = `${this.identifier}-title`;
    this.validateHide(this.hide);
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
