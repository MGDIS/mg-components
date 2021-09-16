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
  classes = ['mg-button'];
  variants = ["primary" , "secondary" , "info" , "alert" , "link"];

  /**
   * Define button style
   */
  @Prop() variant: string = "primary";
  @Watch('variant')
  validateVariant(newValue: string) {
    if(!this.variants.includes(newValue)) {
      throw new Error(`<mg-button> props "variant" must be one of : ${this.variants.join(', ')}`);
    }
    this.classes.push(`mg-button-${this.variant}`);
  }

  /**
   * aria-label
   * In case button text is not explicit enougth
   */
   @Prop() label: string;

  /**
   * Disable button
   */
   @Prop() disabled: boolean = false;

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
        <button class={this.classes.join(' ')} aria-label={this.label} disabled={this.disabled}><slot></slot></button>
      </Host>
    );
  }

}
