import { Component, Host, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'mg-button',
  styleUrl: 'mg-button.scss',
  shadow: true,
})
export class MgButton {

  /**
   * Internal
   */
  class = ['mg-button'];
  variants = ["primary" , "secondary" , "info" , "alert" , "link"];

  /**
   * Disable button
   */
  @Prop() disabled: boolean = false;
  /**
   * aria-label
   * In case button text is not explicit enougth
   */
  @Prop() label: string;
  /**
   * Define button style
   */
  @Prop() variant: string = "primary";
  @Watch('variant')
  validateVariant(newValue: string) {
    if(!this.variants.includes(newValue)) {
      throw new Error(`<mg-button> props "variant" must be one of : ${this.variants.join(', ')}`);
    }
    this.class.push(`mg-button-${this.variant}`);
  }

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateVariant(this.variant);
  }

  /**
  * Render component
  */
  render() {
    return (
      <Host>
        <button class={this.class.join(' ')} aria-label={this.label} disabled={this.disabled}><slot></slot></button>
      </Host>
    );
  }

}
