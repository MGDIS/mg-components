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
   @Prop() disabled: boolean = false;

   /**
   * Define if button is round.
   * Used for icon button.
   */
  @Prop() isIcon: boolean = false;

  /**
  * Define if button is loading.
  * Used to prevent double-click.
  * Trigger when button is clicked or key-up 'enter', then value change to true.
  * Must be set to false by parent at the process end.
  */
  @Prop({ mutable: true, reflect: true }) loading: boolean = false;

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
          disabled={this.disabled || this.loading}
          onClick={this.handleClick}
          onKeyUp={this.handleKeyUp}
        >
          <slot></slot>
        </button>
    );
  }

}
