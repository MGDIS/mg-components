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
  @Prop() variant: string = variants[0]; // info
  @Watch('variant')
  validateVariant(newValue: string): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-tag> prop "variant" must be one of : ${variants.join(', ')}.`);
    }
    this.classList.add(`mg-tag--${this.variant}`);
  }

  /**
   * Define if button is using outline style
   */
  @Prop() outline: boolean;
  @Watch('outline')
  validateOutline(newValue: boolean): void {
    if (newValue) this.classList.add(`mg-tag--outline`);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-tag']);

  /*************
   * Lifecycle *
   *************/

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateVariant(this.variant);
    this.validateOutline(this.outline);
  }

  /**
   * Render
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <span class={this.classList.join()}>
        <slot></slot>
      </span>
    );
  }
}
