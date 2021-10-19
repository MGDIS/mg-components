import { Component, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'mg-button',
  styleUrl: 'mg-button.scss',
  shadow: true,
})
export class MgButton {

  /**
   * Internal
   */
  private classes = ['mg-button'];
  private variants = ["primary" , "secondary" , "alert", "alert-alt",  "info"]; // TODO : should we have a link styled button ?

  /**
   * Define button variant
   */
  @Prop() variant: string = this.variants[0];
  @Watch('variant')
  validateVariant(newValue: string) {
    if(!this.variants.includes(newValue)) {
      throw new Error(`<mg-button> prop "variant" must be one of : ${this.variants.join(', ')}`);
    }
    this.classes.push(`mg-button--${this.variant}`);
  }

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
        <button class={this.classes.join(' ')} aria-label={this.label} disabled={this.disabled}><slot></slot></button>
    );
  }

}