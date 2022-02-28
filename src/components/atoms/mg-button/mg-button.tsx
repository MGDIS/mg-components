import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { variants } from './mg-button.conf';
import { ClassList, createID } from '../../../utils/components.utils';

@Component({
  tag: 'mg-button',
  styleUrl: 'mg-button.scss',
  scoped: true,
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
  validateVariant(newValue: string) {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-button> prop "variant" must be one of : ${variants.join(', ')}`);
    }
    this.classList.add(`mg-button--${this.variant}`);
  }

  /**
   * Identifier is used for the element ID (id is a reserved prop in Stencil.js)
   * If not set, it will be created.
   */
  @Prop() identifier?: string = createID('mg-button');

  /**
   * aria-label
   * In case button text is not explicit enough
   */
  @Prop() label: string;

  /**
   * Disable button
   */
  @Prop({ mutable: true, reflect: true }) disabled: boolean = false;
  @Watch('disabled')
  disabledHandler(isDisabled: boolean) {
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
  @Prop() isIcon: boolean = false;

  /**
   * Define if button is display with mg-input.
   */
  @Prop() isInputGroup: boolean = false;

  /**
   * Option to set input disable on click, in order to prevent multi-click.
   * Parent component have to remove the attribute 'disabled' when the process ends.
   */
  @Prop() disableOnClick: boolean = false;

  /**
   * Define if button is loading, default to false.
   * Trigger when button is clicked or key-up ['enter', 'space], then value change to true.
   * It's required to reset to false when action/promise in parent is done to stop the loading state
   */
  @State() loading: boolean = false;
  @Watch('loading')
  loadingHandler(newValue: boolean) {
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
   */
  private handleClick = () => {
    // Used to prevent multi-click.
    if (this.disableOnClick) {
      this.loading = true;
      this.disabled = true;
    }
  };

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateVariant(this.variant);
    if (this.isIcon) {
      this.classList.add(`mg-button--icon`);
      if (typeof this.label !== 'string' || this.label === '') {
        throw new Error(`<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.`);
      }
    }
    if (this.isInputGroup) {
      this.classList.add(`mg-button--input-group`);
    }
    // Store the onclick fn
    this.onClickElementFn = this.element.onclick;
    this.disabledHandler(this.disabled);
  }

  /**
   * Render component
   */
  render() {
    return (
      <button id={this.identifier} class={this.classList.join()} aria-label={this.label} aria-disabled={this.disabled} onClick={this.handleClick}>
        {this.loading ? <mg-icon icon="loader" spin></mg-icon> : null}
        <div class="mg-button__content">
          <slot></slot>
        </div>
      </button>
    );
  }
}
