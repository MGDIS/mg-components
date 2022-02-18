import { Component, h, Prop, State, Watch } from '@stencil/core';
import { variants } from './mg-badge.conf';
import { ClassList } from '../../../utils/components.utils';
@Component({
  tag: 'mg-badge',
  styleUrl: 'mg-badge.scss',
  shadow: true,
})
export class MgBadge {
  /**
   * Define button variant
   */
  @Prop() variant?: string = variants[variants.length - 1];
  @Watch('variant')
  validateVariant(newValue: string) {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-badge> prop "variant" must be one of : ${variants.join(', ')}.`);
    }
    this.classList.add(`mg-badge--${this.variant}`);
  }

  /**
   * Define if button is using outline style
   */
  @Prop() outline?: boolean;
  @Watch('outline')
  validateOutline(newValue: boolean) {
    if (newValue) this.classList.add(`mg-badge--outline`);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-badge']);

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
