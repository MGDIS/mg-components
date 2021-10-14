import { Component, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'mg-tag',
  styleUrl: 'mg-tag.scss',
  shadow: true,
})
export class MgTag {

  /**
   * Internal
   */
  private classes = ['mg-tag'];
  private variants = ["product" , "success" , "warning", "danger",  "draft"];

  /**
   * Define button variant
   */
   @Prop() variant: string = this.variants[0];
   @Watch('variant')
   validateVariant(newValue: string) {
     if(!this.variants.includes(newValue)) {
       throw new Error(`<mg-tag> prop "variant" must be one of : ${this.variants.join(', ')}`);
     }
     this.classes.push(`mg-tag--${this.variant}`);
   }

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateVariant(this.variant);
  }

  /**
   * Render
   */

  render() {
    return (
        <span class={this.classes.join(' ')}><slot></slot></span>
    );
  }

}
