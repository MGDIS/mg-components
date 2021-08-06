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
  types = ["primary" , "secondary" , "info" , "alert" , "link"];

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
   * Define button type style
   * TODO: find better props name, "style" is reserved
   */
  @Prop() type: string = "primary";
  @Watch('type')
  validateType(newValue: string) {
    if(!this.types.includes(newValue)) {
      throw new Error(`<mg-button> props "type" must be one of : ${this.types.join(', ')}`);
    }
    this.class.push(`mg-button-${this.type}`);
  }

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateType(this.type);
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
