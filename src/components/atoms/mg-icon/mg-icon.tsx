import { Component, h, Prop, Watch, State } from '@stencil/core';
import { icons, sizes, variants } from './mg-icon.conf';
import { ClassList } from '../../../utils/components.utils';
import { IconType } from './mg-icon.conf';

@Component({
  tag: 'mg-icon',
  styleUrl: 'mg-icon.scss',
  shadow: true,
})
export class MgIcon {
  /**
   * Icon to display
   */
  @Prop() icon: IconType['icon'];
  @Watch('icon')
  validateIcon(newValue: string, oldValue?: string): void {
    if (!Object.keys(icons).includes(newValue)) {
      throw new Error(`<mg-icon> prop "icon" must be one of : ${Object.keys(icons).join(', ')}`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-icon--${oldValue}`);
      }
      this.classList.add(`mg-icon--${newValue}`);
    }
  }

  /**
   * Define icon size
   */
  @Prop() size: IconType['size'] = 'regular';
  @Watch('size')
  validateSize(newValue: IconType['size'], oldValue?: IconType['size']): void {
    if (!sizes.includes(newValue)) {
      throw new Error(`<mg-icon> prop "size" must be one of : ${sizes.join(', ')}`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-icon--size-${oldValue}`);
      }
      this.classList.add(`mg-icon--size-${newValue}`);
    }
  }

  /**
   * Define icon variant
   * Add a background to the icon based on variant color
   */
  @Prop() variant: IconType['variant'];
  @Watch('variant')
  validateVariant(newValue: IconType['variant'], oldValue?: IconType['variant']): void {
    if (newValue !== undefined && !variants.includes(newValue)) {
      throw new Error(`<mg-icon> prop "variant" must be one of : ${variants.join(', ')}`);
    } else if (newValue !== undefined) {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-icon--variant-${oldValue}`);
      }
      this.classList.add(`mg-icon--variant-${newValue}`);
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
    } else {
      this.classList.delete('mg-icon--spin');
    }
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-icon']);

  /**
   * getIcon
   *
   * @returns {HTMLElement} icon html
   */
  private getIcon = (): HTMLElement => icons[this.icon]();

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
        {this.getIcon()}
      </svg>
    );
  }
}
