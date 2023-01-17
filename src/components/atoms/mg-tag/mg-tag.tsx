import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { TagVariantType, variants } from './mg-tag.conf';
import { ClassList } from '../../../utils/components.utils';
@Component({
  tag: 'mg-tag',
  styleUrl: 'mg-tag.scss',
  shadow: true,
})
export class MgTag {
  /************
   * Internal *
   ************/

  // Classes
  private readonly classOutline = 'mg-tag--outline';
  private readonly classSoft = 'mg-tag--soft';

  /**************
   * Decorators *
   **************/

  /**
   * Get component DOM element
   */
  @Element() element: HTMLMgTagElement;

  /**
   * Define tag variant
   */
  @Prop() variant: TagVariantType = variants[0]; // primary
  @Watch('variant')
  validateVariant(newValue: MgTag['variant'], oldValue?: MgTag['variant']): void {
    if (!variants.includes(newValue)) {
      throw new Error(`<mg-tag> prop "variant" must be one of : ${variants.join(', ')}.`);
    } else {
      if (oldValue !== undefined) {
        this.classList.delete(`mg-tag--${oldValue}`);
      }
      this.classList.add(`mg-tag--${newValue}`);
    }
  }

  /**
   * Define if tag is using outline style
   */
  @Prop() outline: boolean;
  @Watch('outline')
  validateOutline(newValue: MgTag['outline']): void {
    if (newValue) this.classList.add(this.classOutline);
    else this.classList.delete(this.classOutline);
  }

  /**
   * Define if tag is using soft style
   */
  @Prop() soft: boolean;
  @Watch('soft')
  validateSoft(newValue: MgTag['soft']): void {
    // usage validation
    if (newValue && this.outline) throw new Error('<mg-tag> prop "soft" can NOT be used with prop "outline".');

    // apply class
    if (newValue) this.classList.add(this.classSoft);
    else this.classList.delete(this.classSoft);
  }

  /**
   * Component classes
   */
  @State() classList: ClassList = new ClassList(['mg-tag']);

  /*************
   * Methods *
   *************/

  /**
   * Validate the given textContent
   *
   * @param {string} textContent html element textContent property
   * @returns {void}
   */
  private validateTextContent(textContent: string): void {
    if (typeof textContent !== 'string' || textContent.trim() === '') throw new Error('<mg-tag> slot must contain a text content.');
  }

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
    this.validateSoft(this.soft);
    this.validateTextContent(this.element.textContent);
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
