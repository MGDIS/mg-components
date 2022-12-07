import { Component, h, Prop, State, Watch } from '@stencil/core';
import { variants, BadgeVariantType } from './mg-badge.conf';
import { ClassList } from '../../../utils/components.utils';
@Component({
  tag: 'mg-badge',
  styleUrl: 'mg-badge.scss',
  shadow: true,
})
export class MgBadge {
  /************
   * Internal *
   ************/

  // Classes
  private classOutline = `mg-badge--outline`;

  /**************
   * Decorators *
   **************/

  /**
   * Badge value
   */
  @Prop({ mutable: true }) value!: string | number;
  @Watch('value')
  validateValue(newValue: MgBadge['value']): void {
    if (`${newValue}`.match(/^(\d+\+*|[?*!a-z])$/i) === null) {
      throw new Error('<mg-badge> prop "value" must be interger or ponctuation character.');
    }
  }

  /**
   * Badge label. Include short description.
   * Required for accessibility
   */
  @Prop() label!: string;
  @Watch('label')
  validateLabel(newValue: MgBadge['label']): void {
    if (typeof newValue !== 'string' || newValue.trim() === '') {
      throw new Error('<mg-badge> prop "label" is required.');
    }
  }

  /**
   * Define button variant
   */
  @Prop() variant?: BadgeVariantType = variants[0]; // info
  @Watch('variant')
  validateVariant(newValue: MgBadge['variant'], oldValue?: MgBadge['variant']): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-badge> prop "variant" must be one of : ${variants.join(', ')}.`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-badge--${oldValue}`);
      }
      this.classList.add(`mg-badge--${newValue}`);
    }
  }

  /**
   * Define if button is using outline style
   */
  @Prop() outline: boolean;
  @Watch('outline')
  validateOutline(newValue: MgBadge['outline']): void {
    if (newValue) this.classList.add(this.classOutline);
    else this.classList.delete(this.classOutline);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-badge']);

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateValue(this.value);
    this.validateLabel(this.label);
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
        {this.value}
        <span class="sr-only">{this.label}</span>
      </span>
    );
  }
}
