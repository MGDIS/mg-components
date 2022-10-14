import { Component, Element, h, Prop, State, Watch, Host } from '@stencil/core';
import { variants, ButtonType } from './mg-button.conf';
import { ClassList } from '../../../utils/components.utils';

@Component({
  tag: 'mg-button',
  styleUrl: 'mg-button.scss',
  shadow: true,
})
export class MgButton {
  /************
   * Internal *
   ************/

  private onClickElementFn = null;

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgButtonElement;

  /**
   * Define button variant
   */
  @Prop() variant: string = variants[0]; // Primary
  @Watch('variant')
  validateVariant(newValue: string, oldValue?: string): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-button> prop "variant" must be one of : ${variants.join(', ')}`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-button--${oldValue}`);
      }
      this.classList.add(`mg-button--${newValue}`);
    }
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   */
  @Prop() identifier: string;

  /**
   * aria-label
   * In case button text is not explicit enough
   */
  @Prop() label: string;

  /**
   * Define button type
   * Default: 'submit', as HTMLButtonElement type is submit by default
   */
  @Prop() type: ButtonType;

  /**
   * Define form id to attach button with.
   * If this attribute is not set, the <button> is associated with its ancestor <form> element.
   */
  @Prop({ mutable: true, reflect: true }) form: string;

  /**
   * Disable button
   */
  @Prop({ mutable: true }) disabled: boolean;
  @Watch('disabled')
  disabledHandler(isDisabled: boolean): void {
    // Remove loading when enable
    // Will be set back onclick
    if (!isDisabled && this.disableOnClick) {
      this.loading = false;
    }
    // Manage if onclick
    this.element.onclick = isDisabled ? undefined : this.onClickElementFn;
  }
  /**
   * Define if button is round.
   * Used for icon button.
   */
  @Prop() isIcon = false;

  /**
   * Option to set input disable on click, in order to prevent multi-click.
   * Parent component have to remove the attribute 'disabled' when the process ends.
   */
  @Prop() disableOnClick = false;

  /**
   * Prop to set aria-expanded on button element
   */
  @Prop() expanded: boolean;

  /**
   * Prop to set aria-controls on button element
   */
  @Prop() controls: string;

  /**
   * Prop to set aria-pressed on button element
   * To describe the state of a button
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Button#aria_state_information
   */
  @Prop() pressed: boolean;

  /**
   * Option to set aria-haspopup
   * The aria-haspopup state informs assistive technology users that there is a popup and the type of popup it is, but provides no interactivity.
   */
  @Prop() haspopup: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

  /**
   * Define if button is loading, default to false.
   * Trigger when button is clicked or key-up ['enter', 'space], then value change to true.
   * It's required to reset to false when action/promise in parent is done to stop the loading state
   */
  @State() loading = false;
  @Watch('loading')
  loadingHandler(newValue: boolean): void {
    // we add loading style if it newvalue is true else we remove it
    if (newValue) {
      this.classList.add('mg-button--loading');
    } else {
      this.classList.delete('mg-button--loading');
    }
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-button']);

  /**
   * Trigger actions onClick event
   *
   * @param {MouseEvent} event click event
   * @returns {void}
   */
  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) event.stopPropagation();

    // Used to prevent multi-click.
    if (this.disableOnClick && !this.disabled) {
      this.loading = true;
      this.disabled = true;
    }
  };

  /**
   * Handle onKeydown event
   *
   * @param {KeyboardEvent} event keyboard event
   * @returns {void}
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    if (['Space', 'Enter', 'NumpadEnter'].includes(event.key) && !this.disabled) {
      event.preventDefault();
      this.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateVariant(this.variant);
    if (this.isIcon) {
      this.classList.add(`mg-button--icon`);
      if (typeof this.label !== 'string' || this.label.trim() === '') {
        throw new Error(`<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.`);
      }
    }
    // Store the onclick fn
    this.onClickElementFn = this.element.onclick;
    this.disabledHandler(this.disabled);
  }

  /**
   * Render component
   *
   * @returns {HTMLElement} html element
   */
  render(): HTMLElement {
    return (
      <Host
        role="button"
        tabIndex={this.disabled ? -1 : 0}
        id={this.identifier}
        class={this.classList.join()}
        type={this.type}
        aria-label={this.label}
        aria-disabled={this.disabled !== undefined && this.disabled.toString()}
        aria-expanded={this.expanded !== undefined && this.expanded.toString()}
        aria-controls={this.controls}
        aria-haspopup={this.haspopup !== undefined && this.haspopup.toString()}
        aria-pressed={this.pressed !== undefined && this.pressed.toString()}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
      >
        {this.loading && <mg-icon icon="loader" spin></mg-icon>}
        <div class="mg-button__content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
