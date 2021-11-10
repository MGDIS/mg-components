import { Component, h, Prop, State, Watch } from '@stencil/core';
import { variants } from './mg-button.conf';

@Component({
  tag: 'mg-button',
  styleUrl: 'mg-button.scss',
  scoped: true,
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
    this.classes.add(`mg-button--${this.variant}`);
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
   * Define if button is round.
   * Used for icon button.
   */
  @Prop() isIcon: boolean = false;

  /**
   * Component classes
   */
  @State() classes: Set<string> = new Set(['mg-button']);

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateVariant(this.variant);
    if(this.isIcon) {
      this.classes.add(`mg-button--icon`);
      if(typeof this.label !== 'string' || this.label === '') {
        throw new Error(`<mg-button> prop "label" is mandatory when prop "isIcon" is set to true.`);
      }
    }
  }

  /**
  * Render component
  */
  render() {
    return (
        <button class={[...this.classes].join(' ')} aria-label={this.label} disabled={this.disabled}><slot></slot></button>
    );
  }

}
