import { Component, h, Prop, Watch, State } from '@stencil/core';
import { icons, sizes, variants } from './mg-icon.conf';
import { ClassList } from '../../../utils/components.utils';

@Component({
  tag: 'mg-icon',
  styleUrl: 'mg-icon.scss',
  shadow: true,
})
export class MgIcon {
  /**
   * Icon to display
   */
  @Prop() icon: string;
  @Watch('icon')
  validateIcon(newValue: string): void {
    if (!Object.keys(icons).includes(newValue)) {
      throw new Error(`<mg-icon> prop "icon" must be one of : ${Object.keys(icons).join(', ')}`);
    }
    this.classList.add(`mg-icon--${this.icon}`);
  }

  /**
   * Define icon size
   */
  @Prop() size = 'regular';
  @Watch('size')
  validateSize(newValue: string): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-icon> prop "size" must be one of : ${sizes.join(', ')}`);
    }
    this.classList.add(`mg-icon--size-${this.size}`);
  }

  /**
   * Define icon variant
   * Add a background to the icon based on variant color
   */
  @Prop() variant: string;
  @Watch('variant')
  validateVariant(newValue: string): void {
    if (newValue !== undefined && !variants.includes(newValue)) {
      throw new Error(`<mg-icon> prop "variant" must be one of : ${variants.join(', ')}`);
    } else if (newValue !== undefined) {
      this.classList.add(`mg-icon--variant-${this.variant}`);
    }
  }

  /**
   * Make the icon spin
   */
  @Prop() spin = false;
  @Watch('spin')
  handleSpin(newValue: boolean): void {
    if (newValue) {
      this.classList.add('mg-icon--spin');
    }
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-icon']);

  /**
   * Check if props are well configured on init
   *
   * @returns {void}
   */
  componentWillLoad(): void {
    this.validateIcon(this.icon);
    this.validateSize(this.size);
    this.validateVariant(this.variant);
    this.handleSpin(this.spin);
  }

  /**
   * Render component
   *
   * @returns {HTMLElement} HTML Element
   */
  render(): HTMLElement {
    return (
      <svg class={this.classList.join()} aria-hidden="true" focusable="false" viewBox="0 0 16 16">
        {icons[this.icon]()}
      </svg>
    );
  }
}
