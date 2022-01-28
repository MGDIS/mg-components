import { Component, h, Prop, State, Watch } from '@stencil/core';
import { variants } from './mg-tag.conf';
import { ClassList } from '../../../utils/components.utils';
@Component({
  tag: 'mg-tag',
  styleUrl: 'mg-tag.scss',
  shadow: true,
})
export class MgTag {
  /**
   * Define button variant
   */
  @Prop() variant?: string = variants[0];
  @Watch('variant')
  validateVariant(newValue: string) {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-tag> prop "variant" must be one of : ${variants.join(', ')}.`);
    }
    this.classList.add(`mg-tag--${this.variant}`);
  }

  /**
   * Define if button is using outline style
   */
  @Prop() outline?: boolean;
  @Watch('outline')
  validateOutline(newValue: boolean) {
    if (newValue) this.classList.add(`mg-tag--outline`);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-tag']);

  /**
   * Check if props are well configured on init
   */
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateOutline(this.outline);
  }

  /**
   * Render
   */

  render() {
    return (
      <span class={this.classList.join()}>
        <slot></slot>
      </span>
    );
  }
}
