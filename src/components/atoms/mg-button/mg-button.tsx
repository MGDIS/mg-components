import { Component, h, Prop, State, Watch } from '@stencil/core';
import { variants } from './mg-button.conf';
import { ClassList, createID } from '../../../utils/components.utils';

@Component({
  tag: 'mg-button',
  styleUrl: 'mg-button.scss',
  shadow: true,
})
export class MgButton {

  /**
   * Define button variant
   */
  @Prop() variant: string = variants[0]; // Primary
  @Watch('variant')
  validateVariant(newValue: string) {
    if(!variants.includes(newValue)) {
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
   @Prop({mutable: true, reflect: true}) disabled: boolean = false;

   /**
   * Define if button is round.
   * Used for icon button.
   */
  @Prop() isIcon: boolean = false;

  /**
   * Option to set input disable on click, in order to prevent multi-click.
   * Parent component have to set @prop 'disabled' to 'true' at the process end process.
   */
  @Prop() disableOnClick: boolean = false;

  /**
  * Define if button is loading.
  * Used to prevent multi-click.
  * Trigger when button is clicked or key-up ['enter', 'space], then value change to true.
  */
  @State() loading: boolean = false;
  @Watch('loading')
  loadingHandler(newValue: boolean) {
    if(!this.disableOnClick) return;
    this.disabled = newValue;
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-button']);

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateVariant(this.variant);
    if(this.isIcon) {
      this.classList.add(`mg-button--icon`);
      if(typeof this.label !== 'string' || this.label === '') {
        throw new Error(`<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.`);
      }
    }
  }

  /**
   * Set loading props to 'true'
   */
  private startLoading() {
    this.loading = true;
  }

  /**
   * Trigger actions onClick event
   */
  private handleClick = () => this.startLoading();

  /**
   * Trigger actions on onKeyUp 'enter' or 'space' event
   * @param event
   */
  private handleKeyUp = (event:KeyboardEvent) => {
    if(!['enter', 'space'].includes(event.key)) return;
    this.startLoading();
  }

  /**
  * Render component
  */
  render() {
    return (
        <button
          id={this.identifier}
          class={this.classList.join()}
          aria-label={this.label}
          disabled={this.disabled}
          onClick={this.handleClick}
          onKeyUp={this.handleKeyUp}
        >
          <slot></slot>
        </button>
    );
  }

}
