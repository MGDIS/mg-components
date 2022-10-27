import { Component, Element, h, Prop, State, Watch, Host } from '@stencil/core';
import { variants, VariantType, ButtonType } from './mg-button.conf';
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
  private classDisabled = 'mg-button--disabled';
  private classLoading = 'mg-button--loading';
  private classFullWidth = 'mg-button--full-width';

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
  @Prop() variant: VariantType = variants[0]; // Primary
  @Watch('variant')
  validateVariant(newValue: VariantType, oldValue?: VariantType): void {
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
   */
  @Prop() type: ButtonType;

  /**
   * Set button to full-width
   */
  @Prop({ mutable: true }) fullWidth = false;
  @Watch('fullWidth')
  validateFullWidth(newValue) {
    if (newValue && this.isIcon) {
      this.classList.delete(this.classFullWidth);
      throw new Error('<mg-button> prop "fullWidth" cannot be used with prop "isIcon".');
    } else if (newValue) {
      this.classList.add(this.classFullWidth);
    } else {
      this.classList.delete(this.classFullWidth);
    }
  }

  /**
   * Define form id to attach button with.
   * If this attribute is not set, the <button> is associated with its ancestor <form> element.
   */
  @Prop({ mutable: true }) form: string;

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

    // apply style
    if (isDisabled) {
      this.classList.add(this.classDisabled);
    } else {
      this.classList.delete(this.classDisabled);
    }
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
   * Define if button is loading, default to false.
   * Trigger when button is clicked or key-up ['enter', 'space], then value change to true.
   * It's required to reset to false when action/promise in parent is done to stop the loading state
   */
  @State() loading = false;
  @Watch('loading')
  loadingHandler(newValue: boolean): void {
    // we add loading style if it newvalue is true else we remove it
    if (newValue) {
      this.classList.add(this.classLoading);
    } else {
      this.classList.delete(this.classLoading);
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
    else if (this.disableOnClick) {
      this.loading = true;
      this.disabled = true;
    }
  };

  /**
   * Handle onKeyDown event
   *
   * @param {KeyboardEvent} event keyboard event
   * @returns {void}
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    if (!this.disabled && event.key === ' ') {
      event.preventDefault();
    } else if (!this.disabled && ['Enter', 'NumpadEnter', 'Space'].includes(event.key)) {
      event.preventDefault();
      this.element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  /**
   * Handle onKeyUp event
   *
   * @param {KeyboardEvent} event keyboard event
   * @returns {void}
   */
  private handleKeyup = (event: KeyboardEvent): void => {
    if (!this.disabled && event.key === ' ') {
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
    this.validateFullWidth(this.fullWidth);
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
        type={this.type}
        form={this.form}
        mgWidth={this.fullWidth === true && 'full'} // css selector for host to prevent class usage bug on it
        aria-label={this.label}
        aria-disabled={this.disabled !== undefined && this.disabled.toString()}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyup}
        onKeyDown={this.handleKeydown}
      >
        <div class={this.classList.join()} id={this.identifier}>
          {this.loading && <mg-icon icon="loader" spin></mg-icon>}
          <div class="mg-button__content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
